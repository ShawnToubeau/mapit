import { Map as LeafletMap } from "leaflet";
import { MapContainer, TileLayer, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import AddressSearch from "./map-controls/AddressSearch";
import EventMarkers from "./map-controls/EventMarkers";
import NewEventPopup from "./map-controls/NewEventPopup";
import LocationMarker from "./map-controls/LocationMarker";
import DynamicZoomControl from "./map-controls/DynamicZoom";
import { useMemo } from "react";
import { EventMarker } from "./ResponsiveEventMap";

interface EventMapProps {
	mapId: string;
	setMap: (map: LeafletMap | null) => void;
	eventMarkers: Map<string, EventMarker>;
}

export default function EventMap(props: EventMapProps) {
	const displayMap = useMemo(
		() => (
			<MapContainer
				scrollWheelZoom
				zoom={16}
				zoomControl={false}
				center={[40.8054, -74.0241]}
				ref={(map) => props.setMap(map)}
				style={{ height: "100%", width: "100%", zIndex: 0 }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarker />
				<NewEventPopup mapId={props.mapId} />
				<EventMarkers mapId={props.mapId} eventMarkers={props.eventMarkers} />
				<ScaleControl />
				<DynamicZoomControl />
				<AddressSearch mapId={props.mapId} />
			</MapContainer>
		),
		[props.mapId, props.setMap, props.eventMarkers],
	);

	return displayMap;
}
