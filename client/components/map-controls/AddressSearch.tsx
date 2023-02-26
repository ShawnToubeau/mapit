import { Popup, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { SearchAddressResponse } from "../../gen/proto/geocode_api/v1/geocode_api_pb";
import { LatLng, Popup as LeafletPopup } from "leaflet";
import { useClient } from "../../hooks/use-client";
import { GeocodeService } from "../../gen/proto/geocode_api/v1/geocode_api_connectweb";
import Image from "next/image";
import Control from "react-leaflet-custom-control";
import EventForm from "../EventForm";

import { Session } from "@supabase/auth-helpers-react";
import GenerateAuthHeader from "../../utils/generate-auth-header";
import { clsx } from "clsx";
import { useSupabase } from "../../context/supabase-provider";

interface AddressSearchProps {
	mapId: string;
}

export default function AddressSearch(props: AddressSearchProps) {
	const map = useMap();
	const { session } = useSupabase();
	// this helps persist the searched term once a user performs the search
	const [persistentSearch, setPersistentSearch] = useState<string>("");
	const [address, setAddress] = useState<SearchAddressResponse | null>(null);
	const [latLng, setLatLng] = useState<LatLng | null>(null);
	const popupRef = useRef<LeafletPopup | null>(null);

	// centers the popup within the map when it opens.
	// code taken from here https://stackoverflow.com/a/23960984/7627620
	useEffect(() => {
		// wait 20 ms for the popup container to populate in the DOM
		setTimeout(() => {
			const popupHeight = popupRef.current?.getElement()?.clientHeight;
			if (popupHeight && latLng) {
				// convert our lat/lng to pixel values
				const px = map.project(latLng);
				// translate the y-value by half of the popup's height
				px.y -= popupHeight / 2;
				// convert back to a lat/lng and fly there, centering the popup in view
				map.flyTo(map.unproject(px));
			}
		}, 20);
	}, [popupRef, latLng, map]);

	if (!session) {
		return null;
	}

	// the input is within its own function because when wrapped with Control, it
	// loses focus after every keystroke
	function AddressInput({
		search,
		session,
	}: {
		search: string;
		session: Session;
	}) {
		// this state must stay in this component to ensure we don't lose focus when it updates
		const [searchTerm, setSearchTerm] = useState<string>(search);
		const client = useClient(GeocodeService);

		function searchAddress() {
			setPersistentSearch(searchTerm);
			client
				.searchAddress(
					{
						query: searchTerm.replaceAll(" ", "+"),
					},
					{
						headers: GenerateAuthHeader(session),
					},
				)
				.then((res) => {
					setAddress(res);
					setLatLng(new LatLng(res.latitude, res.longitude));
					map.setZoom(18);
					map.setView({
						lat: res.latitude,
						lng: res.longitude,
					});
				})
				.catch((error) => console.error("error searching for address", error));
		}

		return (
			<div className="flex">
				<input
					type="text"
					className="mr-1 map-control-border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2"
					placeholder="Search for an address"
					value={searchTerm}
					onChange={(e) => {
						e.stopPropagation();
						e.preventDefault();
						setSearchTerm(e.target.value);
					}}
					style={{
						width: 200,
					}}
				/>
				<div
					className={clsx(
						"bg-white flex justify-center map-control-border rounded-md",
						{
							"bg-zinc-200 cursor-not-allowed": searchTerm.length === 0,
							"hover:bg-zinc-100 cursor-pointer": searchTerm.length > 0,
						},
					)}
					style={{
						width: 30,
						height: 30,
					}}
				>
					<Image
						src="/magnifying-glass-icon.svg"
						alt="Search"
						width={14}
						height={14}
						onClick={(event) => {
							event.stopPropagation();
							if (searchTerm.length > 0) {
								searchAddress();
							}
						}}
					/>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Control position="topleft">
				<AddressInput search={persistentSearch} session={session} />
			</Control>

			{address && latLng && (
				<Popup position={latLng} ref={popupRef}>
					<EventForm
						mapId={props.mapId}
						session={session}
						latLng={latLng}
						close={() => setAddress(null)}
					/>
				</Popup>
			)}
		</div>
	);
}
