package geocode

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/redis/go-redis/v9"
	"io"
	"log"
	"net/http"
	"server/db"
	geocodeapiv1 "server/gen/geocode_api/v1"
	"strconv"
	"time"
)

// NominatimSearchResult represents the data that comes back from a nominatim search query
type NominatimSearchResult struct {
	PlaceID        int      `json:"place_id"`
	License        string   `json:"licence"`
	OSMType        string   `json:"osm_type"`
	OSMID          int      `json:"osm_id"`
	BoundingBoxStr []string `json:"boundingbox"`
	LatStr         string   `json:"lat"`
	LngStr         string   `json:"lon"`
	DisplayName    string   `json:"display_name"`
	Class          string   `json:"class"`
	Type           string   `json:"type"`
	Importance     float64  `json:"importance"`
}

// RedisAddress represents an address record stored within redis
type RedisAddress struct {
	Address   string  `json:"address"`
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lon"`
}

type GeocoderServer struct{}

func (s *GeocoderServer) SearchAddress(
	ctx context.Context,
	req *connect.Request[geocodeapiv1.SearchAddressRequest],
) (*connect.Response[geocodeapiv1.SearchAddressResponse], error) {
	// first, check redis if we've search by this query before
	redisValue, err := db.RedisClient.Get(ctx, req.Msg.Query).Result()
	if err != nil && err != redis.Nil {
		log.Printf("error getting value from redis %v\n", err)
	} else if err == nil {
		log.Println("found existing address in redis")
		var existingAddress RedisAddress
		err := json.Unmarshal([]byte(redisValue), &existingAddress)
		if err != nil {
			return nil, fmt.Errorf("error unmarshalling redis value: %w", err)
		}

		res := connect.NewResponse(&geocodeapiv1.SearchAddressResponse{
			Address:   existingAddress.Address,
			Latitude:  existingAddress.Latitude,
			Longitude: existingAddress.Longitude,
		})
		return res, nil
	}

	// fallback to a geocode search
	url := fmt.Sprintf("https://nominatim.openstreetmap.org/search?q=%v&format=json&limit=1", req.Msg.Query)
	client := http.Client{}
	geocodeReq, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("error creating geocode request: %w", err)
	}
	// this is required to use nominatim
	geocodeReq.Header.Add("User-Agent", "shawntoubeau@gmail.com")
	geocodeRes, err := client.Do(geocodeReq)
	if err != nil {
		return nil, fmt.Errorf("error sending geocode request: %w", err)
	}

	defer geocodeRes.Body.Close()
	body, err := io.ReadAll(geocodeRes.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading geocode response body: %w", err)
	}

	var result []NominatimSearchResult
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, fmt.Errorf("error unmarshalling geocode response body: %w", err)
	} else if len(result) == 0 {
		log.Println("no results returned from geocode query")
		res := connect.NewResponse(&geocodeapiv1.SearchAddressResponse{})
		res.Header().Set("SearchAddress-Version", "v1")
		// return an empty result because we didn't get anything
		return res, nil
	}

	// parse the latitude and longitude to floats for the response
	latRes, err := strconv.ParseFloat(result[0].LatStr, 64)
	if err != nil {
		return nil, fmt.Errorf("error parsing latitude string: %w", err)
	}
	lngRes, err := strconv.ParseFloat(result[0].LngStr, 64)
	if err != nil {
		return nil, fmt.Errorf("error parsing longitude string: %w", err)
	}

	newRedisValue := RedisAddress{
		Address:   result[0].DisplayName,
		Latitude:  latRes,
		Longitude: lngRes,
	}
	redisValueStr, err := json.Marshal(newRedisValue)
	if err != nil {
		return nil, fmt.Errorf("error marshalling value for redis: %w", err)
	}

	// store the result in redis with an expiration of 24 hours
	err = db.RedisClient.Set(ctx, req.Msg.Query, redisValueStr, 24*time.Hour).Err()
	if err != nil {
		log.Printf("error storing value in redis: %v\n", err)
	}

	res := connect.NewResponse(&geocodeapiv1.SearchAddressResponse{
		Address:   newRedisValue.Address,
		Latitude:  newRedisValue.Latitude,
		Longitude: newRedisValue.Longitude,
	})
	res.Header().Set("SearchAddress-Version", "v1")
	return res, nil
}
