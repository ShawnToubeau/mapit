# build stage
FROM golang:1.19.2-alpine3.16 AS build

WORKDIR /build
COPY . .

RUN CGO_ENABLED=0 go build -v -trimpath -o mapit-api

# final packaging
FROM golang:1.19.2-alpine3.16

# Run this here to ensure we always get up to date root certs
RUN apk update && apk add --no-cache git ca-certificates && update-ca-certificates

WORKDIR /
COPY --from=build /build/mapit-api mapit-api

EXPOSE 4444
ENTRYPOINT ["/mapit-api"]