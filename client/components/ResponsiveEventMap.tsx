"use client";

import useWindowDimensions from "../hooks/use-window-dimensions";
import React, { useState } from "react";
import NavigationFooter, { MobileView } from "./NavigationFooter";
import EventsList from "./EventsList";
import { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { MobileLayoutBreakpoint } from "../constants";
import EventMap from "./EventMap";

export type EventMarkerSetter = (
	eventId: string,
	eventMarker: LeafletMarker,
) => void;

interface ResponsiveEventMapProps {
	mapId: string;
}

export default function ResponsiveEventMap(props: ResponsiveEventMapProps) {
	const { width } = useWindowDimensions();
	return width > MobileLayoutBreakpoint ? (
		<DesktopLayout {...props} />
	) : (
		<MobileLayout {...props} />
	);
}

function DesktopLayout(props: ResponsiveEventMapProps) {
	const [map, setMap] = useState<LeafletMap | null>(null);
	const [eventMarkers] = useState(new Map<string, LeafletMarker>());

	return (
		<>
			<div className="flex">
				<div
					style={{
						width: 448,
					}}
				>
					<EventsList
						mapId={props.mapId}
						map={map}
						eventMarkers={eventMarkers}
					/>
				</div>

				<EventMap
					mapId={props.mapId}
					setMap={setMap}
					eventMarkers={eventMarkers}
					setEventMarker={(eventId, marker) =>
						eventMarkers.set(eventId, marker)
					}
				/>
			</div>
		</>
	);
}

function MobileLayout(props: ResponsiveEventMapProps) {
	const [map, setMap] = useState<LeafletMap | null>(null);
	const [eventMarkers] = useState(new Map<string, LeafletMarker>());
	const [mobileView, setMobileView] = useState(MobileView.MAP);

	return (
		<>
			<div>
				{mobileView === MobileView.MAP ? null : (
					<div className="absolute w-full bg-white z-10">
						<EventsList
							mapId={props.mapId}
							map={map}
							eventMarkers={eventMarkers}
							onEventLocationSelect={() => setMobileView(MobileView.MAP)}
						/>
					</div>
				)}

				<EventMap
					mapId={props.mapId}
					setMap={setMap}
					eventMarkers={eventMarkers}
					setEventMarker={(eventId, marker) =>
						eventMarkers.set(eventId, marker)
					}
				/>
			</div>

			<NavigationFooter mobileView={mobileView} setMobileView={setMobileView} />
		</>
	);
}
