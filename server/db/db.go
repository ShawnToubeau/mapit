package db

import (
	"context"
	"database/sql"
	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	"fmt"
	golangMigrate "github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"log"
	"os"
	"server/ent"
	"server/ent/migrate"
)

var EntClient *ent.Client

func Connect() {
	dbString := fmt.Sprintf("postgres://%v:%v@%v:5432/%v?sslmode=%v", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"), os.Getenv("DB_NAME"), os.Getenv("DB_SLL_MODE"))
	dbConnection, err := sql.Open("postgres", dbString)
	if err != nil {
		log.Fatalf("error connecting to database: %v", err)
	}
	log.Println("established connection to database")

	golangMigrateDriver, err := postgres.WithInstance(dbConnection, &postgres.Config{})
	if err != nil {
		log.Fatalf("error creating golang_migrate driver: %v", err)
	}

	migrationClient, err := golangMigrate.NewWithDatabaseInstance(
		"file://db/migrations",
		"postgres", golangMigrateDriver)
	if err != nil {
		log.Fatalf("error connecting to database via golang_migrate client: %v", err)
	}
	log.Println("golang_migration client established connection to database")

	// apply manual migrations
	err = migrationClient.Up()
	if err != nil && err != golangMigrate.ErrNoChange {
		log.Fatalf("error applying manual migrations to database: %v", err)
	}
	log.Println("golang_migrate client applied database migrations")

	entClient := ent.NewClient(ent.Driver(entsql.OpenDB(dialect.Postgres, dbConnection)))
	// run migrations managed by ent
	if err := entClient.Schema.Create(context.Background(),
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	); err != nil {
		log.Fatalf("error creating schema resources: %v", err)
	}
	log.Println("ent client applied database migrations")
	// store globally
	EntClient = entClient
}
