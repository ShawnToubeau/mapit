import { useClient } from "../../hooks/use-client";
import { EventService } from "../../gen/event_api/v1/event_api_connectweb";
import useSWR, { mutate } from "swr";
import GenerateAuthHeader, {
	AnonAuthHeader,
} from "../../utils/generate-auth-header";
import { Fragment, useEffect, useRef, useState } from "react";
import { GetEventResponse } from "../../gen/event_api/v1/event_api_pb";
import { LatLng, Marker as LeafletMarker } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import EventForm from "../EventForm";
import FormatDate from "../../utils/format-date";
import Image from "next/image";
import { SwrKeys } from "../../constants";
import { EventMarker } from "../ResponsiveEventMap";
import { useSupabase } from "../../context/supabase-provider";
import { CenterPopup } from "../../app/map/[mapId]/utils";

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
	const client = useClient(EventService);
	const { data, error } = useSWR(SwrKeys.EVENT_MARKERS, () =>
		client
			.getAllEvents(
				{
					parentMapId: props.mapId,
				},
				{
					headers: AnonAuthHeader(),
				},
			)
			.then((res) => {
				return res.events;
			})
			.catch((err) => console.error("error fetching map events", err)),
	);

	if (!data || error) {
		return null;
	}

	return (
		<Fragment>
			{data.map((event) => (
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
	event: GetEventResponse;
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
	const { session } = useSupabase();

	return (
		<div>
			<div className="flex flex-col">
				<div className="text-lg">{props.event.name}</div>

				<div className="mt-1">{props.event.description}</div>

				<div className="flex mt-2">
					<div className="mr-2 flex">
						<div className="font-bold mr-1">Start:</div>
						<div>{FormatDate(props.event.startTime)}</div>
					</div>
					<div className="flex">
						<div className="font-bold mr-1">End:</div>
						<div>{FormatDate(props.event.endTime)}</div>
					</div>
				</div>

				{session && (
					<div className="flex justify-around mt-2">
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
	const { session } = useSupabase();
	if (!session) {
		return null;
	}

	return (
		<div>
			<EventForm
				mapId={props.mapId}
				session={session}
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
	const { session } = useSupabase();
	const client = useClient(EventService);
	if (!session) {
		return null;
	}

	return (
		<div>
			<div className="flex flex-col">
				<div className="text-lg">
					<div>Are you sure you wish to delete this event?</div>
					<div className="font-bold inline-block">{props.event.name}</div>
				</div>
				<div className="flex justify-center gap-2 mt-2">
					<button
						className="w-full inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(event) => {
							event.stopPropagation();
							props.setView(EventMarkerViews.READ);
						}}
					>
						Cancel
					</button>
					<button
						className="w-full inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						onClick={() => {
							client
								.deleteEvent(
									{
										id: props.event.id,
									},
									{
										headers: GenerateAuthHeader(session),
									},
								)
								.then(async () => {
									// re-fetch events shown on the event_map
									await mutate(SwrKeys.EVENT_MARKERS);
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
