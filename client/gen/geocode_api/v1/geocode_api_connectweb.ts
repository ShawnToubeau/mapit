// @generated by protoc-gen-connect-web v0.6.0 with parameter "target=ts"
// @generated from file geocode_api/v1/geocode_api.proto (package geocode_api.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GeocodeSearchRequest, GeocodeSearchResponse } from "./geocode_api_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service geocode_api.v1.GeocodeService
 */
export const GeocodeService = {
  typeName: "geocode_api.v1.GeocodeService",
  methods: {
    /**
     * @generated from rpc geocode_api.v1.GeocodeService.SearchAddress
     */
    searchAddress: {
      name: "SearchAddress",
      I: GeocodeSearchRequest,
      O: GeocodeSearchResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

