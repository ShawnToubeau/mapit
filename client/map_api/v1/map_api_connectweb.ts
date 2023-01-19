// @generated by protoc-gen-connect-web v0.6.0 with parameter "target=ts"
// @generated from file map_api/v1/map_api.proto (package map_api.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateMapEventRequest, CreateMapEventResponse, DeleteMapEventRequest, DeleteMapEventResponse, GetAllMapEventsRequest, GetAllMapEventsResponse, GetMapEventRequest, GetMapEventResponse, UpdateMapEventRequest, UpdateMapEventResponse } from "./map_api_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service map_api.v1.MapEventService
 */
export const MapEventService = {
  typeName: "map_api.v1.MapEventService",
  methods: {
    /**
     * @generated from rpc map_api.v1.MapEventService.CreateMapEvent
     */
    createMapEvent: {
      name: "CreateMapEvent",
      I: CreateMapEventRequest,
      O: CreateMapEventResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc map_api.v1.MapEventService.GetMapEvent
     */
    getMapEvent: {
      name: "GetMapEvent",
      I: GetMapEventRequest,
      O: GetMapEventResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc map_api.v1.MapEventService.GetAllMapEvents
     */
    getAllMapEvents: {
      name: "GetAllMapEvents",
      I: GetAllMapEventsRequest,
      O: GetAllMapEventsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc map_api.v1.MapEventService.UpdateMapEvent
     */
    updateMapEvent: {
      name: "UpdateMapEvent",
      I: UpdateMapEventRequest,
      O: UpdateMapEventResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc map_api.v1.MapEventService.DeleteMapEvent
     */
    deleteMapEvent: {
      name: "DeleteMapEvent",
      I: DeleteMapEventRequest,
      O: DeleteMapEventResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

