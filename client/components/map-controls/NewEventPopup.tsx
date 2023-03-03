import { useRef, useState } from "react";
import { LatLng, Popup as LeafletPopup } from "leaflet";
import { Popup, useMap, useMapEvents } from "react-leaflet";
import EventForm from "../EventForm";
import { useSupabase } from "../../context/supabase-provider";

interface NewEventPopupProps {
	mapId: string;
}

export default function NewEventPopup(props: NewEventPopupProps) {
	const map = useMap();
	const { session } = useSupabase();
	const [position, setPosition] = useState<LatLng | null>(null);
	const popupRef = useRef<LeafletPopup | null>(null);

	useMapEvents({
		click(event) {
			setPosition(event.latlng);

			// wait 20 ms for the popup container to populate in the DOM
			setTimeout(() => {
				const popupHeight = popupRef.current?.getElement()?.clientHeight;
				if (popupHeight) {
					// convert our lat/lng to pixel values
					const px = map.project(event.latlng);
					// translate the y-value by half of the popup's height + the marker height
					px.y -= popupHeight / 2;
					// convert back to a lat/lng and fly there, centering the popup in view
					map.flyTo(map.unproject(px));
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
