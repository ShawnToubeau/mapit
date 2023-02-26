import { useState } from "react";
import { LatLng } from "leaflet";
import { Popup, useMapEvents } from "react-leaflet";
import EventForm from "../EventForm";
import { useSupabase } from "../../context/supabase-provider";

interface NewEventPopupProps {
	mapId: string;
}

export default function NewEventPopup(props: NewEventPopupProps) {
	const { session } = useSupabase();
	const [position, setPosition] = useState<LatLng | null>(null);
	useMapEvents({
		click(e) {
			setPosition(e.latlng);
		},
	});

	if (!position || !session) {
		return null;
	}

	return (
		<Popup position={position}>
			<EventForm
				mapId={props.mapId}
				session={session}
				latLng={position}
				close={() => setPosition(null)}
			/>
		</Popup>
	);
}
