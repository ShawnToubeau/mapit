package www

import (
	"io"
	"log"
	"net/http"
	"os"
	"server/api"
	"server/map_api/v1/map_apiv1connect"

	"github.com/rs/cors"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Hello world!\n")
}

func Serve() {
	mapEventServer := &api.MapEventServer{}
	mux := http.NewServeMux()
	path, handler := map_apiv1connect.NewMapEventServiceHandler(mapEventServer)
	mux.Handle(path, handler)

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
