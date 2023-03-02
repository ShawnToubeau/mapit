import ResponsiveEventMap from "../../../components/ResponsiveEventMap";
import { FooterHeight, HeaderHeight } from "../../../constants";
import Header from "../../../components/Header";
import { Client } from "../../../hooks/use-client";
import { EventMapService } from "../../../gen/proto/event_map_api/v1/event_map_api_connectweb";
import { AnonAuthHeader } from "../../../utils/generate-auth-header";

export default async function Page({ params }: { params: { mapId: string } }) {
	const client = Client(EventMapService);
	const map = await client.getEventMap(
		{
			id: params.mapId,
		},
		{
			headers: AnonAuthHeader(),
		},
	);

	return (
		<div
			className="grid"
			style={{
				height: "100dvh",
				gridTemplateRows: `${HeaderHeight}px auto ${FooterHeight}px`,
			}}
		>
			<Header mapName={map.name} />
			<ResponsiveEventMap mapId={params.mapId} />
		</div>
	);
}
