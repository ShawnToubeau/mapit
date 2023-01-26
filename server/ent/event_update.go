// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"server/ent/event"
	"server/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/jackc/pgtype"
)

// EventUpdate is the builder for updating Event entities.
type EventUpdate struct {
	config
	hooks    []Hook
	mutation *EventMutation
}

// Where appends a list predicates to the EventUpdate builder.
func (eu *EventUpdate) Where(ps ...predicate.Event) *EventUpdate {
	eu.mutation.Where(ps...)
	return eu
}

// SetName sets the "name" field.
func (eu *EventUpdate) SetName(s string) *EventUpdate {
	eu.mutation.SetName(s)
	return eu
}

// SetStartTime sets the "start_time" field.
func (eu *EventUpdate) SetStartTime(t time.Time) *EventUpdate {
	eu.mutation.SetStartTime(t)
	return eu
}

// SetEndTime sets the "end_time" field.
func (eu *EventUpdate) SetEndTime(t time.Time) *EventUpdate {
	eu.mutation.SetEndTime(t)
	return eu
}

// SetPoint sets the "point" field.
func (eu *EventUpdate) SetPoint(pg *pgtype.Point) *EventUpdate {
	eu.mutation.SetPoint(pg)
	return eu
}

// SetDescription sets the "description" field.
func (eu *EventUpdate) SetDescription(s string) *EventUpdate {
	eu.mutation.SetDescription(s)
	return eu
}

// Mutation returns the EventMutation object of the builder.
func (eu *EventUpdate) Mutation() *EventMutation {
	return eu.mutation
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (eu *EventUpdate) Save(ctx context.Context) (int, error) {
	return withHooks[int, EventMutation](ctx, eu.sqlSave, eu.mutation, eu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (eu *EventUpdate) SaveX(ctx context.Context) int {
	affected, err := eu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (eu *EventUpdate) Exec(ctx context.Context) error {
	_, err := eu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (eu *EventUpdate) ExecX(ctx context.Context) {
	if err := eu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (eu *EventUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   event.Table,
			Columns: event.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeUUID,
				Column: event.FieldID,
			},
		},
	}
	if ps := eu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := eu.mutation.Name(); ok {
		_spec.SetField(event.FieldName, field.TypeString, value)
	}
	if value, ok := eu.mutation.StartTime(); ok {
		_spec.SetField(event.FieldStartTime, field.TypeTime, value)
	}
	if value, ok := eu.mutation.EndTime(); ok {
		_spec.SetField(event.FieldEndTime, field.TypeTime, value)
	}
	if value, ok := eu.mutation.Point(); ok {
		_spec.SetField(event.FieldPoint, field.TypeOther, value)
	}
	if value, ok := eu.mutation.Description(); ok {
		_spec.SetField(event.FieldDescription, field.TypeString, value)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, eu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{event.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	eu.mutation.done = true
	return n, nil
}

// EventUpdateOne is the builder for updating a single Event entity.
type EventUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *EventMutation
}

// SetName sets the "name" field.
func (euo *EventUpdateOne) SetName(s string) *EventUpdateOne {
	euo.mutation.SetName(s)
	return euo
}

// SetStartTime sets the "start_time" field.
func (euo *EventUpdateOne) SetStartTime(t time.Time) *EventUpdateOne {
	euo.mutation.SetStartTime(t)
	return euo
}

// SetEndTime sets the "end_time" field.
func (euo *EventUpdateOne) SetEndTime(t time.Time) *EventUpdateOne {
	euo.mutation.SetEndTime(t)
	return euo
}

// SetPoint sets the "point" field.
func (euo *EventUpdateOne) SetPoint(pg *pgtype.Point) *EventUpdateOne {
	euo.mutation.SetPoint(pg)
	return euo
}

// SetDescription sets the "description" field.
func (euo *EventUpdateOne) SetDescription(s string) *EventUpdateOne {
	euo.mutation.SetDescription(s)
	return euo
}

// Mutation returns the EventMutation object of the builder.
func (euo *EventUpdateOne) Mutation() *EventMutation {
	return euo.mutation
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (euo *EventUpdateOne) Select(field string, fields ...string) *EventUpdateOne {
	euo.fields = append([]string{field}, fields...)
	return euo
}

// Save executes the query and returns the updated Event entity.
func (euo *EventUpdateOne) Save(ctx context.Context) (*Event, error) {
	return withHooks[*Event, EventMutation](ctx, euo.sqlSave, euo.mutation, euo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (euo *EventUpdateOne) SaveX(ctx context.Context) *Event {
	node, err := euo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (euo *EventUpdateOne) Exec(ctx context.Context) error {
	_, err := euo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (euo *EventUpdateOne) ExecX(ctx context.Context) {
	if err := euo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (euo *EventUpdateOne) sqlSave(ctx context.Context) (_node *Event, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   event.Table,
			Columns: event.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeUUID,
				Column: event.FieldID,
			},
		},
	}
	id, ok := euo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Event.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := euo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, event.FieldID)
		for _, f := range fields {
			if !event.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != event.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := euo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := euo.mutation.Name(); ok {
		_spec.SetField(event.FieldName, field.TypeString, value)
	}
	if value, ok := euo.mutation.StartTime(); ok {
		_spec.SetField(event.FieldStartTime, field.TypeTime, value)
	}
	if value, ok := euo.mutation.EndTime(); ok {
		_spec.SetField(event.FieldEndTime, field.TypeTime, value)
	}
	if value, ok := euo.mutation.Point(); ok {
		_spec.SetField(event.FieldPoint, field.TypeOther, value)
	}
	if value, ok := euo.mutation.Description(); ok {
		_spec.SetField(event.FieldDescription, field.TypeString, value)
	}
	_node = &Event{config: euo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, euo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{event.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	euo.mutation.done = true
	return _node, nil
}
