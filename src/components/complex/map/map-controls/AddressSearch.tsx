import { Button } from "@src/components/simple/Button";
import { Input } from "@src/components/simple/Form";
import { api } from "@src/utils/api";
import { CenterPopup } from "@src/utils/map";
import { LatLng, type Popup as LeafletPopup } from "leaflet";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Popup, useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { MediumBreakpoint } from "../../../../constants";
import useWindowWidth from "../../../../hooks/use-window-width";
import EventForm from "../../events/EventForm";
import { useUser } from "@clerk/nextjs";
import { type UserResource } from "@clerk/types/dist";

interface AddressSearchProps {
  mapId: string;
}

export default function AddressSearch(props: AddressSearchProps) {
  const map = useMap();
  const width = useWindowWidth();
  const { user } = useUser();
  // this helps persist the searched term once a user performs the search
  const [persistentSearch, setPersistentSearch] = useState<string>("");
  const [latLng, setLatLng] = useState<LatLng | null>(null);
  const popupRef = useRef<LeafletPopup | null>(null);

  // centers the popup within the map when it opens.
  useEffect(() => {
    const popup = popupRef.current;
    if (popup) {
      CenterPopup(popup, map, false);
    }
  }, [popupRef, latLng, map]);

  if (!user) {
    return null;
  }

  // the input is within its own function because when wrapped with Control, it
  // loses focus after every keystroke
  function AddressInput({ search }: { search: string; user: UserResource }) {
    // this state must stay in this component to ensure we don't lose focus when it updates
    const [searchTerm, setSearchTerm] = useState<string>(search);
    // we use `useMutation` instead of `useQuery` because query does not have an async call
    const searchFn = api.geocodeRouter.searchAddress.useMutation();

    function searchAddress() {
      setPersistentSearch(searchTerm);
      searchFn
        .mutateAsync({
          addressString: searchTerm.replaceAll(" ", "+"),
        })
        .then((res) => {
          const lat = parseFloat(res.result.data.lat);
          const lon = parseFloat(res.result.data.lon);

          // setAddress(res);
          setLatLng(new LatLng(lat, lon));
          map.setZoom(18);
          map.setView({
            lat: lat,
            lng: lon,
          });
        })
        .catch((error) => console.error("error searching for address", error));
    }

    return (
      <div className="flex">
        <Input
          bgColor="gray"
          className="mr-1"
          placeholder="Search for an address"
          value={searchTerm}
          onChange={(event) => {
            event.stopPropagation();
            event.preventDefault();
            setSearchTerm(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && searchTerm.length > 0) {
              searchAddress();
            }
          }}
          style={{
            // the input will take full width across the screen on smaller resolutions.
            // there was no control that offered this type of positioning
            width: width > MediumBreakpoint ? 300 : `calc(100vw - 20px)`,
          }}
        />
        <Button
          style="iconOnly"
          disabled={searchTerm.length === 0}
          onClick={(event) => {
            event.stopPropagation();
            if (searchTerm.length > 0) {
              searchAddress();
            }
          }}
        >
          <Image
            src="/magnifying-glass-icon.svg"
            alt="Search"
            width={14}
            height={14}
          />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Control position="topleft">
        <AddressInput search={persistentSearch} user={user} />
      </Control>

      {latLng && (
        <Popup position={latLng} ref={popupRef}>
          <EventForm
            mapId={props.mapId}
            latLng={latLng}
            close={() => setLatLng(null)}
          />
        </Popup>
      )}
    </div>
  );
}
