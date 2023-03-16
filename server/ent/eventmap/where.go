// Code generated by ent, DO NOT EDIT.

package eventmap

import (
	"server/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
)

// ID filters vertices based on their ID field.
func ID(id uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldLTE(FieldID, id))
}

// OwnerID applies equality check predicate on the "owner_id" field. It's identical to OwnerIDEQ.
func OwnerID(v uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldOwnerID, v))
}

// Name applies equality check predicate on the "name" field. It's identical to NameEQ.
func Name(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldName, v))
}

// BoundingBox applies equality check predicate on the "bounding_box" field. It's identical to BoundingBoxEQ.
func BoundingBox(v *pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldBoundingBox, v))
}

// OwnerIDEQ applies the EQ predicate on the "owner_id" field.
func OwnerIDEQ(v uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldOwnerID, v))
}

// OwnerIDNEQ applies the NEQ predicate on the "owner_id" field.
func OwnerIDNEQ(v uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldNEQ(FieldOwnerID, v))
}

// OwnerIDIn applies the In predicate on the "owner_id" field.
func OwnerIDIn(vs ...uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldIn(FieldOwnerID, vs...))
}

// OwnerIDNotIn applies the NotIn predicate on the "owner_id" field.
func OwnerIDNotIn(vs ...uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldNotIn(FieldOwnerID, vs...))
}

// OwnerIDGT applies the GT predicate on the "owner_id" field.
func OwnerIDGT(v uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldGT(FieldOwnerID, v))
}

// OwnerIDGTE applies the GTE predicate on the "owner_id" field.
func OwnerIDGTE(v uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldGTE(FieldOwnerID, v))
}

// OwnerIDLT applies the LT predicate on the "owner_id" field.
func OwnerIDLT(v uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldLT(FieldOwnerID, v))
}

// OwnerIDLTE applies the LTE predicate on the "owner_id" field.
func OwnerIDLTE(v uuid.UUID) predicate.EventMap {
	return predicate.EventMap(sql.FieldLTE(FieldOwnerID, v))
}

// NameEQ applies the EQ predicate on the "name" field.
func NameEQ(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldName, v))
}

// NameNEQ applies the NEQ predicate on the "name" field.
func NameNEQ(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldNEQ(FieldName, v))
}

// NameIn applies the In predicate on the "name" field.
func NameIn(vs ...string) predicate.EventMap {
	return predicate.EventMap(sql.FieldIn(FieldName, vs...))
}

// NameNotIn applies the NotIn predicate on the "name" field.
func NameNotIn(vs ...string) predicate.EventMap {
	return predicate.EventMap(sql.FieldNotIn(FieldName, vs...))
}

// NameGT applies the GT predicate on the "name" field.
func NameGT(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldGT(FieldName, v))
}

// NameGTE applies the GTE predicate on the "name" field.
func NameGTE(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldGTE(FieldName, v))
}

// NameLT applies the LT predicate on the "name" field.
func NameLT(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldLT(FieldName, v))
}

// NameLTE applies the LTE predicate on the "name" field.
func NameLTE(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldLTE(FieldName, v))
}

// NameContains applies the Contains predicate on the "name" field.
func NameContains(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldContains(FieldName, v))
}

// NameHasPrefix applies the HasPrefix predicate on the "name" field.
func NameHasPrefix(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldHasPrefix(FieldName, v))
}

// NameHasSuffix applies the HasSuffix predicate on the "name" field.
func NameHasSuffix(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldHasSuffix(FieldName, v))
}

// NameEqualFold applies the EqualFold predicate on the "name" field.
func NameEqualFold(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldEqualFold(FieldName, v))
}

// NameContainsFold applies the ContainsFold predicate on the "name" field.
func NameContainsFold(v string) predicate.EventMap {
	return predicate.EventMap(sql.FieldContainsFold(FieldName, v))
}

// BoundingBoxEQ applies the EQ predicate on the "bounding_box" field.
func BoundingBoxEQ(v *pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldEQ(FieldBoundingBox, v))
}

// BoundingBoxNEQ applies the NEQ predicate on the "bounding_box" field.
func BoundingBoxNEQ(v *pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldNEQ(FieldBoundingBox, v))
}

// BoundingBoxIn applies the In predicate on the "bounding_box" field.
func BoundingBoxIn(vs ...*pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldIn(FieldBoundingBox, vs...))
}

// BoundingBoxNotIn applies the NotIn predicate on the "bounding_box" field.
func BoundingBoxNotIn(vs ...*pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldNotIn(FieldBoundingBox, vs...))
}

// BoundingBoxGT applies the GT predicate on the "bounding_box" field.
func BoundingBoxGT(v *pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldGT(FieldBoundingBox, v))
}

// BoundingBoxGTE applies the GTE predicate on the "bounding_box" field.
func BoundingBoxGTE(v *pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldGTE(FieldBoundingBox, v))
}

// BoundingBoxLT applies the LT predicate on the "bounding_box" field.
func BoundingBoxLT(v *pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldLT(FieldBoundingBox, v))
}

// BoundingBoxLTE applies the LTE predicate on the "bounding_box" field.
func BoundingBoxLTE(v *pgtype.Box) predicate.EventMap {
	return predicate.EventMap(sql.FieldLTE(FieldBoundingBox, v))
}

// BoundingBoxIsNil applies the IsNil predicate on the "bounding_box" field.
func BoundingBoxIsNil() predicate.EventMap {
	return predicate.EventMap(sql.FieldIsNull(FieldBoundingBox))
}

// BoundingBoxNotNil applies the NotNil predicate on the "bounding_box" field.
func BoundingBoxNotNil() predicate.EventMap {
	return predicate.EventMap(sql.FieldNotNull(FieldBoundingBox))
}

// HasEvents applies the HasEdge predicate on the "events" edge.
func HasEvents() predicate.EventMap {
	return predicate.EventMap(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, EventsTable, EventsColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasEventsWith applies the HasEdge predicate on the "events" edge with a given conditions (other predicates).
func HasEventsWith(preds ...predicate.Event) predicate.EventMap {
	return predicate.EventMap(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(EventsInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, EventsTable, EventsColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.EventMap) predicate.EventMap {
	return predicate.EventMap(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.EventMap) predicate.EventMap {
	return predicate.EventMap(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.EventMap) predicate.EventMap {
	return predicate.EventMap(func(s *sql.Selector) {
		p(s.Not())
	})
}
