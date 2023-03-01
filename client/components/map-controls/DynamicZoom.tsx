import useWindowWidth from "../../hooks/use-window-width";
import { ZoomControl } from "react-leaflet";
import { MobileLayoutBreakpoint } from "../../constants";

export default function DynamicZoomControl() {
	const width = useWindowWidth();
	if (width < MobileLayoutBreakpoint) {
		return null;
	}

	return <ZoomControl position="bottomright" />;
}
