import ResponsiveEventMap from "../../../components/ResponsiveEventMap";
import { FooterHeight, HeaderHeight } from "../../../constants";
import Header from "../../../components/Header";

export default function Page({ params }: { params: { mapId: string } }) {
	return (
		<div
			className="grid"
			style={{
				height: "100dvh",
				gridTemplateRows: `${HeaderHeight}px auto ${FooterHeight}px`,
			}}
		>
			<Header />
			<ResponsiveEventMap mapId={params.mapId} />
		</div>
	);
}
