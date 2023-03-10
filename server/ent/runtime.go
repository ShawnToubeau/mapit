// Code generated by ent, DO NOT EDIT.

package ent

import (
	"server/ent/event"
	"server/ent/eventmap"
	"server/ent/schema"

	"github.com/google/uuid"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	eventFields := schema.Event{}.Fields()
	_ = eventFields
	// eventDescID is the schema descriptor for id field.
	eventDescID := eventFields[0].Descriptor()
	// event.DefaultID holds the default value on creation for the id field.
	event.DefaultID = eventDescID.Default.(func() uuid.UUID)
	eventmapFields := schema.EventMap{}.Fields()
	_ = eventmapFields
	// eventmapDescID is the schema descriptor for id field.
	eventmapDescID := eventmapFields[0].Descriptor()
	// eventmap.DefaultID holds the default value on creation for the id field.
	eventmap.DefaultID = eventmapDescID.Default.(func() uuid.UUID)
}
