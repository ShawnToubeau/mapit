// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"mapit/server/ent/event"
	"mapit/server/ent/predicate"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgtype"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

const (
	// Operation types.
	OpCreate    = ent.OpCreate
	OpDelete    = ent.OpDelete
	OpDeleteOne = ent.OpDeleteOne
	OpUpdate    = ent.OpUpdate
	OpUpdateOne = ent.OpUpdateOne

	// Node types.
	TypeEvent = "Event"
)

// EventMutation represents an operation that mutates the Event nodes in the graph.
type EventMutation struct {
	config
	op            Op
	typ           string
	id            *uuid.UUID
	name          *string
	start_time    *time.Time
	end_time      *time.Time
	point         **pgtype.Point
	description   *string
	clearedFields map[string]struct{}
	done          bool
	oldValue      func(context.Context) (*Event, error)
	predicates    []predicate.Event
}

var _ ent.Mutation = (*EventMutation)(nil)

// eventOption allows management of the mutation configuration using functional options.
type eventOption func(*EventMutation)

// newEventMutation creates new mutation for the Event entity.
func newEventMutation(c config, op Op, opts ...eventOption) *EventMutation {
	m := &EventMutation{
		config:        c,
		op:            op,
		typ:           TypeEvent,
		clearedFields: make(map[string]struct{}),
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

// withEventID sets the ID field of the mutation.
func withEventID(id uuid.UUID) eventOption {
	return func(m *EventMutation) {
		var (
			err   error
			once  sync.Once
			value *Event
		)
		m.oldValue = func(ctx context.Context) (*Event, error) {
			once.Do(func() {
				if m.done {
					err = errors.New("querying old values post mutation is not allowed")
				} else {
					value, err = m.Client().Event.Get(ctx, id)
				}
			})
			return value, err
		}
		m.id = &id
	}
}

// withEvent sets the old Event of the mutation.
func withEvent(node *Event) eventOption {
	return func(m *EventMutation) {
		m.oldValue = func(context.Context) (*Event, error) {
			return node, nil
		}
		m.id = &node.ID
	}
}

// Client returns a new `ent.Client` from the mutation. If the mutation was
// executed in a transaction (ent.Tx), a transactional client is returned.
func (m EventMutation) Client() *Client {
	client := &Client{config: m.config}
	client.init()
	return client
}

// Tx returns an `ent.Tx` for mutations that were executed in transactions;
// it returns an error otherwise.
func (m EventMutation) Tx() (*Tx, error) {
	if _, ok := m.driver.(*txDriver); !ok {
		return nil, errors.New("ent: mutation is not running in a transaction")
	}
	tx := &Tx{config: m.config}
	tx.init()
	return tx, nil
}

// SetID sets the value of the id field. Note that this
// operation is only accepted on creation of Event entities.
func (m *EventMutation) SetID(id uuid.UUID) {
	m.id = &id
}

// ID returns the ID value in the mutation. Note that the ID is only available
// if it was provided to the builder or after it was returned from the database.
func (m *EventMutation) ID() (id uuid.UUID, exists bool) {
	if m.id == nil {
		return
	}
	return *m.id, true
}

// IDs queries the database and returns the entity ids that match the mutation's predicate.
// That means, if the mutation is applied within a transaction with an isolation level such
// as sql.LevelSerializable, the returned ids match the ids of the rows that will be updated
// or updated by the mutation.
func (m *EventMutation) IDs(ctx context.Context) ([]uuid.UUID, error) {
	switch {
	case m.op.Is(OpUpdateOne | OpDeleteOne):
		id, exists := m.ID()
		if exists {
			return []uuid.UUID{id}, nil
		}
		fallthrough
	case m.op.Is(OpUpdate | OpDelete):
		return m.Client().Event.Query().Where(m.predicates...).IDs(ctx)
	default:
		return nil, fmt.Errorf("IDs is not allowed on %s operations", m.op)
	}
}

// SetName sets the "name" field.
func (m *EventMutation) SetName(s string) {
	m.name = &s
}

// Name returns the value of the "name" field in the mutation.
func (m *EventMutation) Name() (r string, exists bool) {
	v := m.name
	if v == nil {
		return
	}
	return *v, true
}

// OldName returns the old "name" field's value of the Event entity.
// If the Event object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *EventMutation) OldName(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldName is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldName requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldName: %w", err)
	}
	return oldValue.Name, nil
}

// ResetName resets all changes to the "name" field.
func (m *EventMutation) ResetName() {
	m.name = nil
}

// SetStartTime sets the "start_time" field.
func (m *EventMutation) SetStartTime(t time.Time) {
	m.start_time = &t
}

// StartTime returns the value of the "start_time" field in the mutation.
func (m *EventMutation) StartTime() (r time.Time, exists bool) {
	v := m.start_time
	if v == nil {
		return
	}
	return *v, true
}

// OldStartTime returns the old "start_time" field's value of the Event entity.
// If the Event object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *EventMutation) OldStartTime(ctx context.Context) (v time.Time, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldStartTime is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldStartTime requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldStartTime: %w", err)
	}
	return oldValue.StartTime, nil
}

// ResetStartTime resets all changes to the "start_time" field.
func (m *EventMutation) ResetStartTime() {
	m.start_time = nil
}

// SetEndTime sets the "end_time" field.
func (m *EventMutation) SetEndTime(t time.Time) {
	m.end_time = &t
}

// EndTime returns the value of the "end_time" field in the mutation.
func (m *EventMutation) EndTime() (r time.Time, exists bool) {
	v := m.end_time
	if v == nil {
		return
	}
	return *v, true
}

// OldEndTime returns the old "end_time" field's value of the Event entity.
// If the Event object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *EventMutation) OldEndTime(ctx context.Context) (v time.Time, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldEndTime is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldEndTime requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldEndTime: %w", err)
	}
	return oldValue.EndTime, nil
}

// ResetEndTime resets all changes to the "end_time" field.
func (m *EventMutation) ResetEndTime() {
	m.end_time = nil
}

// SetPoint sets the "point" field.
func (m *EventMutation) SetPoint(pg *pgtype.Point) {
	m.point = &pg
}

// Point returns the value of the "point" field in the mutation.
func (m *EventMutation) Point() (r *pgtype.Point, exists bool) {
	v := m.point
	if v == nil {
		return
	}
	return *v, true
}

// OldPoint returns the old "point" field's value of the Event entity.
// If the Event object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *EventMutation) OldPoint(ctx context.Context) (v *pgtype.Point, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldPoint is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldPoint requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldPoint: %w", err)
	}
	return oldValue.Point, nil
}

// ResetPoint resets all changes to the "point" field.
func (m *EventMutation) ResetPoint() {
	m.point = nil
}

// SetDescription sets the "description" field.
func (m *EventMutation) SetDescription(s string) {
	m.description = &s
}

// Description returns the value of the "description" field in the mutation.
func (m *EventMutation) Description() (r string, exists bool) {
	v := m.description
	if v == nil {
		return
	}
	return *v, true
}

// OldDescription returns the old "description" field's value of the Event entity.
// If the Event object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *EventMutation) OldDescription(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, errors.New("OldDescription is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, errors.New("OldDescription requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldDescription: %w", err)
	}
	return oldValue.Description, nil
}

// ResetDescription resets all changes to the "description" field.
func (m *EventMutation) ResetDescription() {
	m.description = nil
}

// Where appends a list predicates to the EventMutation builder.
func (m *EventMutation) Where(ps ...predicate.Event) {
	m.predicates = append(m.predicates, ps...)
}

// WhereP appends storage-level predicates to the EventMutation builder. Using this method,
// users can use type-assertion to append predicates that do not depend on any generated package.
func (m *EventMutation) WhereP(ps ...func(*sql.Selector)) {
	p := make([]predicate.Event, len(ps))
	for i := range ps {
		p[i] = ps[i]
	}
	m.Where(p...)
}

// Op returns the operation name.
func (m *EventMutation) Op() Op {
	return m.op
}

// SetOp allows setting the mutation operation.
func (m *EventMutation) SetOp(op Op) {
	m.op = op
}

// Type returns the node type of this mutation (Event).
func (m *EventMutation) Type() string {
	return m.typ
}

// Fields returns all fields that were changed during this mutation. Note that in
// order to get all numeric fields that were incremented/decremented, call
// AddedFields().
func (m *EventMutation) Fields() []string {
	fields := make([]string, 0, 5)
	if m.name != nil {
		fields = append(fields, event.FieldName)
	}
	if m.start_time != nil {
		fields = append(fields, event.FieldStartTime)
	}
	if m.end_time != nil {
		fields = append(fields, event.FieldEndTime)
	}
	if m.point != nil {
		fields = append(fields, event.FieldPoint)
	}
	if m.description != nil {
		fields = append(fields, event.FieldDescription)
	}
	return fields
}

// Field returns the value of a field with the given name. The second boolean
// return value indicates that this field was not set, or was not defined in the
// schema.
func (m *EventMutation) Field(name string) (ent.Value, bool) {
	switch name {
	case event.FieldName:
		return m.Name()
	case event.FieldStartTime:
		return m.StartTime()
	case event.FieldEndTime:
		return m.EndTime()
	case event.FieldPoint:
		return m.Point()
	case event.FieldDescription:
		return m.Description()
	}
	return nil, false
}

// OldField returns the old value of the field from the database. An error is
// returned if the mutation operation is not UpdateOne, or the query to the
// database failed.
func (m *EventMutation) OldField(ctx context.Context, name string) (ent.Value, error) {
	switch name {
	case event.FieldName:
		return m.OldName(ctx)
	case event.FieldStartTime:
		return m.OldStartTime(ctx)
	case event.FieldEndTime:
		return m.OldEndTime(ctx)
	case event.FieldPoint:
		return m.OldPoint(ctx)
	case event.FieldDescription:
		return m.OldDescription(ctx)
	}
	return nil, fmt.Errorf("unknown Event field %s", name)
}

// SetField sets the value of a field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *EventMutation) SetField(name string, value ent.Value) error {
	switch name {
	case event.FieldName:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetName(v)
		return nil
	case event.FieldStartTime:
		v, ok := value.(time.Time)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetStartTime(v)
		return nil
	case event.FieldEndTime:
		v, ok := value.(time.Time)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetEndTime(v)
		return nil
	case event.FieldPoint:
		v, ok := value.(*pgtype.Point)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetPoint(v)
		return nil
	case event.FieldDescription:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetDescription(v)
		return nil
	}
	return fmt.Errorf("unknown Event field %s", name)
}

// AddedFields returns all numeric fields that were incremented/decremented during
// this mutation.
func (m *EventMutation) AddedFields() []string {
	return nil
}

// AddedField returns the numeric value that was incremented/decremented on a field
// with the given name. The second boolean return value indicates that this field
// was not set, or was not defined in the schema.
func (m *EventMutation) AddedField(name string) (ent.Value, bool) {
	return nil, false
}

// AddField adds the value to the field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *EventMutation) AddField(name string, value ent.Value) error {
	switch name {
	}
	return fmt.Errorf("unknown Event numeric field %s", name)
}

// ClearedFields returns all nullable fields that were cleared during this
// mutation.
func (m *EventMutation) ClearedFields() []string {
	return nil
}

// FieldCleared returns a boolean indicating if a field with the given name was
// cleared in this mutation.
func (m *EventMutation) FieldCleared(name string) bool {
	_, ok := m.clearedFields[name]
	return ok
}

// ClearField clears the value of the field with the given name. It returns an
// error if the field is not defined in the schema.
func (m *EventMutation) ClearField(name string) error {
	return fmt.Errorf("unknown Event nullable field %s", name)
}

// ResetField resets all changes in the mutation for the field with the given name.
// It returns an error if the field is not defined in the schema.
func (m *EventMutation) ResetField(name string) error {
	switch name {
	case event.FieldName:
		m.ResetName()
		return nil
	case event.FieldStartTime:
		m.ResetStartTime()
		return nil
	case event.FieldEndTime:
		m.ResetEndTime()
		return nil
	case event.FieldPoint:
		m.ResetPoint()
		return nil
	case event.FieldDescription:
		m.ResetDescription()
		return nil
	}
	return fmt.Errorf("unknown Event field %s", name)
}

// AddedEdges returns all edge names that were set/added in this mutation.
func (m *EventMutation) AddedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// AddedIDs returns all IDs (to other nodes) that were added for the given edge
// name in this mutation.
func (m *EventMutation) AddedIDs(name string) []ent.Value {
	return nil
}

// RemovedEdges returns all edge names that were removed in this mutation.
func (m *EventMutation) RemovedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// RemovedIDs returns all IDs (to other nodes) that were removed for the edge with
// the given name in this mutation.
func (m *EventMutation) RemovedIDs(name string) []ent.Value {
	return nil
}

// ClearedEdges returns all edge names that were cleared in this mutation.
func (m *EventMutation) ClearedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// EdgeCleared returns a boolean which indicates if the edge with the given name
// was cleared in this mutation.
func (m *EventMutation) EdgeCleared(name string) bool {
	return false
}

// ClearEdge clears the value of the edge with the given name. It returns an error
// if that edge is not defined in the schema.
func (m *EventMutation) ClearEdge(name string) error {
	return fmt.Errorf("unknown Event unique edge %s", name)
}

// ResetEdge resets all changes to the edge with the given name in this mutation.
// It returns an error if the edge is not defined in the schema.
func (m *EventMutation) ResetEdge(name string) error {
	return fmt.Errorf("unknown Event edge %s", name)
}