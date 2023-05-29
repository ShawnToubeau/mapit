import { useAuth } from "@clerk/nextjs";
import { type Event } from "@prisma/client";
import { api } from "@src/utils/api";
import { CenterPopup } from "@src/utils/map";
import { LatLng, type Marker as LeafletMarker } from "leaflet";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import FormatDate from "../../../../utils/format-date";
import EventForm from "../../events/EventForm";
import { EventMarker } from "../ResponsiveEventMap";

export enum EventMarkerViews {
  READ = "read",
  EDIT = "edit",
  DELETE = "delete",
}

interface EventMarkersProps {
  mapId: string;
  eventMarkers: Map<string, EventMarker>;
}

export default function EventMarkers(props: EventMarkersProps) {
  const { data, error } = api.eventRouter.getByMapId.useQuery({
    mapId: props.mapId,
  });

  if (!data || error) {
    return null;
  }

  return (
    <Fragment>
      {data.result.data.events.map((event) => (
        <EventMarker
          mapId={props.mapId}
          key={event.id}
          event={event}
          eventMarkers={props.eventMarkers}
        />
      ))}
    </Fragment>
  );
}

interface EventMarkerProps {
  mapId: string;
  event: Event;
  eventMarkers: Map<string, EventMarker>;
}

function EventMarker(props: EventMarkerProps) {
  const map = useMap();
  const markerRef = useRef<LeafletMarker | null>(null);
  const [view, setView] = useState(EventMarkerViews.READ);

  useEffect(() => {
    if (markerRef.current) {
      props.eventMarkers.set(props.event.id, {
        marker: markerRef.current,
        setView: (view) => setView(view),
      });
    }
  }, [markerRef, props.event.id, props.eventMarkers]);

  return (
    <Marker
      ref={markerRef}
      position={{
        lat: props.event.latitude,
        lng: props.event.longitude,
      }}
      eventHandlers={{
        popupclose: () => {
          // wait for the popup to close before resetting the view
          setTimeout(() => {
            setView(EventMarkerViews.READ);
          }, 100);
        },
        popupopen: (event) => CenterPopup(event.popup, map, true),
      }}
    >
      <Popup autoPan>
        <EventPopupContent {...props} view={view} setView={setView} />
      </Popup>
    </Marker>
  );
}

interface EventPopupProps extends EventMarkerProps {
  view: EventMarkerViews;
  setView: (view: EventMarkerViews) => void;
}

function EventPopupContent(props: EventPopupProps) {
  switch (props.view) {
    case EventMarkerViews.READ:
      return <ReadEventPopup {...props} />;
    case EventMarkerViews.EDIT:
      return <EditEventPopup {...props} />;
    case EventMarkerViews.DELETE:
      return <DeleteEventPopup {...props} />;
  }
}

function ReadEventPopup(props: EventPopupProps) {
  const { isSignedIn } = useAuth();

  return (
    <div>
      <div className="flex flex-col">
        <div className="text-lg">{props.event.name}</div>

        <div className="mt-1">{props.event.description}</div>

        <div className="mt-2 flex">
          <div className="mr-2 flex">
            <div className="mr-1 font-bold">Start:</div>
            <div>{FormatDate(props.event.startTime)}</div>
          </div>
          <div className="flex">
            <div className="mr-1 font-bold">End:</div>
            <div>{FormatDate(props.event.endTime)}</div>
          </div>
        </div>

        {isSignedIn && (
          <div className="mt-2 flex justify-around">
            <Image
              className="icon"
              src="/edit-icon.svg"
              alt="Edit"
              width={18}
              height={18}
              onClick={(event) => {
                event.stopPropagation();
                props.setView(EventMarkerViews.EDIT);
              }}
            />
            <Image
              className="icon"
              src="/delete-icon.svg"
              alt="Delete"
              width={18}
              height={18}
              onClick={(event) => {
                event.stopPropagation();
                props.setView(EventMarkerViews.DELETE);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function EditEventPopup(props: EventPopupProps) {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
      <EventForm
        mapId={props.mapId}
        eventData={{
          eventId: props.event.id,
          initialValues: {
            ...props.event,
            startTime: Number(props.event.startTime),
            endTime: Number(props.event.endTime),
          },
        }}
        latLng={new LatLng(props.event.latitude, props.event.longitude)}
        close={() => {
          // switch back to the detail view when the form submission completes
          props.setView(EventMarkerViews.READ);
        }}
      />
    </div>
  );
}

function DeleteEventPopup(props: EventPopupProps) {
  const { isSignedIn } = useAuth();
  const ctx = api.useContext();
  const deleteMutation = api.eventRouter.deleteById.useMutation();
  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="text-lg">
          <div>Are you sure you wish to delete this event?</div>
          <div className="inline-block font-bold">{props.event.name}</div>
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <button
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={(event) => {
              event.stopPropagation();
              props.setView(EventMarkerViews.READ);
            }}
          >
            Cancel
          </button>
          <button
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              deleteMutation
                .mutateAsync({
                  id: props.event.id,
                })
                .then(async () => {
                  // re-fetch events shown on the event_map
                  await ctx.eventRouter.getByMapId.invalidate({
                    mapId: props.mapId,
                  });
                  const eventMarker = props.eventMarkers.get(props.event.id);
                  if (eventMarker) {
                    eventMarker.marker.closePopup();
                  }
                })
                .catch((error) => {
                  console.error("error deleting event_map event", error);
                });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
