package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
)

// Event holds the schema definition for the Event entity.
type Event struct {
	ent.Schema
}

// Fields of the Event.
func (Event) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Default(uuid.New),
		field.String("name"),
		field.Time("start_time"),
		field.Time("end_time"),
		field.Other("point", &pgtype.Point{}).SchemaType(map[string]string{
			dialect.Postgres: "point",
		}),
		field.String("description"),
	}
}

// Edges of the Event.
func (Event) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("parent_map", EventMap.Type).
			Ref("events").
			Unique().Required(),
	}
}
