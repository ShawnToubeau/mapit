// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: map_api/v1/map_api.proto

package map_apiv1connect

import (
	context "context"
	errors "errors"
	connect_go "github.com/bufbuild/connect-go"
	v1 "mapit/server/map_api/v1"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect_go.IsAtLeastVersion0_1_0

const (
	// MapEventServiceName is the fully-qualified name of the MapEventService service.
	MapEventServiceName = "map_api.v1.MapEventService"
)

// MapEventServiceClient is a client for the map_api.v1.MapEventService service.
type MapEventServiceClient interface {
	CreateMapEvent(context.Context, *connect_go.Request[v1.CreateMapEventRequest]) (*connect_go.Response[v1.CreateMapEventResponse], error)
}

// NewMapEventServiceClient constructs a client for the map_api.v1.MapEventService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewMapEventServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) MapEventServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &mapEventServiceClient{
		createMapEvent: connect_go.NewClient[v1.CreateMapEventRequest, v1.CreateMapEventResponse](
			httpClient,
			baseURL+"/map_api.v1.MapEventService/CreateMapEvent",
			opts...,
		),
	}
}

// mapEventServiceClient implements MapEventServiceClient.
type mapEventServiceClient struct {
	createMapEvent *connect_go.Client[v1.CreateMapEventRequest, v1.CreateMapEventResponse]
}

// CreateMapEvent calls map_api.v1.MapEventService.CreateMapEvent.
func (c *mapEventServiceClient) CreateMapEvent(ctx context.Context, req *connect_go.Request[v1.CreateMapEventRequest]) (*connect_go.Response[v1.CreateMapEventResponse], error) {
	return c.createMapEvent.CallUnary(ctx, req)
}

// MapEventServiceHandler is an implementation of the map_api.v1.MapEventService service.
type MapEventServiceHandler interface {
	CreateMapEvent(context.Context, *connect_go.Request[v1.CreateMapEventRequest]) (*connect_go.Response[v1.CreateMapEventResponse], error)
}

// NewMapEventServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewMapEventServiceHandler(svc MapEventServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	mux := http.NewServeMux()
	mux.Handle("/map_api.v1.MapEventService/CreateMapEvent", connect_go.NewUnaryHandler(
		"/map_api.v1.MapEventService/CreateMapEvent",
		svc.CreateMapEvent,
		opts...,
	))
	return "/map_api.v1.MapEventService/", mux
}

// UnimplementedMapEventServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedMapEventServiceHandler struct{}

func (UnimplementedMapEventServiceHandler) CreateMapEvent(context.Context, *connect_go.Request[v1.CreateMapEventRequest]) (*connect_go.Response[v1.CreateMapEventResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("map_api.v1.MapEventService.CreateMapEvent is not implemented"))
}
