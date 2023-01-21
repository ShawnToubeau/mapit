import EventsList from "./EventsList";
import EventCreator from "./EventCreator";
import dynamic from "next/dynamic";

export default async function Page() {
	const MapWithNoSSR = dynamic(() => import("./Map"), {
		ssr: false,
	});

	return (
		<div>
			<EventsList />
			<EventCreator />
			<div
				id="map"
				style={{
					height: 400,
				}}
			>
				<MapWithNoSSR />
			</div>
		</div>
	);
}
