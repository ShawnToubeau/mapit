import dynamic from "next/dynamic";

export default async function Page() {
	const MapWithNoSSR = dynamic(() => import("./Map"), {
		ssr: false,
	});

	return (
		<div>
			<div
				id="map"
				style={{
					height: "100vh",
				}}
			>
				<MapWithNoSSR />
			</div>
		</div>
	);
}
