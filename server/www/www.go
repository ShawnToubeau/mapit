package www

import (
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"net/http"
	"server/api"
	"server/map_api/v1/map_apiv1connect"
)

func Serve() {
	mapEventServer := &api.MapEventServer{}
	mux := http.NewServeMux()
	path, handler := map_apiv1connect.NewMapEventServiceHandler(mapEventServer)
	mux.Handle(path, handler)

	corsHandler := cors.AllowAll()

	log.Println("listening on", 8080)
	http.ListenAndServe(
		"localhost:8080",
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(corsHandler.Handler(mux), &http2.Server{}),
	)
}
