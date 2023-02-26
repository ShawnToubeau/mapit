import { useState, useLayoutEffect } from "react";

type WindowDimensions = {
	width: number;
	height: number;
};

function getWindowDimensions(): WindowDimensions {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
		getWindowDimensions(),
	);

	useLayoutEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}
