import {
	Popup as LeafletPopup,
	Icon,
	circle,
	Circle,
	Marker as LeafletMarker,
	Map as LeafletMap,
} from "leaflet";
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
import FormatDate from "../utils/format-date";
import useWindowDimensions from "../hooks/use-window-dimensions";

const userLocationIcon = new Icon({
	iconSize: [24, 24],
	iconUrl: "/circle-icon.svg",
});

export enum SwrKeys {
	EVENT_MARKERS = "event-markers",
}

// global references to the map and event markers
export let MapRef: LeafletMap | null = null;
// MarkerMap is keyed by event ID
export const MarkerMap = new Map<string, LeafletMarker>();

export default function EventMap() {
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
			<DynamicZoomControl />
			<AddressSearch />
		</MapContainer>
	);
}

function DynamicZoomControl() {
	const { width } = useWindowDimensions();

	// matches the value used by the 'lg' breakpoint in tailwindcss
	if (width < 1024) {
		return null;
	}

	return <ZoomControl position="bottomright" />;
}

function LocationMarker() {
	const map = useMap();
	const [position, setPosition] = useState<LatLng | null>(null);
	const [positionAccuracy, setPositionAccuracy] = useState<number | null>(null);
	const [areaCircle, setAreaCircle] = useState<Circle | null>(null);

	useEffect(() => {
		MapRef = map;

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
			<Control prepend position="bottomright">
				<div className="p-1 rounded-md bg-white map-control-border hover:bg-zinc-100">
					<Image
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

	useEffect(() => {
		// clear the marker map when our marker data changes
		// to ensure we always work with up-to-date data
		MarkerMap.clear();
	}, [data]);

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
	const markerRef = useRef<LeafletMarker | null>(null);

	useEffect(() => {
		if (markerRef.current) {
			MarkerMap.set(props.event.id, markerRef.current);
		}
	}, [markerRef, props.event.id]);

	return (
		<Marker
			ref={markerRef}
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

interface EventPopupProps extends EventMarkerProps {
	showEdit: boolean;
	showDelete: boolean;
	setShowEdit: (showEdit: boolean) => void;
	setShowDelete: (showDelete: boolean) => void;
}

function EventPopupContent(props: EventPopupProps) {
	const client = useClient(MapEventService);
	const popupRef = useRef<LeafletPopup | null>(null);

	if (props.showDelete) {
		return (
			<Popup ref={popupRef}>
				<div className="flex flex-col">
					<div className="text-lg">
						Are you sure you wish to delete this event?
						<div className="font-bold inline-block ml-1">
							{props.event.name}
						</div>
					</div>
					<div className="flex justify-center gap-2 mt-2">
						<button
							className="w-full inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							onClick={(event) => {
								event.stopPropagation();
								props.setShowDelete(false);
							}}
						>
							Cancel
						</button>
						<button
							className="w-full inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
							onClick={() => {
								client
									.deleteMapEvent({
										id: props.event.id,
									})
									.then(() => {
										// re-fetch events shown on the map
										mutate(SwrKeys.EVENT_MARKERS);
										popupRef.current?.close();
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

				<div className="flex justify-around mt-2">
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
	// this helps persist the searched term once a user performs the search
	const [persistentSearch, setPersistentSearch] = useState<string>("");
	const [address, setAddress] = useState<SearchAddressResponse | null>(null);
	const [latLng, setLatLng] = useState<LatLng | null>(null);

	// the input is within its own function because when wrapped with Control, it
	// loses focus after every keystroke
	function AddressInput({ search }: { search: string }) {
		// this state must stay in this component to ensure we don't lose focus when it updates
		const [searchTerm, setSearchTerm] = useState<string>(search);
		const client = useClient(GeocodeService);

		function searchAddress() {
			setPersistentSearch(searchTerm);
			client
				.searchAddress({
					query: searchTerm.replaceAll(" ", "+"),
				})
				.then((res) => {
					setAddress(res);
					setLatLng(new LatLng(res.latitude, res.longitude));
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
					className="mr-1 map-control-border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
					className="bg-white flex justify-center map-control-border rounded-md hover:bg-zinc-100"
					style={{
						width: 30,
						height: 30,
					}}
				>
					<Image
						src="/magnifying-glass-icon.svg"
						alt="Search"
						width={14}
						height={14}
						onClick={(event) => {
							event.stopPropagation();
							if (searchTerm.length > 0) {
								searchAddress();
							}
						}}
					/>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Control position="topleft">
				<AddressInput search={persistentSearch} />
			</Control>

			{address && latLng && (
				<Popup position={latLng}>
					<EventForm latLng={latLng} close={() => setAddress(null)} />
				</Popup>
			)}
		</div>
	);
}
