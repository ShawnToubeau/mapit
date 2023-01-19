package main

import (
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"log"
	"mapit/server/db"
	"mapit/server/www"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("error loading .env file")
	}
}

func main() {
	db.Connect()
	defer db.Client.Close()

	www.Serve()
}
