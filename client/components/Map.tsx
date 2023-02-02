import { Popup as LeafletPopup, Icon, circle, Circle } from "leaflet";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
	ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Fragment, useEffect, useRef, useState } from "react";
import { LatLng } from "leaflet";
import EventForm from "./EventForm";
import { useClient } from "../hooks/use-client";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import { GetMapEventResponse } from "../gen/map_event_api/v1/map_event_api_pb";
import { MapEventService } from "../gen/map_event_api/v1/map_event_api_connectweb";
import Control from "react-leaflet-custom-control";

const userLocationIcon = new Icon({
	iconSize: [24, 24],
	iconUrl: "/circle-icon.svg",
});

export enum SwrKeys {
	EVENT_MARKERS = "event-markers",
}

export default function Map() {
	return (
		<MapContainer
			scrollWheelZoom
			zoom={16}
			center={[40.8054, -74.0241]}
			style={{ height: "100%", width: "100%", zIndex: 0 }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker />
			<NewEventPopup />
			<EventMarkers />
			<ScaleControl />
		</MapContainer>
	);
}

function LocationMarker() {
	const map = useMap();
	const [position, setPosition] = useState<LatLng | null>(null);
	const [positionAccuracy, setPositionAccuracy] = useState<number | null>(null);
	const [areaCircle, setAreaCircle] = useState<Circle | null>(null);

	useEffect(() => {
		map.locate().on("locationfound", (event) => {
			setPosition(event.latlng);
			setPositionAccuracy(event.accuracy);
			map.setZoom(16);
			map.setView({
				lat: event.latlng.lat,
				lng: event.latlng.lng,
			});
		});
	}, [map]);

	useEffect(() => {
		if (position && positionAccuracy) {
			if (!areaCircle) {
				// a circle drawn on the user's location representing the immediate area
				const area = circle(position, positionAccuracy);
				setAreaCircle(area);
				area.addTo(map);
			} else {
				areaCircle.setLatLng(position);
				areaCircle.redraw();
			}
		}
	}, [position, areaCircle, map, positionAccuracy]);

	return (
		<div>
			{position && (
				<Marker position={position} icon={userLocationIcon}>
					<Popup>
						{`Latitude: ${position.lat}`} <br />
						{`Longitude: ${position.lng}`}
					</Popup>
				</Marker>
			)}
			<Control position="topright">
				<div className="p-2 rounded-sm bg-white map-control-border">
					<Image
						className="icon"
						src="/location-crosshairs-icon.svg"
						alt="Locate me"
						width={18}
						height={18}
						onClick={(event) => {
							event.stopPropagation();
							map.locate();
						}}
					/>
				</div>
			</Control>
		</div>
	);
}

function NewEventPopup() {
	const [position, setPosition] = useState<LatLng | null>(null);
	useMapEvents({
		click(e) {
			setPosition(e.latlng);
		},
	});

	if (!position) {
		return null;
	}

	return (
		<Popup position={position}>
			<EventForm latLng={position} close={() => setPosition(null)} />
		</Popup>
	);
}

function EventMarkers() {
	const client = useClient(MapEventService);
	const { data, error } = useSWR(SwrKeys.EVENT_MARKERS, () =>
		client.getAllMapEvents({}).then((res) => {
			return res.events;
		}),
	);

	if (!data || error) {
		return null;
	}

	return (
		<Fragment>
			{data.map((event) => (
				<EventMarker key={event.id} event={event} />
			))}
		</Fragment>
	);
}

interface EventMarkerProps {
	event: GetMapEventResponse;
}

function EventMarker(props: EventMarkerProps) {
	const [showDelete, setShowDelete] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	return (
		<Marker
			position={{
				lat: props.event.latitude,
				lng: props.event.longitude,
			}}
			// popups have the same event handlers prop, but they don't seem to work
			// handling the events on the marker allows us to reset state but requires prop drilling
			eventHandlers={{
				// this is actually being used even though IDEs will say it isn't
				popupclose: () => {
					// wait for the popup to close before resetting state
					setTimeout(() => {
						setShowEdit(false);
						setShowDelete(false);
					}, 200);
				},
			}}
		>
			<EventPopupContent
				event={props.event}
				showEdit={showEdit}
				showDelete={showDelete}
				setShowEdit={setShowEdit}
				setShowDelete={setShowDelete}
			/>
		</Marker>
	);
}

function formatDate(unixMilli: bigint): string {
	return new Date(Number(unixMilli)).toLocaleString([], {
		dateStyle: "short",
		timeStyle: "short",
	});
}

interface EventPopupProps extends EventMarkerProps {
	showEdit: boolean;
	showDelete: boolean;
	setShowEdit: (showEdit: boolean) => void;
	setShowDelete: (showDelete: boolean) => void;
}

function EventPopupContent(props: EventPopupProps) {
	const client = useClient(MapEventService);
	const mapRef = useRef<LeafletPopup | null>(null);

	if (props.showDelete) {
		return (
			<Popup ref={mapRef}>
				<div className="flex flex-col">
					<div>Are you sure you wish to delete this event?</div>
					<div>
						<button
							onClick={(event) => {
								event.stopPropagation();
								props.setShowDelete(false);
							}}
						>
							Cancel
						</button>
						<button
							onClick={() => {
								client
									.deleteMapEvent({
										id: props.event.id,
									})
									.then(() => {
										// re-fetch events shown on the map
										mutate(SwrKeys.EVENT_MARKERS);
										mapRef.current?.close();
									})
									.catch((error) => {
										console.error("Error deleting map event", error);
									});
							}}
						>
							Delete
						</button>
					</div>
				</div>
			</Popup>
		);
	}

	if (props.showEdit) {
		return (
			<Popup>
				<EventForm
					eventData={{
						eventId: props.event.id,
						initialValues: { ...props.event },
					}}
					latLng={new LatLng(props.event.latitude, props.event.longitude)}
					close={() => {
						// switch back to the detail view when the form submission completes
						props.setShowEdit(false);
					}}
				/>
			</Popup>
		);
	}

	return (
		<Popup>
			<div className="flex flex-col">
				<div>{`Name: ${props.event.name}`}</div>
				<div>{`Start: ${formatDate(props.event.startTime)}`}</div>
				<div>{`End: ${formatDate(props.event.endTime)}`}</div>
				<div>{`Description: ${props.event.description}`}</div>

				<div className="flex justify-around mt-4">
					<Image
						className="icon"
						src="/edit-icon.svg"
						alt="Edit"
						width={18}
						height={18}
						onClick={(event) => {
							event.stopPropagation();
							props.setShowEdit(true);
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
							props.setShowDelete(true);
						}}
					/>
				</div>
			</div>
		</Popup>
	);
}
