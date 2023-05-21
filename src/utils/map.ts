import { Popup, Map as LeafletMap } from "leaflet";

const MarkerHeight = 53;

// CenterPopup centers the given popup on the map.
// @see https://stackoverflow.com/a/23960984/7627620
export function CenterPopup(
	popup: Popup,
	map: LeafletMap,
	withinMarker: boolean,
) {
	setTimeout(() => {
		const popupHeight = popup.getElement()?.clientHeight;
		const popupLatLng = popup.getLatLng();
		if (map && !!popupHeight && !!popupLatLng) {
			// convert our marker lat/lng to pixel values
			const px = map.project(popupLatLng);
			// translate the y-value by half of the popup's height + the marker height
			px.y -= popupHeight / 2;
			// account for the marker height if the popup is within one
			if (withinMarker) {
				px.y -= MarkerHeight;
			}
			// convert back to a lat/lng and fly there, centering the popup in view
			// TODO it doesn't not account for zoom atm
			map.flyTo(map.unproject(px));
		}
	}, 20);
}
