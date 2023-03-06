"use client";

import useWindowWidth from "../hooks/use-window-width";
import React, { useState } from "react";
import NavigationFooter, { MobileView } from "./NavigationFooter";
import EventsList from "./EventsList";
import { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import EventMap from "./EventMap";
import { LargeBreakpoint } from "../constants";
import { EventMarkerViews } from "./map-controls/EventMarkers";

export type EventMarker = {
	marker: LeafletMarker;
	setView: (view: EventMarkerViews) => void;
};

interface ResponsiveEventMapProps {
	mapId: string;
}

export default function ResponsiveEventMap(props: ResponsiveEventMapProps) {
	const width = useWindowWidth();
	return width > LargeBreakpoint ? (
		<DesktopLayout {...props} />
	) : (
		<MobileLayout {...props} />
	);
}

function DesktopLayout(props: ResponsiveEventMapProps) {
	const [map, setMap] = useState<LeafletMap | null>(null);
	const [eventMarker] = useState(new Map<string, EventMarker>());

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
						eventMarkers={eventMarker}
					/>
				</div>

				<EventMap
					mapId={props.mapId}
					setMap={setMap}
					eventMarkers={eventMarker}
				/>
			</div>
		</>
	);
}

function MobileLayout(props: ResponsiveEventMapProps) {
	const [map, setMap] = useState<LeafletMap | null>(null);
	const [markerPopups] = useState(new Map<string, EventMarker>());
	const [mobileView, setMobileView] = useState(MobileView.MAP);

	return (
		<>
			<div>
				{mobileView === MobileView.MAP ? null : (
					<div className="absolute w-full bg-white z-10">
						<EventsList
							mapId={props.mapId}
							map={map}
							eventMarkers={markerPopups}
							onEventLocationSelect={() => setMobileView(MobileView.MAP)}
						/>
					</div>
				)}

				<EventMap
					mapId={props.mapId}
					setMap={setMap}
					eventMarkers={markerPopups}
				/>
			</div>

			<NavigationFooter mobileView={mobileView} setMobileView={setMobileView} />
		</>
	);
}
