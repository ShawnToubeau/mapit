package map_event

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
	"server/db"
	"server/ent/event"
	mapapiv1 "server/gen/map_event_api/v1"
	"time"
)

type MapEventServer struct{}

func (s *MapEventServer) CreateMapEvent(
	ctx context.Context,
	req *connect.Request[mapapiv1.CreateMapEventRequest],
) (*connect.Response[mapapiv1.CreateMapEventResponse], error) {
	created, err := db.EntClient.Event.Create().
		SetName(req.Msg.Name).
		SetStartTime(time.UnixMilli(req.Msg.StartTime)).
		SetEndTime(time.UnixMilli(req.Msg.EndTime)).
		SetDescription(req.Msg.Description).
		SetPoint(&pgtype.Point{
			P: pgtype.Vec2{
				X: req.Msg.Latitude,
				Y: req.Msg.Longitude,
			},
			Status: pgtype.Present,
		}).Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("error creating event: %w", err)
	}

	res := connect.NewResponse(&mapapiv1.CreateMapEventResponse{
		Id: created.ID.String(),
	})
	res.Header().Set("CreateMapEvent-Version", "v1")
	return res, nil
}

func (s *MapEventServer) GetMapEvent(
	ctx context.Context,
	req *connect.Request[mapapiv1.GetMapEventRequest],
) (*connect.Response[mapapiv1.GetMapEventResponse], error) {
	eventId, err := uuid.Parse(req.Msg.Id)
	if err != nil {
		return nil, fmt.Errorf("error parsing event ID: %w", err)
	}

	queried, err := db.EntClient.Event.Query().Where(event.ID(eventId)).Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("error querying event: %w", err)
	}

	res := connect.NewResponse(&mapapiv1.GetMapEventResponse{
		Id:          queried.ID.String(),
		Name:        queried.Name,
		StartTime:   queried.StartTime.UnixMilli(),
		EndTime:     queried.EndTime.UnixMilli(),
		Latitude:    queried.Point.P.X,
		Longitude:   queried.Point.P.Y,
		Description: queried.Description,
	})
	res.Header().Set("GetMapEvent-Version", "v1")
	return res, nil
}

func (s *MapEventServer) GetAllMapEvents(
	ctx context.Context,
	req *connect.Request[mapapiv1.GetAllMapEventsRequest],
) (*connect.Response[mapapiv1.GetAllMapEventsResponse], error) {
	queried, err := db.EntClient.Event.Query().All(ctx)
	if err != nil {
		return nil, fmt.Errorf("error querying events: %w", err)
	}

	var events []*mapapiv1.GetMapEventResponse
	for _, eventIter := range queried {
		events = append(events, &mapapiv1.GetMapEventResponse{
			Id:          eventIter.ID.String(),
			Name:        eventIter.Name,
			StartTime:   eventIter.StartTime.UnixMilli(),
			EndTime:     eventIter.EndTime.UnixMilli(),
			Latitude:    eventIter.Point.P.X,
			Longitude:   eventIter.Point.P.Y,
			Description: eventIter.Description,
		})
	}

	res := connect.NewResponse(&mapapiv1.GetAllMapEventsResponse{
		Events: events,
	})
	res.Header().Set("GetAllMapEvents-Version", "v1")
	return res, nil
}

func (s *MapEventServer) UpdateMapEvent(
	ctx context.Context,
	req *connect.Request[mapapiv1.UpdateMapEventRequest],
) (*connect.Response[mapapiv1.UpdateMapEventResponse], error) {
	eventId, err := uuid.Parse(req.Msg.Id)
	if err != nil {
		return nil, fmt.Errorf("error parsing event ID: %w", err)
	}

	_, err = db.EntClient.Event.
		UpdateOneID(eventId).
		SetName(req.Msg.Name).
		SetStartTime(time.UnixMilli(req.Msg.StartTime)).
		SetEndTime(time.UnixMilli(req.Msg.EndTime)).
		SetDescription(req.Msg.Description).
		SetPoint(&pgtype.Point{
			P: pgtype.Vec2{
				X: req.Msg.Latitude,
				Y: req.Msg.Longitude,
			},
			Status: pgtype.Present,
		}).Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("error updating event: %w", err)
	}

	res := connect.NewResponse(&mapapiv1.UpdateMapEventResponse{})
	res.Header().Set("UpdateMapEvent-Version", "v1")
	return res, nil
}

func (s *MapEventServer) DeleteMapEvent(
	ctx context.Context,
	req *connect.Request[mapapiv1.DeleteMapEventRequest],
) (*connect.Response[mapapiv1.DeleteMapEventResponse], error) {
	eventId, err := uuid.Parse(req.Msg.Id)
	if err != nil {
		return nil, fmt.Errorf("error parsing event ID: %w", err)
	}

	err = db.EntClient.Event.
		DeleteOneID(eventId).
		Exec(ctx)
	if err != nil {
		return nil, fmt.Errorf("error deleting event: %w", err)
	}

	res := connect.NewResponse(&mapapiv1.DeleteMapEventResponse{})
	res.Header().Set("DeleteMapEvent-Version", "v1")
	return res, nil
}
