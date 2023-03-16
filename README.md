# Mapit

Mapit is an open-source mapping tool that makes it easy for organizers to manage and share points-of-interest for their events.

Mapit is built with Go 1.19, Next.js 12, and Protocol Buffers v3. The client offers a highly interactive map using [Leaflet](https://leafletjs.com/) and map tiles from [OpenStreetMap](https://www.openstreetmap.org). Client-server communication is handled by [Connect](https://connect.build/) to generate gRPC APIs. The server talks to a [Supabase](https://supabase.com/) instance running PostgreSQL. It uses [Ent](https://entgo.io/) to manage migrations and perform simple CRUD operations. Authentication is managed by Supabase as well, providing easy integration within both the client and server. Mapit employs the [Nominatim](https://nominatim.org/) geocoding service for address lookup and caches results in Redis.

## Developer Setup

### Environment Variables

The `./server` directory contains a `.env` file which holds PostgreSQL and Redis connection info. You can get the PostgreSQL info from Supabase. It's important that Supabase **must** be used because Mapit depends on it for authentication.

Mapit can use any Redis instance. We currently use an [Upstash](https://upstash.com/) free tier.

The `./client` directory contains a `.env.local` file which holds Supabase connection info for authentication.

### Root

| Command          | Description                                                 |
|------------------|-------------------------------------------------------------|
| `buf lint`       | Lint all protocol buffer files                              |
| `yarn gen-proto` | Generate the latest client code based on the protobuf files |

### Server

| Command                                                            | Description                                |
|--------------------------------------------------------------------|--------------------------------------------|
| `migrate create -ext sql -dir db/migrations -seq <MIGRATION_NAME>` | Creates empty up and down migration files  |
| `go generate ./ent`                                                | Generates DB client and applies migrations |
| `go run main.go`                                                   | Starts the server on port 8080             |
| `flyctl deploy`                                                    | Deploy the latest code to fly.io           |

### Client

| Command                   | Description                         |
|---------------------------|-------------------------------------|
| `yarn dev`                | Starts the client on port 3000      |
| `ANALYZE=true yarn build` | Build and analyze the client bundle |

### Embed

| Command        | Description                     |
|----------------|---------------------------------|
| `yarn build`   | Build the mapit-embed package   |
| `yarn publish` | Publish the latest build to NPM |
