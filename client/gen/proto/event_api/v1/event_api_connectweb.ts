// @generated by protoc-gen-connect-web v0.6.0 with parameter "target=ts"
// @generated from file proto/event_api/v1/event_api.proto (package proto.event_api.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateEventRequest, CreateEventResponse, DeleteEventRequest, DeleteEventResponse, GetAllEventsRequest, GetAllEventsResponse, GetEventRequest, GetEventResponse, UpdateEventRequest, UpdateEventResponse } from "./event_api_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service proto.event_api.v1.EventService
 */
export const EventService = {
  typeName: "proto.event_api.v1.EventService",
  methods: {
    /**
     * @generated from rpc proto.event_api.v1.EventService.CreateEvent
     */
    createEvent: {
      name: "CreateEvent",
      I: CreateEventRequest,
      O: CreateEventResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc proto.event_api.v1.EventService.GetEvent
     */
    getEvent: {
      name: "GetEvent",
      I: GetEventRequest,
      O: GetEventResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc proto.event_api.v1.EventService.GetAllEvents
     */
    getAllEvents: {
      name: "GetAllEvents",
      I: GetAllEventsRequest,
      O: GetAllEventsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc proto.event_api.v1.EventService.UpdateEvent
     */
    updateEvent: {
      name: "UpdateEvent",
      I: UpdateEventRequest,
      O: UpdateEventResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc proto.event_api.v1.EventService.DeleteEvent
     */
    deleteEvent: {
      name: "DeleteEvent",
      I: DeleteEventRequest,
      O: DeleteEventResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

