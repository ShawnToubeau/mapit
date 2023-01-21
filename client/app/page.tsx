import EventsList from "./EventsList";
import dynamic from "next/dynamic";

export default async function Page() {
	const MapWithNoSSR = dynamic(() => import("./Map"), {
		ssr: false,
	});

	return (
		<div>
			<EventsList />
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
