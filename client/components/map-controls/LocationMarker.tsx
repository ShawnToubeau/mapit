import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { circle, Circle, Icon, LatLng } from "leaflet";
import Control from "react-leaflet-custom-control";
import Image from "next/image";

const userLocationIcon = new Icon({
	iconSize: [24, 24],
	iconUrl: "/circle-icon.svg",
});

export default function LocationMarker() {
	const map = useMap();
	const [position, setPosition] = useState<LatLng | null>(null);
	const [positionAccuracy, setPositionAccuracy] = useState<number | null>(null);
	const [areaCircle, setAreaCircle] = useState<Circle | null>(null);

	useEffect(() => {
		map.locate().on("locationfound", (event) => {
			setPosition(event.latlng);
			setPositionAccuracy(event.accuracy);
			setTimeout(() => {
				map.setZoom(16);
				map.setView({
					lat: event.latlng.lat,
					lng: event.latlng.lng,
				});
			}, 20);
		});
	}, [map]);

	useEffect(() => {
		if (position && positionAccuracy) {
			if (!areaCircle) {
				// a circle drawn on the user's location representing the immediate area
				const area = circle(position, positionAccuracy);
				setAreaCircle(area);
				area.addTo(map);
			} else {
				areaCircle.setLatLng(position);
				areaCircle.redraw();
			}
		}
	}, [position, areaCircle, map, positionAccuracy]);

	return (
		<div>
			{position && (
				<Marker position={position} icon={userLocationIcon}>
					<Popup>
						{`Latitude: ${position.lat}`} <br />
						{`Longitude: ${position.lng}`}
					</Popup>
				</Marker>
			)}
			<Control prepend position="bottomright">
				<div className="p-1 rounded-md bg-white map-control-border hover:bg-zinc-100 cursor-pointer">
					<Image
						src="/location-crosshairs-icon.svg"
						alt="Locate me"
						width={22}
						height={22}
						onClick={(event) => {
							event.stopPropagation();
							map.locate();
						}}
					/>
				</div>
			</Control>
		</div>
	);
}
