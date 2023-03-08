package www

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
	"server/api/event"
	"server/api/event_map"
	"server/api/geocode"
	"server/gen/event_api/v1/event_apiv1connect"
	"server/gen/event_map_api/v1/event_map_apiv1connect"
	"server/gen/geocode_api/v1/geocode_apiv1connect"
	"strings"
)

// authMiddleware ensures all requests have a valid JWT
func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		if len(authHeader) != 2 {
			w.WriteHeader(http.StatusUnauthorized)
			_, err := w.Write([]byte("malformed token"))
			if err != nil {
				log.Fatalf("error writing response: %v", err)
			}
		} else {
			jwtToken := authHeader[1]
			token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(os.Getenv("JWT_SECRET")), nil
			})
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				_, err = w.Write([]byte("error parsing JWT"))
				if err != nil {
					log.Fatalf("error writing response: %v", err)
				}
			}

			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				ctx := context.WithValue(r.Context(), "claims", claims)
				next.ServeHTTP(w, r.WithContext(ctx))
			} else {
				w.WriteHeader(http.StatusUnauthorized)
				_, err = w.Write([]byte("Unauthorized"))
				if err != nil {
					log.Fatalf("error writing response: %v", err)
				}
			}
		}
	})
}

func Serve() {
	mux := http.NewServeMux()
	corsHandler := cors.AllowAll()

	mux.Handle(event_map_apiv1connect.NewEventMapServiceHandler(&event_map.EventMapServer{}))
	mux.Handle(event_apiv1connect.NewEventServiceHandler(&event.EventServer{}))
	mux.Handle(geocode_apiv1connect.NewGeocodeServiceHandler(&geocode.GeocoderServer{}))

	log.Println("server listening on", os.Getenv("PORT"))
	log.Fatal(http.ListenAndServe(
		":"+os.Getenv("PORT"),
		// TODO handle this on an environment basis
		// Use h2c so we can serve HTTP/2 without TLS.
		//h2c.NewHandler(, &http2.Server{}),
		corsHandler.Handler(authMiddleware(mux)),
	), nil)
}
