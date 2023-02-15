export enum MobileView {
	MAP,
	EVENTS,
}

interface NavigationFooterProps {
	mobileView: MobileView;
	setMobileView: (view: MobileView) => void;
}

export default function NavigationFooter(props: NavigationFooterProps) {
	return (
		<span className="isolate inline-flex rounded-md shadow-sm">
			<button
				type="button"
				className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full justify-center"
				onClick={() => props.setMobileView(MobileView.MAP)}
			>
				Map
			</button>
			<button
				type="button"
				className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full justify-center"
				onClick={() => props.setMobileView(MobileView.EVENTS)}
			>
				Events
			</button>
		</span>
	);
}
