package api

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
	"mapit/server/db"
	"mapit/server/ent/event"
	mapapiv1 "mapit/server/map_api/v1"
	"time"
)

type MapEventServer struct{}

func (s *MapEventServer) CreateMapEvent(
	ctx context.Context,
	req *connect.Request[mapapiv1.CreateMapEventRequest],
) (*connect.Response[mapapiv1.CreateMapEventResponse], error) {
	created, err := db.Client.Event.Create().
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
		return nil, fmt.Errorf("failed creating event: %w", err)
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

	queried, err := db.Client.Event.Query().Where(event.ID(eventId)).Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed querying event: %w", err)
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
