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
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import EventForm from "./EventForm";

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
