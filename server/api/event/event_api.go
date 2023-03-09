package event

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
	"server/db"
	"server/ent/event"
	"server/ent/eventmap"
	eventapiv1 "server/gen/proto/event_api/v1"
	"time"
)

type EventServer struct{}

func (s *EventServer) CreateEvent(
	ctx context.Context,
	req *connect.Request[eventapiv1.CreateEventRequest],
) (*connect.Response[eventapiv1.CreateEventResponse], error) {
	mapId, err := uuid.Parse(req.Msg.MapId)
	if err != nil {
		return nil, fmt.Errorf("error parsing event_map ID: %w", err)
	}

	created, err := db.EntClient.Event.Create().
		SetParentMapID(mapId).
		SetName(req.Msg.Name).
		SetStartTime(time.UnixMilli(req.Msg.StartTime)).
		SetEndTime(time.UnixMilli(req.Msg.EndTime)).
		SetDescription(req.Msg.Description).
		SetPoint(&pgtype.Point{
			P: pgtype.Vec2{
				Y: req.Msg.Latitude,
				X: req.Msg.Longitude,
			},
			Status: pgtype.Present,
		}).Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("error creating event: %w", err)
	}

	res := connect.NewResponse(&eventapiv1.CreateEventResponse{
		Id: created.ID.String(),
	})
	res.Header().Set("CreateEvent-Version", "v1")
	return res, nil
}

func (s *EventServer) GetEvent(
	ctx context.Context,
	req *connect.Request[eventapiv1.GetEventRequest],
) (*connect.Response[eventapiv1.GetEventResponse], error) {
	eventId, err := uuid.Parse(req.Msg.Id)
	if err != nil {
		return nil, fmt.Errorf("error parsing event ID: %w", err)
	}

	queried, err := db.EntClient.Event.Query().Where(event.ID(eventId)).Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("error querying event: %w", err)
	}

	res := connect.NewResponse(&eventapiv1.GetEventResponse{
		Id:          queried.ID.String(),
		Name:        queried.Name,
		StartTime:   queried.StartTime.UnixMilli(),
		EndTime:     queried.EndTime.UnixMilli(),
		Latitude:    queried.Point.P.Y,
		Longitude:   queried.Point.P.X,
		Description: queried.Description,
	})
	res.Header().Set("GetEvent-Version", "v1")
	return res, nil
}

func (s *EventServer) GetAllEvents(
	ctx context.Context,
	req *connect.Request[eventapiv1.GetAllEventsRequest],
) (*connect.Response[eventapiv1.GetAllEventsResponse], error) {
	eventMapId, err := uuid.Parse(req.Msg.ParentMapId)
	if err != nil {
		return nil, fmt.Errorf("error parsing event map ID: %w", err)
	}

	queriedMap, err := db.EntClient.EventMap.Query().Where(eventmap.ID(eventMapId)).Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("error querying map by ID: %w", err)
	}

	queriedEvents, err := queriedMap.QueryEvents().All(ctx)
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

	res := connect.NewResponse(&eventapiv1.GetAllEventsResponse{
		Events: events,
	})
	res.Header().Set("GetAllEvents-Version", "v1")
	return res, nil
}

func (s *EventServer) UpdateEvent(
	ctx context.Context,
	req *connect.Request[eventapiv1.UpdateEventRequest],
) (*connect.Response[eventapiv1.UpdateEventResponse], error) {
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
				Y: req.Msg.Latitude,
				X: req.Msg.Longitude,
			},
			Status: pgtype.Present,
		}).Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("error updating event: %w", err)
	}

	res := connect.NewResponse(&eventapiv1.UpdateEventResponse{})
	res.Header().Set("UpdateEvent-Version", "v1")
	return res, nil
}

func (s *EventServer) DeleteEvent(
	ctx context.Context,
	req *connect.Request[eventapiv1.DeleteEventRequest],
) (*connect.Response[eventapiv1.DeleteEventResponse], error) {
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

	res := connect.NewResponse(&eventapiv1.DeleteEventResponse{})
	res.Header().Set("DeleteEvent-Version", "v1")
	return res, nil
}
