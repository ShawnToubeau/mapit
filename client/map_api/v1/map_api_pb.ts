// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file map_api/v1/map_api.proto (package map_api.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message map_api.v1.CreateMapEventRequest
 */
export class CreateMapEventRequest extends Message<CreateMapEventRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: int64 start_time = 2;
   */
  startTime = protoInt64.zero;

  /**
   * @generated from field: int64 end_time = 3;
   */
  endTime = protoInt64.zero;

  /**
   * @generated from field: double latitude = 4;
   */
  latitude = 0;

  /**
   * @generated from field: double longitude = 5;
   */
  longitude = 0;

  /**
   * @generated from field: string description = 6;
   */
  description = "";

  constructor(data?: PartialMessage<CreateMapEventRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.CreateMapEventRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "start_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "end_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "latitude", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 5, name: "longitude", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 6, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateMapEventRequest {
    return new CreateMapEventRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateMapEventRequest {
    return new CreateMapEventRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateMapEventRequest {
    return new CreateMapEventRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateMapEventRequest | PlainMessage<CreateMapEventRequest> | undefined, b: CreateMapEventRequest | PlainMessage<CreateMapEventRequest> | undefined): boolean {
    return proto3.util.equals(CreateMapEventRequest, a, b);
  }
}

/**
 * @generated from message map_api.v1.CreateMapEventResponse
 */
export class CreateMapEventResponse extends Message<CreateMapEventResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<CreateMapEventResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.CreateMapEventResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateMapEventResponse {
    return new CreateMapEventResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateMapEventResponse {
    return new CreateMapEventResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateMapEventResponse {
    return new CreateMapEventResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateMapEventResponse | PlainMessage<CreateMapEventResponse> | undefined, b: CreateMapEventResponse | PlainMessage<CreateMapEventResponse> | undefined): boolean {
    return proto3.util.equals(CreateMapEventResponse, a, b);
  }
}

/**
 * @generated from message map_api.v1.GetMapEventRequest
 */
export class GetMapEventRequest extends Message<GetMapEventRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<GetMapEventRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.GetMapEventRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMapEventRequest {
    return new GetMapEventRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMapEventRequest {
    return new GetMapEventRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMapEventRequest {
    return new GetMapEventRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetMapEventRequest | PlainMessage<GetMapEventRequest> | undefined, b: GetMapEventRequest | PlainMessage<GetMapEventRequest> | undefined): boolean {
    return proto3.util.equals(GetMapEventRequest, a, b);
  }
}

/**
 * @generated from message map_api.v1.GetMapEventResponse
 */
export class GetMapEventResponse extends Message<GetMapEventResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: int64 start_time = 3;
   */
  startTime = protoInt64.zero;

  /**
   * @generated from field: int64 end_time = 4;
   */
  endTime = protoInt64.zero;

  /**
   * @generated from field: double latitude = 5;
   */
  latitude = 0;

  /**
   * @generated from field: double longitude = 6;
   */
  longitude = 0;

  /**
   * @generated from field: string description = 7;
   */
  description = "";

  constructor(data?: PartialMessage<GetMapEventResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.GetMapEventResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "start_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "end_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "latitude", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 6, name: "longitude", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 7, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMapEventResponse {
    return new GetMapEventResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMapEventResponse {
    return new GetMapEventResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMapEventResponse {
    return new GetMapEventResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetMapEventResponse | PlainMessage<GetMapEventResponse> | undefined, b: GetMapEventResponse | PlainMessage<GetMapEventResponse> | undefined): boolean {
    return proto3.util.equals(GetMapEventResponse, a, b);
  }
}

/**
 * @generated from message map_api.v1.UpdateMapEventRequest
 */
export class UpdateMapEventRequest extends Message<UpdateMapEventRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: int64 start_time = 3;
   */
  startTime = protoInt64.zero;

  /**
   * @generated from field: int64 end_time = 4;
   */
  endTime = protoInt64.zero;

  /**
   * @generated from field: double latitude = 5;
   */
  latitude = 0;

  /**
   * @generated from field: double longitude = 6;
   */
  longitude = 0;

  /**
   * @generated from field: string description = 7;
   */
  description = "";

  constructor(data?: PartialMessage<UpdateMapEventRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.UpdateMapEventRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "start_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "end_time", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "latitude", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 6, name: "longitude", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 7, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateMapEventRequest {
    return new UpdateMapEventRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateMapEventRequest {
    return new UpdateMapEventRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateMapEventRequest {
    return new UpdateMapEventRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateMapEventRequest | PlainMessage<UpdateMapEventRequest> | undefined, b: UpdateMapEventRequest | PlainMessage<UpdateMapEventRequest> | undefined): boolean {
    return proto3.util.equals(UpdateMapEventRequest, a, b);
  }
}

/**
 * @generated from message map_api.v1.UpdateMapEventResponse
 */
export class UpdateMapEventResponse extends Message<UpdateMapEventResponse> {
  constructor(data?: PartialMessage<UpdateMapEventResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.UpdateMapEventResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateMapEventResponse {
    return new UpdateMapEventResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateMapEventResponse {
    return new UpdateMapEventResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateMapEventResponse {
    return new UpdateMapEventResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateMapEventResponse | PlainMessage<UpdateMapEventResponse> | undefined, b: UpdateMapEventResponse | PlainMessage<UpdateMapEventResponse> | undefined): boolean {
    return proto3.util.equals(UpdateMapEventResponse, a, b);
  }
}

/**
 * @generated from message map_api.v1.DeleteMapEventRequest
 */
export class DeleteMapEventRequest extends Message<DeleteMapEventRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<DeleteMapEventRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.DeleteMapEventRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteMapEventRequest {
    return new DeleteMapEventRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteMapEventRequest {
    return new DeleteMapEventRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteMapEventRequest {
    return new DeleteMapEventRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteMapEventRequest | PlainMessage<DeleteMapEventRequest> | undefined, b: DeleteMapEventRequest | PlainMessage<DeleteMapEventRequest> | undefined): boolean {
    return proto3.util.equals(DeleteMapEventRequest, a, b);
  }
}

/**
 * @generated from message map_api.v1.DeleteMapEventResponse
 */
export class DeleteMapEventResponse extends Message<DeleteMapEventResponse> {
  constructor(data?: PartialMessage<DeleteMapEventResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "map_api.v1.DeleteMapEventResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteMapEventResponse {
    return new DeleteMapEventResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteMapEventResponse {
    return new DeleteMapEventResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteMapEventResponse {
    return new DeleteMapEventResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteMapEventResponse | PlainMessage<DeleteMapEventResponse> | undefined, b: DeleteMapEventResponse | PlainMessage<DeleteMapEventResponse> | undefined): boolean {
    return proto3.util.equals(DeleteMapEventResponse, a, b);
  }
}

