// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        (unknown)
// source: event_api/v1/event_api.proto

package event_apiv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type CreateEventRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name        string  `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	StartTime   int64   `protobuf:"varint,2,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
	EndTime     int64   `protobuf:"varint,3,opt,name=end_time,json=endTime,proto3" json:"end_time,omitempty"`
	Latitude    float64 `protobuf:"fixed64,4,opt,name=latitude,proto3" json:"latitude,omitempty"`
	Longitude   float64 `protobuf:"fixed64,5,opt,name=longitude,proto3" json:"longitude,omitempty"`
	Description string  `protobuf:"bytes,6,opt,name=description,proto3" json:"description,omitempty"`
	MapId       string  `protobuf:"bytes,7,opt,name=map_id,json=mapId,proto3" json:"map_id,omitempty"`
}

func (x *CreateEventRequest) Reset() {
	*x = CreateEventRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateEventRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateEventRequest) ProtoMessage() {}

func (x *CreateEventRequest) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateEventRequest.ProtoReflect.Descriptor instead.
func (*CreateEventRequest) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{0}
}

func (x *CreateEventRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *CreateEventRequest) GetStartTime() int64 {
	if x != nil {
		return x.StartTime
	}
	return 0
}

func (x *CreateEventRequest) GetEndTime() int64 {
	if x != nil {
		return x.EndTime
	}
	return 0
}

func (x *CreateEventRequest) GetLatitude() float64 {
	if x != nil {
		return x.Latitude
	}
	return 0
}

func (x *CreateEventRequest) GetLongitude() float64 {
	if x != nil {
		return x.Longitude
	}
	return 0
}

func (x *CreateEventRequest) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *CreateEventRequest) GetMapId() string {
	if x != nil {
		return x.MapId
	}
	return ""
}

type CreateEventResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *CreateEventResponse) Reset() {
	*x = CreateEventResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateEventResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateEventResponse) ProtoMessage() {}

func (x *CreateEventResponse) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateEventResponse.ProtoReflect.Descriptor instead.
func (*CreateEventResponse) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{1}
}

func (x *CreateEventResponse) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

type GetEventRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *GetEventRequest) Reset() {
	*x = GetEventRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetEventRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetEventRequest) ProtoMessage() {}

func (x *GetEventRequest) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetEventRequest.ProtoReflect.Descriptor instead.
func (*GetEventRequest) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{2}
}

func (x *GetEventRequest) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

type GetEventResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string  `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name        string  `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	StartTime   int64   `protobuf:"varint,3,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
	EndTime     int64   `protobuf:"varint,4,opt,name=end_time,json=endTime,proto3" json:"end_time,omitempty"`
	Latitude    float64 `protobuf:"fixed64,5,opt,name=latitude,proto3" json:"latitude,omitempty"`
	Longitude   float64 `protobuf:"fixed64,6,opt,name=longitude,proto3" json:"longitude,omitempty"`
	Description string  `protobuf:"bytes,7,opt,name=description,proto3" json:"description,omitempty"`
}

func (x *GetEventResponse) Reset() {
	*x = GetEventResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetEventResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetEventResponse) ProtoMessage() {}

func (x *GetEventResponse) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetEventResponse.ProtoReflect.Descriptor instead.
func (*GetEventResponse) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{3}
}

func (x *GetEventResponse) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *GetEventResponse) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *GetEventResponse) GetStartTime() int64 {
	if x != nil {
		return x.StartTime
	}
	return 0
}

func (x *GetEventResponse) GetEndTime() int64 {
	if x != nil {
		return x.EndTime
	}
	return 0
}

func (x *GetEventResponse) GetLatitude() float64 {
	if x != nil {
		return x.Latitude
	}
	return 0
}

func (x *GetEventResponse) GetLongitude() float64 {
	if x != nil {
		return x.Longitude
	}
	return 0
}

func (x *GetEventResponse) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

type GetAllEventsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ParentMapId string `protobuf:"bytes,1,opt,name=parent_map_id,json=parentMapId,proto3" json:"parent_map_id,omitempty"`
}

func (x *GetAllEventsRequest) Reset() {
	*x = GetAllEventsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetAllEventsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetAllEventsRequest) ProtoMessage() {}

func (x *GetAllEventsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetAllEventsRequest.ProtoReflect.Descriptor instead.
func (*GetAllEventsRequest) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{4}
}

func (x *GetAllEventsRequest) GetParentMapId() string {
	if x != nil {
		return x.ParentMapId
	}
	return ""
}

type GetAllEventsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Events []*GetEventResponse `protobuf:"bytes,1,rep,name=events,proto3" json:"events,omitempty"`
}

func (x *GetAllEventsResponse) Reset() {
	*x = GetAllEventsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetAllEventsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetAllEventsResponse) ProtoMessage() {}

func (x *GetAllEventsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetAllEventsResponse.ProtoReflect.Descriptor instead.
func (*GetAllEventsResponse) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{5}
}

func (x *GetAllEventsResponse) GetEvents() []*GetEventResponse {
	if x != nil {
		return x.Events
	}
	return nil
}

type UpdateEventRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string  `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name        string  `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	StartTime   int64   `protobuf:"varint,3,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
	EndTime     int64   `protobuf:"varint,4,opt,name=end_time,json=endTime,proto3" json:"end_time,omitempty"`
	Latitude    float64 `protobuf:"fixed64,5,opt,name=latitude,proto3" json:"latitude,omitempty"`
	Longitude   float64 `protobuf:"fixed64,6,opt,name=longitude,proto3" json:"longitude,omitempty"`
	Description string  `protobuf:"bytes,7,opt,name=description,proto3" json:"description,omitempty"`
}

func (x *UpdateEventRequest) Reset() {
	*x = UpdateEventRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdateEventRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdateEventRequest) ProtoMessage() {}

func (x *UpdateEventRequest) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdateEventRequest.ProtoReflect.Descriptor instead.
func (*UpdateEventRequest) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{6}
}

func (x *UpdateEventRequest) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *UpdateEventRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *UpdateEventRequest) GetStartTime() int64 {
	if x != nil {
		return x.StartTime
	}
	return 0
}

func (x *UpdateEventRequest) GetEndTime() int64 {
	if x != nil {
		return x.EndTime
	}
	return 0
}

func (x *UpdateEventRequest) GetLatitude() float64 {
	if x != nil {
		return x.Latitude
	}
	return 0
}

func (x *UpdateEventRequest) GetLongitude() float64 {
	if x != nil {
		return x.Longitude
	}
	return 0
}

func (x *UpdateEventRequest) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

type UpdateEventResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *UpdateEventResponse) Reset() {
	*x = UpdateEventResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdateEventResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdateEventResponse) ProtoMessage() {}

func (x *UpdateEventResponse) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdateEventResponse.ProtoReflect.Descriptor instead.
func (*UpdateEventResponse) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{7}
}

type DeleteEventRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *DeleteEventRequest) Reset() {
	*x = DeleteEventRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeleteEventRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeleteEventRequest) ProtoMessage() {}

func (x *DeleteEventRequest) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeleteEventRequest.ProtoReflect.Descriptor instead.
func (*DeleteEventRequest) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{8}
}

func (x *DeleteEventRequest) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

type DeleteEventResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *DeleteEventResponse) Reset() {
	*x = DeleteEventResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_event_api_v1_event_api_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeleteEventResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeleteEventResponse) ProtoMessage() {}

func (x *DeleteEventResponse) ProtoReflect() protoreflect.Message {
	mi := &file_event_api_v1_event_api_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeleteEventResponse.ProtoReflect.Descriptor instead.
func (*DeleteEventResponse) Descriptor() ([]byte, []int) {
	return file_event_api_v1_event_api_proto_rawDescGZIP(), []int{9}
}

var File_event_api_v1_event_api_proto protoreflect.FileDescriptor

var file_event_api_v1_event_api_proto_rawDesc = []byte{
	0x0a, 0x1c, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2f, 0x76, 0x31, 0x2f, 0x65,
	0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x12,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e,
	0x76, 0x31, 0x22, 0xd5, 0x01, 0x0a, 0x12, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65,
	0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1d, 0x0a,
	0x0a, 0x73, 0x74, 0x61, 0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x09, 0x73, 0x74, 0x61, 0x72, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x19, 0x0a, 0x08,
	0x65, 0x6e, 0x64, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x07,
	0x65, 0x6e, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x6c, 0x61, 0x74, 0x69, 0x74,
	0x75, 0x64, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x01, 0x52, 0x08, 0x6c, 0x61, 0x74, 0x69, 0x74,
	0x75, 0x64, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x6c, 0x6f, 0x6e, 0x67, 0x69, 0x74, 0x75, 0x64, 0x65,
	0x18, 0x05, 0x20, 0x01, 0x28, 0x01, 0x52, 0x09, 0x6c, 0x6f, 0x6e, 0x67, 0x69, 0x74, 0x75, 0x64,
	0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e,
	0x18, 0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74,
	0x69, 0x6f, 0x6e, 0x12, 0x15, 0x0a, 0x06, 0x6d, 0x61, 0x70, 0x5f, 0x69, 0x64, 0x18, 0x07, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x05, 0x6d, 0x61, 0x70, 0x49, 0x64, 0x22, 0x25, 0x0a, 0x13, 0x43, 0x72,
	0x65, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69,
	0x64, 0x22, 0x21, 0x0a, 0x0f, 0x47, 0x65, 0x74, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x02, 0x69, 0x64, 0x22, 0xcc, 0x01, 0x0a, 0x10, 0x47, 0x65, 0x74, 0x45, 0x76, 0x65, 0x6e,
	0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1d, 0x0a,
	0x0a, 0x73, 0x74, 0x61, 0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x09, 0x73, 0x74, 0x61, 0x72, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x19, 0x0a, 0x08,
	0x65, 0x6e, 0x64, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x03, 0x52, 0x07,
	0x65, 0x6e, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x6c, 0x61, 0x74, 0x69, 0x74,
	0x75, 0x64, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x01, 0x52, 0x08, 0x6c, 0x61, 0x74, 0x69, 0x74,
	0x75, 0x64, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x6c, 0x6f, 0x6e, 0x67, 0x69, 0x74, 0x75, 0x64, 0x65,
	0x18, 0x06, 0x20, 0x01, 0x28, 0x01, 0x52, 0x09, 0x6c, 0x6f, 0x6e, 0x67, 0x69, 0x74, 0x75, 0x64,
	0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e,
	0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74,
	0x69, 0x6f, 0x6e, 0x22, 0x39, 0x0a, 0x13, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x45, 0x76, 0x65,
	0x6e, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x22, 0x0a, 0x0d, 0x70, 0x61,
	0x72, 0x65, 0x6e, 0x74, 0x5f, 0x6d, 0x61, 0x70, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0b, 0x70, 0x61, 0x72, 0x65, 0x6e, 0x74, 0x4d, 0x61, 0x70, 0x49, 0x64, 0x22, 0x54,
	0x0a, 0x14, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x3c, 0x0a, 0x06, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x73,
	0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x24, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65,
	0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x52, 0x06, 0x65, 0x76,
	0x65, 0x6e, 0x74, 0x73, 0x22, 0xce, 0x01, 0x0a, 0x12, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12,
	0x1d, 0x0a, 0x0a, 0x73, 0x74, 0x61, 0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x03, 0x20,
	0x01, 0x28, 0x03, 0x52, 0x09, 0x73, 0x74, 0x61, 0x72, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x19,
	0x0a, 0x08, 0x65, 0x6e, 0x64, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x03,
	0x52, 0x07, 0x65, 0x6e, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x6c, 0x61, 0x74,
	0x69, 0x74, 0x75, 0x64, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x01, 0x52, 0x08, 0x6c, 0x61, 0x74,
	0x69, 0x74, 0x75, 0x64, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x6c, 0x6f, 0x6e, 0x67, 0x69, 0x74, 0x75,
	0x64, 0x65, 0x18, 0x06, 0x20, 0x01, 0x28, 0x01, 0x52, 0x09, 0x6c, 0x6f, 0x6e, 0x67, 0x69, 0x74,
	0x75, 0x64, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69,
	0x6f, 0x6e, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69,
	0x70, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0x15, 0x0a, 0x13, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x24, 0x0a, 0x12,
	0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02,
	0x69, 0x64, 0x22, 0x15, 0x0a, 0x13, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e,
	0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x32, 0xf2, 0x03, 0x0a, 0x0c, 0x45, 0x76,
	0x65, 0x6e, 0x74, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x60, 0x0a, 0x0b, 0x43, 0x72,
	0x65, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x12, 0x26, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x43,
	0x72, 0x65, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x27, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f,
	0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65,
	0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x57, 0x0a, 0x08,
	0x47, 0x65, 0x74, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x12, 0x23, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x47, 0x65,
	0x74, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x24, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e,
	0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x63, 0x0a, 0x0c, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x73, 0x12, 0x27, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76,
	0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x41, 0x6c,
	0x6c, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x28,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69,
	0x2e, 0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x60, 0x0a, 0x0b, 0x55, 0x70,
	0x64, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x12, 0x26, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x55,
	0x70, 0x64, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x27, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f,
	0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65,
	0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x60, 0x0a, 0x0b,
	0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x12, 0x26, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31,
	0x2e, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x27, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65, 0x6e,
	0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0xb2,
	0x01, 0x0a, 0x16, 0x63, 0x6f, 0x6d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x65, 0x76, 0x65,
	0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x42, 0x0d, 0x45, 0x76, 0x65, 0x6e, 0x74,
	0x41, 0x70, 0x69, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x23, 0x73, 0x65, 0x72, 0x76,
	0x65, 0x72, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69,
	0x2f, 0x76, 0x31, 0x3b, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x5f, 0x61, 0x70, 0x69, 0x76, 0x31, 0xa2,
	0x02, 0x03, 0x50, 0x45, 0x58, 0xaa, 0x02, 0x11, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x45, 0x76,
	0x65, 0x6e, 0x74, 0x41, 0x70, 0x69, 0x2e, 0x56, 0x31, 0xca, 0x02, 0x11, 0x50, 0x72, 0x6f, 0x74,
	0x6f, 0x5c, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x69, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x1d,
	0x50, 0x72, 0x6f, 0x74, 0x6f, 0x5c, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x69, 0x5c, 0x56,
	0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x13,
	0x50, 0x72, 0x6f, 0x74, 0x6f, 0x3a, 0x3a, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x69, 0x3a,
	0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_event_api_v1_event_api_proto_rawDescOnce sync.Once
	file_event_api_v1_event_api_proto_rawDescData = file_event_api_v1_event_api_proto_rawDesc
)

func file_event_api_v1_event_api_proto_rawDescGZIP() []byte {
	file_event_api_v1_event_api_proto_rawDescOnce.Do(func() {
		file_event_api_v1_event_api_proto_rawDescData = protoimpl.X.CompressGZIP(file_event_api_v1_event_api_proto_rawDescData)
	})
	return file_event_api_v1_event_api_proto_rawDescData
}

var file_event_api_v1_event_api_proto_msgTypes = make([]protoimpl.MessageInfo, 10)
var file_event_api_v1_event_api_proto_goTypes = []interface{}{
	(*CreateEventRequest)(nil),   // 0: proto.event_api.v1.CreateEventRequest
	(*CreateEventResponse)(nil),  // 1: proto.event_api.v1.CreateEventResponse
	(*GetEventRequest)(nil),      // 2: proto.event_api.v1.GetEventRequest
	(*GetEventResponse)(nil),     // 3: proto.event_api.v1.GetEventResponse
	(*GetAllEventsRequest)(nil),  // 4: proto.event_api.v1.GetAllEventsRequest
	(*GetAllEventsResponse)(nil), // 5: proto.event_api.v1.GetAllEventsResponse
	(*UpdateEventRequest)(nil),   // 6: proto.event_api.v1.UpdateEventRequest
	(*UpdateEventResponse)(nil),  // 7: proto.event_api.v1.UpdateEventResponse
	(*DeleteEventRequest)(nil),   // 8: proto.event_api.v1.DeleteEventRequest
	(*DeleteEventResponse)(nil),  // 9: proto.event_api.v1.DeleteEventResponse
}
var file_event_api_v1_event_api_proto_depIdxs = []int32{
	3, // 0: proto.event_api.v1.GetAllEventsResponse.events:type_name -> proto.event_api.v1.GetEventResponse
	0, // 1: proto.event_api.v1.EventService.CreateEvent:input_type -> proto.event_api.v1.CreateEventRequest
	2, // 2: proto.event_api.v1.EventService.GetEvent:input_type -> proto.event_api.v1.GetEventRequest
	4, // 3: proto.event_api.v1.EventService.GetAllEvents:input_type -> proto.event_api.v1.GetAllEventsRequest
	6, // 4: proto.event_api.v1.EventService.UpdateEvent:input_type -> proto.event_api.v1.UpdateEventRequest
	8, // 5: proto.event_api.v1.EventService.DeleteEvent:input_type -> proto.event_api.v1.DeleteEventRequest
	1, // 6: proto.event_api.v1.EventService.CreateEvent:output_type -> proto.event_api.v1.CreateEventResponse
	3, // 7: proto.event_api.v1.EventService.GetEvent:output_type -> proto.event_api.v1.GetEventResponse
	5, // 8: proto.event_api.v1.EventService.GetAllEvents:output_type -> proto.event_api.v1.GetAllEventsResponse
	7, // 9: proto.event_api.v1.EventService.UpdateEvent:output_type -> proto.event_api.v1.UpdateEventResponse
	9, // 10: proto.event_api.v1.EventService.DeleteEvent:output_type -> proto.event_api.v1.DeleteEventResponse
	6, // [6:11] is the sub-list for method output_type
	1, // [1:6] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_event_api_v1_event_api_proto_init() }
func file_event_api_v1_event_api_proto_init() {
	if File_event_api_v1_event_api_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_event_api_v1_event_api_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateEventRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateEventResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetEventRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetEventResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetAllEventsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetAllEventsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpdateEventRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpdateEventResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeleteEventRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_event_api_v1_event_api_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeleteEventResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_event_api_v1_event_api_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   10,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_event_api_v1_event_api_proto_goTypes,
		DependencyIndexes: file_event_api_v1_event_api_proto_depIdxs,
		MessageInfos:      file_event_api_v1_event_api_proto_msgTypes,
	}.Build()
	File_event_api_v1_event_api_proto = out.File
	file_event_api_v1_event_api_proto_rawDesc = nil
	file_event_api_v1_event_api_proto_goTypes = nil
	file_event_api_v1_event_api_proto_depIdxs = nil
}
