package www

import (
	"io"
	"log"
	"net/http"
	"os"
	"server/api/geocode"
	"server/api/map_event"
	"server/gen/geocode_api/v1/geocode_apiv1connect"
	"server/gen/map_event_api/v1/map_event_apiv1connect"

	"github.com/rs/cors"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Hello world!\n")
}

func Serve() {
	mapEventServer := &map_event.MapEventServer{}
	geocodeServer := &geocode.GeocoderServer{}
	mux := http.NewServeMux()
	mapEventPath, mapEventHandler := map_event_apiv1connect.NewMapEventServiceHandler(mapEventServer)
	geocoderPath, geocodeHandler := geocode_apiv1connect.NewGeocodeServiceHandler(geocodeServer)
	mux.Handle(mapEventPath, mapEventHandler)
	mux.Handle(geocoderPath, geocodeHandler)

	corsHandler := cors.AllowAll()

	// for testing
	mux.HandleFunc("/", getRoot)

	log.Println("server listening on", os.Getenv("PORT"))
	http.ListenAndServe(
		":"+os.Getenv("PORT"),
		// TODO handle this on an environment basis
		// Use h2c so we can serve HTTP/2 without TLS.
		//h2c.NewHandler(, &http2.Server{}),
		corsHandler.Handler(mux),
	)
}
