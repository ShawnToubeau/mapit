import { useRef, useState } from "react";
import { LatLng, Popup as LeafletPopup } from "leaflet";
import { Popup, useMap, useMapEvents } from "react-leaflet";
import EventForm from "../EventForm";
import { useSupabase } from "../../context/supabase-provider";
import { CenterPopup } from "../../app/map/[mapId]/utils";

interface NewEventPopupProps {
	mapId: string;
}

export default function NewEventPopup(props: NewEventPopupProps) {
	const map = useMap();
	const { session } = useSupabase();
	const [position, setPosition] = useState<LatLng | null>(null);
	const popupRef = useRef<LeafletPopup | null>(null);

	useMapEvents({
		// opens a new event popup at the clicked location
		click(event) {
			setPosition(event.latlng);

			// wait for the ref to update
			setTimeout(() => {
				const popup = popupRef.current;
				if (popup) {
					CenterPopup(popup, map, false);
				}
			}, 20);
		},
	});

	if (!position || !session) {
		return null;
	}

	return (
		<Popup ref={popupRef} position={position}>
			<EventForm
				mapId={props.mapId}
				session={session}
				latLng={position}
				close={() => setPosition(null)}
			/>
		</Popup>
	);
}
