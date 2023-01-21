"use client";

import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Fragment, useEffect, useState } from "react";
import { LatLng } from "leaflet";
import EventForm from "./EventForm";
import { useClient } from "../hooks/use-client";
import { MapEventService } from "../map_api/v1/map_api_connectweb";
import useSWR from "swr";

export enum SwrKeys {
	EVENT_MARKERS = "event-markers",
}

export default function Map() {
	return (
		<MapContainer
			scrollWheelZoom
			zoom={16}
			center={[40.8054, -74.0241]}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker />
			<NewEventPopup />
			<EventMarkers />
		</MapContainer>
	);
}

function LocationMarker() {
	const map = useMap();
	const [position, setPosition] = useState<LatLng | null>(null);

	useEffect(() => {
		map.locate().on("locationfound", function (event) {
			setPosition(event.latlng);
			map.setView({
				lat: event.latlng.lat,
				lng: event.latlng.lng,
			});
		});
	}, [map]);

	return position === null ? null : (
		<Marker position={position}>
			<Popup>
				{`Latitude: ${position.lat}`} <br />
				{`Longitude: ${position.lng}`}
			</Popup>
		</Marker>
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
				<Marker
					key={event.id}
					position={{
						lat: event.latitude,
						lng: event.longitude,
					}}
				>
					<Popup>
						{event.name}
						{event.description}
					</Popup>
				</Marker>
			))}
		</Fragment>
	);
}
