package main

import (
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"server/db"
	"server/www"
)

func main() {
	_ = godotenv.Load()

	db.Connect()
	defer db.EntClient.Close()
	defer db.RedisClient.Close()

	www.Serve()
}
