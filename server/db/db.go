package db

import (
	"context"
	"fmt"
	"log"
	"mapit/server/ent"
	"mapit/server/ent/migrate"
	"os"
)

var Client *ent.Client

func Connect() {
	dbString := fmt.Sprintf("host=localhost port=5432 sslmode=disable dbname=%v user=%v password=%v", os.Getenv("DB_NAME"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"))
	dbClient, err := ent.Open("postgres", dbString)
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	// run migrations
	if err := dbClient.Schema.Create(context.Background(),
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
	// store globally
	Client = dbClient
}
