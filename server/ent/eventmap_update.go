// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"server/ent/event"
	"server/ent/eventmap"
	"server/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
	"github.com/jackc/pgtype"
)

// EventMapUpdate is the builder for updating EventMap entities.
type EventMapUpdate struct {
	config
	hooks    []Hook
	mutation *EventMapMutation
}

// Where appends a list predicates to the EventMapUpdate builder.
func (emu *EventMapUpdate) Where(ps ...predicate.EventMap) *EventMapUpdate {
	emu.mutation.Where(ps...)
	return emu
}

// SetOwnerID sets the "owner_id" field.
func (emu *EventMapUpdate) SetOwnerID(u uuid.UUID) *EventMapUpdate {
	emu.mutation.SetOwnerID(u)
	return emu
}

// SetName sets the "name" field.
func (emu *EventMapUpdate) SetName(s string) *EventMapUpdate {
	emu.mutation.SetName(s)
	return emu
}

// SetBoundingBox sets the "bounding_box" field.
func (emu *EventMapUpdate) SetBoundingBox(pg *pgtype.Box) *EventMapUpdate {
	emu.mutation.SetBoundingBox(pg)
	return emu
}

// ClearBoundingBox clears the value of the "bounding_box" field.
func (emu *EventMapUpdate) ClearBoundingBox() *EventMapUpdate {
	emu.mutation.ClearBoundingBox()
	return emu
}

// AddEventIDs adds the "events" edge to the Event entity by IDs.
func (emu *EventMapUpdate) AddEventIDs(ids ...uuid.UUID) *EventMapUpdate {
	emu.mutation.AddEventIDs(ids...)
	return emu
}

// AddEvents adds the "events" edges to the Event entity.
func (emu *EventMapUpdate) AddEvents(e ...*Event) *EventMapUpdate {
	ids := make([]uuid.UUID, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return emu.AddEventIDs(ids...)
}

// Mutation returns the EventMapMutation object of the builder.
func (emu *EventMapUpdate) Mutation() *EventMapMutation {
	return emu.mutation
}

// ClearEvents clears all "events" edges to the Event entity.
func (emu *EventMapUpdate) ClearEvents() *EventMapUpdate {
	emu.mutation.ClearEvents()
	return emu
}

// RemoveEventIDs removes the "events" edge to Event entities by IDs.
func (emu *EventMapUpdate) RemoveEventIDs(ids ...uuid.UUID) *EventMapUpdate {
	emu.mutation.RemoveEventIDs(ids...)
	return emu
}

// RemoveEvents removes "events" edges to Event entities.
func (emu *EventMapUpdate) RemoveEvents(e ...*Event) *EventMapUpdate {
	ids := make([]uuid.UUID, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return emu.RemoveEventIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (emu *EventMapUpdate) Save(ctx context.Context) (int, error) {
	return withHooks[int, EventMapMutation](ctx, emu.sqlSave, emu.mutation, emu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (emu *EventMapUpdate) SaveX(ctx context.Context) int {
	affected, err := emu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (emu *EventMapUpdate) Exec(ctx context.Context) error {
	_, err := emu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (emu *EventMapUpdate) ExecX(ctx context.Context) {
	if err := emu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (emu *EventMapUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   eventmap.Table,
			Columns: eventmap.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeUUID,
				Column: eventmap.FieldID,
			},
		},
	}
	if ps := emu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := emu.mutation.OwnerID(); ok {
		_spec.SetField(eventmap.FieldOwnerID, field.TypeUUID, value)
	}
	if value, ok := emu.mutation.Name(); ok {
		_spec.SetField(eventmap.FieldName, field.TypeString, value)
	}
	if value, ok := emu.mutation.BoundingBox(); ok {
		_spec.SetField(eventmap.FieldBoundingBox, field.TypeOther, value)
	}
	if emu.mutation.BoundingBoxCleared() {
		_spec.ClearField(eventmap.FieldBoundingBox, field.TypeOther)
	}
	if emu.mutation.EventsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventmap.EventsTable,
			Columns: []string{eventmap.EventsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeUUID,
					Column: event.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := emu.mutation.RemovedEventsIDs(); len(nodes) > 0 && !emu.mutation.EventsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventmap.EventsTable,
			Columns: []string{eventmap.EventsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeUUID,
					Column: event.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := emu.mutation.EventsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventmap.EventsTable,
			Columns: []string{eventmap.EventsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeUUID,
					Column: event.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, emu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{eventmap.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	emu.mutation.done = true
	return n, nil
}

// EventMapUpdateOne is the builder for updating a single EventMap entity.
type EventMapUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *EventMapMutation
}

// SetOwnerID sets the "owner_id" field.
func (emuo *EventMapUpdateOne) SetOwnerID(u uuid.UUID) *EventMapUpdateOne {
	emuo.mutation.SetOwnerID(u)
	return emuo
}

// SetName sets the "name" field.
func (emuo *EventMapUpdateOne) SetName(s string) *EventMapUpdateOne {
	emuo.mutation.SetName(s)
	return emuo
}

// SetBoundingBox sets the "bounding_box" field.
func (emuo *EventMapUpdateOne) SetBoundingBox(pg *pgtype.Box) *EventMapUpdateOne {
	emuo.mutation.SetBoundingBox(pg)
	return emuo
}

// ClearBoundingBox clears the value of the "bounding_box" field.
func (emuo *EventMapUpdateOne) ClearBoundingBox() *EventMapUpdateOne {
	emuo.mutation.ClearBoundingBox()
	return emuo
}

// AddEventIDs adds the "events" edge to the Event entity by IDs.
func (emuo *EventMapUpdateOne) AddEventIDs(ids ...uuid.UUID) *EventMapUpdateOne {
	emuo.mutation.AddEventIDs(ids...)
	return emuo
}

// AddEvents adds the "events" edges to the Event entity.
func (emuo *EventMapUpdateOne) AddEvents(e ...*Event) *EventMapUpdateOne {
	ids := make([]uuid.UUID, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return emuo.AddEventIDs(ids...)
}

// Mutation returns the EventMapMutation object of the builder.
func (emuo *EventMapUpdateOne) Mutation() *EventMapMutation {
	return emuo.mutation
}

// ClearEvents clears all "events" edges to the Event entity.
func (emuo *EventMapUpdateOne) ClearEvents() *EventMapUpdateOne {
	emuo.mutation.ClearEvents()
	return emuo
}

// RemoveEventIDs removes the "events" edge to Event entities by IDs.
func (emuo *EventMapUpdateOne) RemoveEventIDs(ids ...uuid.UUID) *EventMapUpdateOne {
	emuo.mutation.RemoveEventIDs(ids...)
	return emuo
}

// RemoveEvents removes "events" edges to Event entities.
func (emuo *EventMapUpdateOne) RemoveEvents(e ...*Event) *EventMapUpdateOne {
	ids := make([]uuid.UUID, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return emuo.RemoveEventIDs(ids...)
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (emuo *EventMapUpdateOne) Select(field string, fields ...string) *EventMapUpdateOne {
	emuo.fields = append([]string{field}, fields...)
	return emuo
}

// Save executes the query and returns the updated EventMap entity.
func (emuo *EventMapUpdateOne) Save(ctx context.Context) (*EventMap, error) {
	return withHooks[*EventMap, EventMapMutation](ctx, emuo.sqlSave, emuo.mutation, emuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (emuo *EventMapUpdateOne) SaveX(ctx context.Context) *EventMap {
	node, err := emuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (emuo *EventMapUpdateOne) Exec(ctx context.Context) error {
	_, err := emuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (emuo *EventMapUpdateOne) ExecX(ctx context.Context) {
	if err := emuo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (emuo *EventMapUpdateOne) sqlSave(ctx context.Context) (_node *EventMap, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   eventmap.Table,
			Columns: eventmap.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeUUID,
				Column: eventmap.FieldID,
			},
		},
	}
	id, ok := emuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "EventMap.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := emuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, eventmap.FieldID)
		for _, f := range fields {
			if !eventmap.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != eventmap.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := emuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := emuo.mutation.OwnerID(); ok {
		_spec.SetField(eventmap.FieldOwnerID, field.TypeUUID, value)
	}
	if value, ok := emuo.mutation.Name(); ok {
		_spec.SetField(eventmap.FieldName, field.TypeString, value)
	}
	if value, ok := emuo.mutation.BoundingBox(); ok {
		_spec.SetField(eventmap.FieldBoundingBox, field.TypeOther, value)
	}
	if emuo.mutation.BoundingBoxCleared() {
		_spec.ClearField(eventmap.FieldBoundingBox, field.TypeOther)
	}
	if emuo.mutation.EventsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventmap.EventsTable,
			Columns: []string{eventmap.EventsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeUUID,
					Column: event.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := emuo.mutation.RemovedEventsIDs(); len(nodes) > 0 && !emuo.mutation.EventsCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventmap.EventsTable,
			Columns: []string{eventmap.EventsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeUUID,
					Column: event.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := emuo.mutation.EventsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   eventmap.EventsTable,
			Columns: []string{eventmap.EventsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeUUID,
					Column: event.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &EventMap{config: emuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, emuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{eventmap.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	emuo.mutation.done = true
	return _node, nil
}
