package event_map

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
	"server/db"
	"server/ent/eventmap"
	eventapiv1 "server/gen/event_api/v1"
	eventmapapiv1 "server/gen/event_map_api/v1"
)

type EventMapServer struct{}

func (s *EventMapServer) CreateEventMap(
	ctx context.Context,
	req *connect.Request[eventmapapiv1.CreateEventMapRequest],
) (*connect.Response[eventmapapiv1.CreateEventMapResponse], error) {
	claims, _ := ctx.Value("claims").(jwt.MapClaims)
	userId := claims["sub"].(string)
	ownerId, err := uuid.Parse(userId)
	if err != nil {
		return nil, fmt.Errorf("error parsing user ID: %w", err)
	}

	created, err := db.EntClient.EventMap.Create().
		SetOwnerID(ownerId).
		SetName(req.Msg.Name).
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("error creating event map: %w", err)
	}

	res := connect.NewResponse(&eventmapapiv1.CreateEventMapResponse{
		Id: created.ID.String(),
	})
	res.Header().Set("CreateEventMap-Version", "v1")
	return res, nil
}

func (s *EventMapServer) GetEventMap(
	ctx context.Context,
	req *connect.Request[eventmapapiv1.GetEventMapRequest],
) (*connect.Response[eventmapapiv1.GetEventMapResponse], error) {
	eventMapId, err := uuid.Parse(req.Msg.Id)
	if err != nil {
		return nil, fmt.Errorf("error parsing event map ID: %w", err)
	}

	queried, err := db.EntClient.EventMap.Query().Where(eventmap.ID(eventMapId)).Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("error querying event map: %w", err)
	}

	queriedEvents, err := queried.QueryEvents().All(ctx)
	if err != nil {
		return nil, fmt.Errorf("error querying map events: %w", err)
	}

	var events []*eventapiv1.GetEventResponse
	for _, eventIter := range queriedEvents {
		events = append(events, &eventapiv1.GetEventResponse{
			Id:          eventIter.ID.String(),
			Name:        eventIter.Name,
			StartTime:   eventIter.StartTime.UnixMilli(),
			EndTime:     eventIter.EndTime.UnixMilli(),
			Latitude:    eventIter.Point.P.Y,
			Longitude:   eventIter.Point.P.X,
			Description: eventIter.Description,
		})
	}

	mapRes := &eventmapapiv1.GetEventMapResponse{
		Id:        queried.ID.String(),
		OwnerId:   queried.OwnerID.String(),
		Name:      queried.Name,
		NumEvents: int32(len(events)),
		Events:    events,
	}

	if queried.BoundingBox.Status == pgtype.Present {
		mapRes.BoundingBox = &eventmapapiv1.MapBoundingBox{
			NorthEastLatitude:  queried.BoundingBox.P[0].Y,
			NorthEastLongitude: queried.BoundingBox.P[0].X,
			SouthWestLatitude:  queried.BoundingBox.P[1].Y,
			SouthWestLongitude: queried.BoundingBox.P[1].X,
		}
	}

	res := connect.NewResponse(mapRes)
	res.Header().Set("GetEventMap-Version", "v1")
	return res, nil
}

func (s *EventMapServer) GetAllEventMaps(
	ctx context.Context,
	req *connect.Request[eventmapapiv1.GetAllEventMapsRequest],
) (*connect.Response[eventmapapiv1.GetAllEventMapsResponse], error) {
	claims, _ := ctx.Value("claims").(jwt.MapClaims)
	userId := claims["sub"].(string)
	ownerId, err := uuid.Parse(userId)
	if err != nil {
		return nil, fmt.Errorf("error parsing user ID: %w", err)
	}
	queried, err := db.EntClient.EventMap.Query().Where(eventmap.OwnerIDEQ(ownerId)).All(ctx)
	if err != nil {
		return nil, fmt.Errorf("error querying event maps: %w", err)
	}

	var events []*eventmapapiv1.GetEventMapResponse
	for _, eventIter := range queried {
		queriedEvents, err := eventIter.QueryEvents().All(ctx)
		if err != nil {
			return nil, fmt.Errorf("error querying map events: %w", err)
		}

		events = append(events, &eventmapapiv1.GetEventMapResponse{
			Id:        eventIter.ID.String(),
			Name:      eventIter.Name,
			NumEvents: int32(len(queriedEvents)),
		})
	}

	res := connect.NewResponse(&eventmapapiv1.GetAllEventMapsResponse{
		Events: events,
	})
	res.Header().Set("GetAllEventMaps-Version", "v1")
	return res, nil
}

func (s *EventMapServer) UpdateEventMap(
	ctx context.Context,
	req *connect.Request[eventmapapiv1.UpdateEventMapRequest],
) (*connect.Response[eventmapapiv1.UpdateEventMapResponse], error) {
	eventMapId, err := uuid.Parse(req.Msg.Id)
	if err != nil {
		return nil, fmt.Errorf("error parsing event map ID: %w", err)
	}

	_, err = db.EntClient.EventMap.
		UpdateOneID(eventMapId).
		SetName(req.Msg.Name).
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("error updating event map: %w", err)
	}

	res := connect.NewResponse(&eventmapapiv1.UpdateEventMapResponse{})
	res.Header().Set("UpdateEventMap-Version", "v1")
	return res, nil
}

func (s *EventMapServer) DeleteEventMap(
	ctx context.Context,
	req *connect.Request[eventmapapiv1.DeleteEventMapRequest],
) (*connect.Response[eventmapapiv1.DeleteEventMapResponse], error) {
	eventMapId, err := uuid.Parse(req.Msg.Id)
	if err != nil {
		return nil, fmt.Errorf("error parsing event map ID: %w", err)
	}

	err = db.EntClient.EventMap.
		DeleteOneID(eventMapId).
		Exec(ctx)
	if err != nil {
		return nil, fmt.Errorf("error deleting event map: %w", err)
	}

	res := connect.NewResponse(&eventmapapiv1.DeleteEventMapResponse{})
	res.Header().Set("DeleteEventMap-Version", "v1")
	return res, nil
}
