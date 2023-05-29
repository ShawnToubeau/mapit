import { CenterPopup } from "@src/utils/map";
import { type LatLng, type Popup as LeafletPopup } from "leaflet";
import { useRef, useState } from "react";
import { Popup, useMap, useMapEvents } from "react-leaflet";
import EventForm from "../../events/EventForm";
import { useAuth } from "@clerk/nextjs";

interface NewEventPopupProps {
  mapId: string;
}

export default function NewEventPopup(props: NewEventPopupProps) {
  const map = useMap();
  const { isSignedIn } = useAuth();
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

  if (!position || !isSignedIn) {
    return null;
  }

  return (
    <Popup ref={popupRef} position={position}>
      <EventForm
        mapId={props.mapId}
        latLng={position}
        close={() => setPosition(null)}
      />
    </Popup>
  );
}
