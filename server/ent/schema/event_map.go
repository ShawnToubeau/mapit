package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
)

// EventMap holds the schema definition for the EventMap entity.
type EventMap struct {
	ent.Schema
}

// Fields of the EventMap.
func (EventMap) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Default(uuid.New),
		field.UUID("owner_id", uuid.UUID{}),
		field.String("name"),
		field.Other("bounding_box", &pgtype.Box{}).SchemaType(map[string]string{
			dialect.Postgres: "box",
		}).Optional(),
	}
}

// Edges of the EventMap.
func (EventMap) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("events", Event.Type).
			Annotations(entsql.Annotation{
				OnDelete: entsql.Cascade,
			}),
	}
}
