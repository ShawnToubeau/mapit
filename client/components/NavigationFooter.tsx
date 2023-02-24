import { clsx } from "clsx";

const btnBaseClass =
	"relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full justify-center";
const btnActiveClass = "bg-indigo-600 hover:bg-indigo-600 text-white";

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
				className={clsx(btnBaseClass, {
					[btnActiveClass]: props.mobileView === MobileView.MAP,
				})}
				onClick={() => props.setMobileView(MobileView.MAP)}
			>
				Map
			</button>
			<button
				type="button"
				className={clsx(btnBaseClass, {
					[btnActiveClass]: props.mobileView === MobileView.EVENTS,
				})}
				onClick={() => props.setMobileView(MobileView.EVENTS)}
			>
				Events
			</button>
		</span>
	);
}
