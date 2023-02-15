import useWindowDimensions from "../hooks/use-window-dimensions";
import React, { useState } from "react";
import NavigationFooter, { MobileView } from "./NavigationFooter";
import EventMap from "./EventMap";
import EventsList from "./EventsList";
import { MobileLayoutBreakpoint } from "../pages";

export default function ResponsiveEventMap() {
	const { width } = useWindowDimensions();
	return width > MobileLayoutBreakpoint ? <DesktopLayout /> : <MobileLayout />;
}

function DesktopLayout() {
	return (
		<>
			<div className="flex">
				<div
					style={{
						width: 448,
					}}
				>
					<EventsList />
				</div>

				<EventMap />
			</div>
		</>
	);
}

function MobileLayout() {
	const [mobileView, setMobileView] = useState(MobileView.MAP);

	return (
		<>
			{/*TODO show the list on top of the map so we don't unmount it*/}
			{mobileView === MobileView.MAP ? <EventMap /> : <EventsList />}

			<NavigationFooter mobileView={mobileView} setMobileView={setMobileView} />
		</>
	);
}
