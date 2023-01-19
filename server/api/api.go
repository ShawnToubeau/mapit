package api

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/jackc/pgtype"
	"mapit/server/db"
	mapapiv1 "mapit/server/map_api/v1"
	"time"
)

type MapEventServer struct{}

func (s *MapEventServer) CreateMapEvent(
	ctx context.Context,
	req *connect.Request[mapapiv1.CreateMapEventRequest],
) (*connect.Response[mapapiv1.CreateMapEventResponse], error) {
	event, err := db.Client.Event.Create().
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
		return nil, fmt.Errorf("failed creating map event: %w", err)
	}

	res := connect.NewResponse(&mapapiv1.CreateMapEventResponse{
		Id: event.ID.String(),
	})
	res.Header().Set("NewMapEvent-Version", "v1")
	return res, nil
}
