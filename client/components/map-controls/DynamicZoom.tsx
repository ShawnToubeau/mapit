import useWindowWidth from "../../hooks/use-window-width";
import { ZoomControl } from "react-leaflet";
import { LargeBreakpoint } from "../../constants";

export default function DynamicZoomControl() {
	const width = useWindowWidth();
	if (width < LargeBreakpoint) {
		return null;
	}

	return <ZoomControl position="bottomright" />;
}
