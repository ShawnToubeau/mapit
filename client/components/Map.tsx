import { Popup as LeafletPopup, Icon, circle, Circle } from "leaflet";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
	ScaleControl,
	ZoomControl,
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
import { GeocodeService } from "../gen/geocode_api/v1/geocode_api_connectweb";
import { SearchAddressResponse } from "../gen/geocode_api/v1/geocode_api_pb";

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
			zoomControl={false}
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
			<ZoomControl position="topright" />
			<AddressSearch />
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
				<div className="p-1 rounded-sm bg-white map-control-border">
					<Image
						className="icon"
						src="/location-crosshairs-icon.svg"
						alt="Locate me"
						width={22}
						height={22}
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

function AddressSearch() {
	const map = useMap();
	const [address, setAddress] = useState<SearchAddressResponse | null>(null);
	const [latLng, setLatLng] = useState<LatLng | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");

	// the input is within its own function because when wrapped with Control, it
	// loses focus after every keystroke
	function AddressInput() {
		const client = useClient(GeocodeService);

		function searchAddress() {
			client
				.searchAddress({
					query: searchTerm.replaceAll(" ", "+"),
				})
				.then((res) => {
					setAddress(res);
					setLatLng(new LatLng(res.latitude, res.longitude));
					console.log("set view address search");
					map.setZoom(18);
					map.setView({
						lat: res.latitude,
						lng: res.longitude,
					});
				})
				.catch((error) => console.error("error searching for address", error));
		}

		return (
			<div className="flex">
				<input
					type="text"
					className="p-1 mr-1 map-control-border"
					placeholder="Search for an address"
					value={searchTerm}
					onChange={(e) => {
						e.stopPropagation();
						e.preventDefault();
						setSearchTerm(e.target.value);
					}}
					style={{
						width: 200,
					}}
				/>
				<div
					className="bg-white flex justify-center map-control-border"
					style={{
						width: 30,
						height: 30,
					}}
				>
					<Image
						className="icon"
						src="/magnifying-glass-icon.svg"
						alt="Search"
						width={14}
						height={14}
						onClick={(event) => {
							event.stopPropagation();
							searchAddress();
						}}
					/>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Control position={"topleft"}>
				<AddressInput />
			</Control>

			{address && latLng && (
				<Popup position={latLng}>
					<EventForm latLng={latLng} close={() => setAddress(null)} />
				</Popup>
			)}
		</div>
	);
}
