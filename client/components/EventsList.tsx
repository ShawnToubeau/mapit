import { useClient } from "../hooks/use-client";
import { EventService } from "../gen/proto/event_api/v1/event_api_connectweb";
import useSWR from "swr";
import { GetEventResponse } from "../gen/proto/event_api/v1/event_api_pb";
import { Fragment, useMemo, useState } from "react";
import { clsx } from "clsx";
import FormatDate from "../utils/format-date";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useWindowDimensions from "../hooks/use-window-dimensions";
import { AnonAuthHeader } from "../utils/generate-auth-header";
import { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import {
	FooterHeight,
	HeaderHeight,
	MobileLayoutBreakpoint,
	SwrKeys,
} from "../constants";

enum SortOrder {
	ALPHABETICAL_ASCENDING = "alphabetical_ascending",
	ALPHABETICAL_DESCENDING = "alphabetical_descending",
	CHRONOLOGICAL_ASCENDING = "chronological_ascending",
	CHRONOLOGICAL_DESCENDING = "chronological_descending",
}

function sortOrderToString(sortOrder: SortOrder): string {
	switch (sortOrder) {
		case SortOrder.ALPHABETICAL_ASCENDING:
			return "A-Z";
		case SortOrder.ALPHABETICAL_DESCENDING:
			return "Z-A";
		case SortOrder.CHRONOLOGICAL_ASCENDING:
			return "Chronological Asc";
		case SortOrder.CHRONOLOGICAL_DESCENDING:
			return "Chronological Desc";
	}
}

interface EventsListProps {
	mapId: string;
	map: LeafletMap | null;
	eventMarkers: Map<string, LeafletMarker>;
	onEventLocationSelect?: () => void;
}

export default function EventsList(props: EventsListProps) {
	const { width } = useWindowDimensions();
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState(SortOrder.ALPHABETICAL_ASCENDING);
	const client = useClient(EventService);
	const { data } = useSWR(SwrKeys.EVENT_MARKERS, () =>
		client
			.getAllEvents({ parentMapId: props.mapId }, { headers: AnonAuthHeader() })
			.then((res) => {
				return res.events;
			}),
	);

	// the amount of height we need to subtract to size the event list
	const subtractedListHeight = useMemo(() => {
		if (width > MobileLayoutBreakpoint) {
			return HeaderHeight;
		}

		return HeaderHeight + FooterHeight;
	}, [width]);

	return (
		<div
			className="grid px-6 border-t-gray-300 border-t"
			style={{
				height: `calc(100dvh - ${subtractedListHeight}px)`,
				gridTemplateRows: "min-content auto",
			}}
		>
			<div>
				<div className="text-2xl pt-1">Events</div>
				<input
					className="mt-1 mb-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-2"
					placeholder="Search events"
					value={searchTerm}
					style={{
						height: 30,
					}}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
				<SortOrderDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
			</div>

			<div className="overflow-auto mt-2">
				{data &&
					sortEvents(filterEvents(data, searchTerm), sortOrder).map(
						(event, index) => (
							<div
								key={event.id}
								className={clsx("py-2 pl-4", {
									"mt-2": index > 0, // margin on every card except the first
									"bg-slate-200": index % 2 === 0, // alternating background colors
								})}
							>
								<EventCard {...props} event={event} />
							</div>
						),
					)}
			</div>
		</div>
	);
}

function filterEvents(events: GetEventResponse[], searchTerm: string) {
	return events.filter((event) =>
		event.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
}

function sortEvents(events: GetEventResponse[], sortOrder: SortOrder) {
	function nameComparator(a: GetEventResponse, b: GetEventResponse): number {
		if (a.name < b.name) {
			return -1;
		} else if (a.name > b.name) {
			return 1;
		}

		return 0;
	}

	function dateComparator(a: GetEventResponse, b: GetEventResponse): number {
		return Number(a.startTime - b.startTime);
	}

	switch (sortOrder) {
		case SortOrder.ALPHABETICAL_ASCENDING:
			return events.sort(nameComparator);
		case SortOrder.ALPHABETICAL_DESCENDING:
			return events.sort((a, b) => nameComparator(a, b) * -1);
		case SortOrder.CHRONOLOGICAL_ASCENDING:
			return events.sort(dateComparator);
		case SortOrder.CHRONOLOGICAL_DESCENDING:
			return events.sort((a, b) => dateComparator(a, b) * -1);
	}
}

interface EventCardProps extends EventsListProps {
	event: GetEventResponse;
}

function EventCard(props: EventCardProps) {
	const [clampLines, setClampLines] = useState(true);

	return (
		<Fragment>
			<div className="flex">
				<div>
					<div>
						<div className="inline mr-1 font-bold">Name:</div>
						<div className="inline">{props.event.name}</div>
					</div>
					<div>
						<div className="inline mr-1 font-bold">Start:</div>
						<div className="inline">{FormatDate(props.event.startTime)}</div>
					</div>
					<div>
						<div className="inline mr-1 font-bold">End:</div>
						<div className="inline">{FormatDate(props.event.endTime)}</div>
					</div>
				</div>
				<div className="flex ml-auto h-fit mt-1 mr-5 ml-1">
					<Image
						className="icon"
						src="/location-dot-icon.svg"
						alt="Edit"
						width={12}
						height={12}
						onClick={() => {
							const marker = props.eventMarkers.get(props.event.id);
							if (marker) {
								// below code is taken from here https://stackoverflow.com/a/23960984/7627620
								// first, open the popup
								marker.openPopup();
								// wait 20 ms for the popup container to populate in the DOM
								setTimeout(() => {
									const popupHeight = marker
										.getPopup()
										?.getElement()?.clientHeight;
									if (props.map && !!popupHeight) {
										// convert our marker lat/lng to pixel values
										const px = props.map.project(marker.getLatLng());
										// translate the y-value by half of the popup's height
										px.y -= popupHeight / 2;
										// convert back to a lat/lng and fly there, centering the popup in view
										// TODO it doesn't not account for zoom atm
										props.map.flyTo(props.map.unproject(px));
										props.onEventLocationSelect?.();
									} else {
										console.error(
											"map ref or popup height are undefined",
											props.map,
											popupHeight,
										);
									}
								}, 20);
							} else {
								console.error("marker ref undefined");
							}
						}}
					/>
					<Image
						className="icon ml-2"
						src="/ellipsis-vertical-icon.svg"
						alt="Edit"
						width={6}
						height={6}
						// onClick={(event) => {}}
					/>
				</div>
			</div>
			<div
				className={clsx({
					"line-clamp-6": clampLines,
				})}
			>
				<div className="inline mr-1 font-bold">Description:</div>
				<div className="inline">{props.event.description}</div>
			</div>
			<button
				className="text-gray-600 hover:underline mt-1"
				onClick={() => setClampLines(!clampLines)}
			>
				{clampLines ? "Show more" : "Show less"}
			</button>
		</Fragment>
	);
}

interface SortOrderDropdownProps {
	sortOrder: SortOrder;
	setSortOrder: (sortOrder: SortOrder) => void;
}

function SortOrderDropdown(props: SortOrderDropdownProps) {
	return (
		<Listbox value={props.sortOrder} onChange={props.setSortOrder}>
			{({ open }) => (
				<>
					<div className="relative mt-1">
						<Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm cursor-pointer">
							<span className="block truncate">
								{sortOrderToString(props.sortOrder)}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{Object.values(SortOrder).map((sortOrderOpt) => (
									<Listbox.Option
										key={sortOrderOpt}
										className={({ active }) =>
											clsx(
												"cursor-pointer",
												active ? "text-white bg-indigo-600" : "text-gray-900",
												"relative cursor-default select-none py-2 pl-3 pr-9",
											)
										}
										value={sortOrderOpt}
									>
										{({ selected, active }) => (
											<>
												<span
													className={clsx(
														selected ? "font-semibold" : "font-normal",
														"block truncate",
													)}
												>
													{sortOrderToString(sortOrderOpt)}
												</span>

												{selected ? (
													<span
														className={clsx(
															active ? "text-white" : "text-indigo-600",
															"absolute inset-y-0 right-0 flex items-center pr-4",
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
