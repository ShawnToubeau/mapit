import useWindowDimensions from "../../hooks/use-window-dimensions";
import { ZoomControl } from "react-leaflet";
import { MobileLayoutBreakpoint } from "../../constants";

export default function DynamicZoomControl() {
	const { width } = useWindowDimensions();
	if (width < MobileLayoutBreakpoint) {
		return null;
	}

	return <ZoomControl position="bottomright" />;
}
