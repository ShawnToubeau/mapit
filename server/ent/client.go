// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"log"

	"server/ent/migrate"

	"server/ent/event"
	"server/ent/eventmap"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

// Client is the client that holds all ent builders.
type Client struct {
	config
	// Schema is the client for creating, migrating and dropping schema.
	Schema *migrate.Schema
	// Event is the client for interacting with the Event builders.
	Event *EventClient
	// EventMap is the client for interacting with the EventMap builders.
	EventMap *EventMapClient
}

// NewClient creates a new client configured with the given options.
func NewClient(opts ...Option) *Client {
	cfg := config{log: log.Println, hooks: &hooks{}, inters: &inters{}}
	cfg.options(opts...)
	client := &Client{config: cfg}
	client.init()
	return client
}

func (c *Client) init() {
	c.Schema = migrate.NewSchema(c.driver)
	c.Event = NewEventClient(c.config)
	c.EventMap = NewEventMapClient(c.config)
}

// Open opens a database/sql.DB specified by the driver name and
// the data source name, and returns a new client attached to it.
// Optional parameters can be added for configuring the client.
func Open(driverName, dataSourceName string, options ...Option) (*Client, error) {
	switch driverName {
	case dialect.MySQL, dialect.Postgres, dialect.SQLite:
		drv, err := sql.Open(driverName, dataSourceName)
		if err != nil {
			return nil, err
		}
		return NewClient(append(options, Driver(drv))...), nil
	default:
		return nil, fmt.Errorf("unsupported driver: %q", driverName)
	}
}

// Tx returns a new transactional client. The provided context
// is used until the transaction is committed or rolled back.
func (c *Client) Tx(ctx context.Context) (*Tx, error) {
	if _, ok := c.driver.(*txDriver); ok {
		return nil, errors.New("ent: cannot start a transaction within a transaction")
	}
	tx, err := newTx(ctx, c.driver)
	if err != nil {
		return nil, fmt.Errorf("ent: starting a transaction: %w", err)
	}
	cfg := c.config
	cfg.driver = tx
	return &Tx{
		ctx:      ctx,
		config:   cfg,
		Event:    NewEventClient(cfg),
		EventMap: NewEventMapClient(cfg),
	}, nil
}

// BeginTx returns a transactional client with specified options.
func (c *Client) BeginTx(ctx context.Context, opts *sql.TxOptions) (*Tx, error) {
	if _, ok := c.driver.(*txDriver); ok {
		return nil, errors.New("ent: cannot start a transaction within a transaction")
	}
	tx, err := c.driver.(interface {
		BeginTx(context.Context, *sql.TxOptions) (dialect.Tx, error)
	}).BeginTx(ctx, opts)
	if err != nil {
		return nil, fmt.Errorf("ent: starting a transaction: %w", err)
	}
	cfg := c.config
	cfg.driver = &txDriver{tx: tx, drv: c.driver}
	return &Tx{
		ctx:      ctx,
		config:   cfg,
		Event:    NewEventClient(cfg),
		EventMap: NewEventMapClient(cfg),
	}, nil
}

// Debug returns a new debug-client. It's used to get verbose logging on specific operations.
//
//	client.Debug().
//		Event.
//		Query().
//		Count(ctx)
func (c *Client) Debug() *Client {
	if c.debug {
		return c
	}
	cfg := c.config
	cfg.driver = dialect.Debug(c.driver, c.log)
	client := &Client{config: cfg}
	client.init()
	return client
}

// Close closes the database connection and prevents new queries from starting.
func (c *Client) Close() error {
	return c.driver.Close()
}

// Use adds the mutation hooks to all the entity clients.
// In order to add hooks to a specific client, call: `client.Node.Use(...)`.
func (c *Client) Use(hooks ...Hook) {
	c.Event.Use(hooks...)
	c.EventMap.Use(hooks...)
}

// Intercept adds the query interceptors to all the entity clients.
// In order to add interceptors to a specific client, call: `client.Node.Intercept(...)`.
func (c *Client) Intercept(interceptors ...Interceptor) {
	c.Event.Intercept(interceptors...)
	c.EventMap.Intercept(interceptors...)
}

// Mutate implements the ent.Mutator interface.
func (c *Client) Mutate(ctx context.Context, m Mutation) (Value, error) {
	switch m := m.(type) {
	case *EventMutation:
		return c.Event.mutate(ctx, m)
	case *EventMapMutation:
		return c.EventMap.mutate(ctx, m)
	default:
		return nil, fmt.Errorf("ent: unknown mutation type %T", m)
	}
}

// EventClient is a client for the Event schema.
type EventClient struct {
	config
}

// NewEventClient returns a client for the Event from the given config.
func NewEventClient(c config) *EventClient {
	return &EventClient{config: c}
}

// Use adds a list of mutation hooks to the hooks stack.
// A call to `Use(f, g, h)` equals to `event.Hooks(f(g(h())))`.
func (c *EventClient) Use(hooks ...Hook) {
	c.hooks.Event = append(c.hooks.Event, hooks...)
}

// Use adds a list of query interceptors to the interceptors stack.
// A call to `Intercept(f, g, h)` equals to `event.Intercept(f(g(h())))`.
func (c *EventClient) Intercept(interceptors ...Interceptor) {
	c.inters.Event = append(c.inters.Event, interceptors...)
}

// Create returns a builder for creating a Event entity.
func (c *EventClient) Create() *EventCreate {
	mutation := newEventMutation(c.config, OpCreate)
	return &EventCreate{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// CreateBulk returns a builder for creating a bulk of Event entities.
func (c *EventClient) CreateBulk(builders ...*EventCreate) *EventCreateBulk {
	return &EventCreateBulk{config: c.config, builders: builders}
}

// Update returns an update builder for Event.
func (c *EventClient) Update() *EventUpdate {
	mutation := newEventMutation(c.config, OpUpdate)
	return &EventUpdate{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// UpdateOne returns an update builder for the given entity.
func (c *EventClient) UpdateOne(e *Event) *EventUpdateOne {
	mutation := newEventMutation(c.config, OpUpdateOne, withEvent(e))
	return &EventUpdateOne{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// UpdateOneID returns an update builder for the given id.
func (c *EventClient) UpdateOneID(id uuid.UUID) *EventUpdateOne {
	mutation := newEventMutation(c.config, OpUpdateOne, withEventID(id))
	return &EventUpdateOne{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// Delete returns a delete builder for Event.
func (c *EventClient) Delete() *EventDelete {
	mutation := newEventMutation(c.config, OpDelete)
	return &EventDelete{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// DeleteOne returns a builder for deleting the given entity.
func (c *EventClient) DeleteOne(e *Event) *EventDeleteOne {
	return c.DeleteOneID(e.ID)
}

// DeleteOneID returns a builder for deleting the given entity by its id.
func (c *EventClient) DeleteOneID(id uuid.UUID) *EventDeleteOne {
	builder := c.Delete().Where(event.ID(id))
	builder.mutation.id = &id
	builder.mutation.op = OpDeleteOne
	return &EventDeleteOne{builder}
}

// Query returns a query builder for Event.
func (c *EventClient) Query() *EventQuery {
	return &EventQuery{
		config: c.config,
		inters: c.Interceptors(),
	}
}

// Get returns a Event entity by its id.
func (c *EventClient) Get(ctx context.Context, id uuid.UUID) (*Event, error) {
	return c.Query().Where(event.ID(id)).Only(ctx)
}

// GetX is like Get, but panics if an error occurs.
func (c *EventClient) GetX(ctx context.Context, id uuid.UUID) *Event {
	obj, err := c.Get(ctx, id)
	if err != nil {
		panic(err)
	}
	return obj
}

// QueryParentMap queries the parent_map edge of a Event.
func (c *EventClient) QueryParentMap(e *Event) *EventMapQuery {
	query := (&EventMapClient{config: c.config}).Query()
	query.path = func(context.Context) (fromV *sql.Selector, _ error) {
		id := e.ID
		step := sqlgraph.NewStep(
			sqlgraph.From(event.Table, event.FieldID, id),
			sqlgraph.To(eventmap.Table, eventmap.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, event.ParentMapTable, event.ParentMapColumn),
		)
		fromV = sqlgraph.Neighbors(e.driver.Dialect(), step)
		return fromV, nil
	}
	return query
}

// Hooks returns the client hooks.
func (c *EventClient) Hooks() []Hook {
	return c.hooks.Event
}

// Interceptors returns the client interceptors.
func (c *EventClient) Interceptors() []Interceptor {
	return c.inters.Event
}

func (c *EventClient) mutate(ctx context.Context, m *EventMutation) (Value, error) {
	switch m.Op() {
	case OpCreate:
		return (&EventCreate{config: c.config, hooks: c.Hooks(), mutation: m}).Save(ctx)
	case OpUpdate:
		return (&EventUpdate{config: c.config, hooks: c.Hooks(), mutation: m}).Save(ctx)
	case OpUpdateOne:
		return (&EventUpdateOne{config: c.config, hooks: c.Hooks(), mutation: m}).Save(ctx)
	case OpDelete, OpDeleteOne:
		return (&EventDelete{config: c.config, hooks: c.Hooks(), mutation: m}).Exec(ctx)
	default:
		return nil, fmt.Errorf("ent: unknown Event mutation op: %q", m.Op())
	}
}

// EventMapClient is a client for the EventMap schema.
type EventMapClient struct {
	config
}

// NewEventMapClient returns a client for the EventMap from the given config.
func NewEventMapClient(c config) *EventMapClient {
	return &EventMapClient{config: c}
}

// Use adds a list of mutation hooks to the hooks stack.
// A call to `Use(f, g, h)` equals to `eventmap.Hooks(f(g(h())))`.
func (c *EventMapClient) Use(hooks ...Hook) {
	c.hooks.EventMap = append(c.hooks.EventMap, hooks...)
}

// Use adds a list of query interceptors to the interceptors stack.
// A call to `Intercept(f, g, h)` equals to `eventmap.Intercept(f(g(h())))`.
func (c *EventMapClient) Intercept(interceptors ...Interceptor) {
	c.inters.EventMap = append(c.inters.EventMap, interceptors...)
}

// Create returns a builder for creating a EventMap entity.
func (c *EventMapClient) Create() *EventMapCreate {
	mutation := newEventMapMutation(c.config, OpCreate)
	return &EventMapCreate{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// CreateBulk returns a builder for creating a bulk of EventMap entities.
func (c *EventMapClient) CreateBulk(builders ...*EventMapCreate) *EventMapCreateBulk {
	return &EventMapCreateBulk{config: c.config, builders: builders}
}

// Update returns an update builder for EventMap.
func (c *EventMapClient) Update() *EventMapUpdate {
	mutation := newEventMapMutation(c.config, OpUpdate)
	return &EventMapUpdate{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// UpdateOne returns an update builder for the given entity.
func (c *EventMapClient) UpdateOne(em *EventMap) *EventMapUpdateOne {
	mutation := newEventMapMutation(c.config, OpUpdateOne, withEventMap(em))
	return &EventMapUpdateOne{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// UpdateOneID returns an update builder for the given id.
func (c *EventMapClient) UpdateOneID(id uuid.UUID) *EventMapUpdateOne {
	mutation := newEventMapMutation(c.config, OpUpdateOne, withEventMapID(id))
	return &EventMapUpdateOne{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// Delete returns a delete builder for EventMap.
func (c *EventMapClient) Delete() *EventMapDelete {
	mutation := newEventMapMutation(c.config, OpDelete)
	return &EventMapDelete{config: c.config, hooks: c.Hooks(), mutation: mutation}
}

// DeleteOne returns a builder for deleting the given entity.
func (c *EventMapClient) DeleteOne(em *EventMap) *EventMapDeleteOne {
	return c.DeleteOneID(em.ID)
}

// DeleteOneID returns a builder for deleting the given entity by its id.
func (c *EventMapClient) DeleteOneID(id uuid.UUID) *EventMapDeleteOne {
	builder := c.Delete().Where(eventmap.ID(id))
	builder.mutation.id = &id
	builder.mutation.op = OpDeleteOne
	return &EventMapDeleteOne{builder}
}

// Query returns a query builder for EventMap.
func (c *EventMapClient) Query() *EventMapQuery {
	return &EventMapQuery{
		config: c.config,
		inters: c.Interceptors(),
	}
}

// Get returns a EventMap entity by its id.
func (c *EventMapClient) Get(ctx context.Context, id uuid.UUID) (*EventMap, error) {
	return c.Query().Where(eventmap.ID(id)).Only(ctx)
}

// GetX is like Get, but panics if an error occurs.
func (c *EventMapClient) GetX(ctx context.Context, id uuid.UUID) *EventMap {
	obj, err := c.Get(ctx, id)
	if err != nil {
		panic(err)
	}
	return obj
}

// QueryEvents queries the events edge of a EventMap.
func (c *EventMapClient) QueryEvents(em *EventMap) *EventQuery {
	query := (&EventClient{config: c.config}).Query()
	query.path = func(context.Context) (fromV *sql.Selector, _ error) {
		id := em.ID
		step := sqlgraph.NewStep(
			sqlgraph.From(eventmap.Table, eventmap.FieldID, id),
			sqlgraph.To(event.Table, event.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, eventmap.EventsTable, eventmap.EventsColumn),
		)
		fromV = sqlgraph.Neighbors(em.driver.Dialect(), step)
		return fromV, nil
	}
	return query
}

// Hooks returns the client hooks.
func (c *EventMapClient) Hooks() []Hook {
	return c.hooks.EventMap
}

// Interceptors returns the client interceptors.
func (c *EventMapClient) Interceptors() []Interceptor {
	return c.inters.EventMap
}

func (c *EventMapClient) mutate(ctx context.Context, m *EventMapMutation) (Value, error) {
	switch m.Op() {
	case OpCreate:
		return (&EventMapCreate{config: c.config, hooks: c.Hooks(), mutation: m}).Save(ctx)
	case OpUpdate:
		return (&EventMapUpdate{config: c.config, hooks: c.Hooks(), mutation: m}).Save(ctx)
	case OpUpdateOne:
		return (&EventMapUpdateOne{config: c.config, hooks: c.Hooks(), mutation: m}).Save(ctx)
	case OpDelete, OpDeleteOne:
		return (&EventMapDelete{config: c.config, hooks: c.Hooks(), mutation: m}).Exec(ctx)
	default:
		return nil, fmt.Errorf("ent: unknown EventMap mutation op: %q", m.Op())
	}
}
