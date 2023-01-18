package main

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"log"
	"mapit/server/ent"
	"mapit/server/ent/migrate"
	"os"
)

func init() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("error loading .env file")
	}
}

func main() {
	dbString := fmt.Sprintf("host=localhost port=5432 sslmode=disable dbname=%v user=%v password=%v", os.Getenv("DB_NAME"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"))
	client, err := ent.Open("postgres", dbString)
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()
	ctx := context.Background()
	// run migrations
	if err := client.Schema.Create(ctx,
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
}
