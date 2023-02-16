import { useClient } from "../hooks/use-client";
import { MapEventService } from "../gen/map_event_api/v1/map_event_api_connectweb";
import useSWR from "swr";
import { MapRef, MarkerMap, SwrKeys } from "./EventMap";
import { GetMapEventResponse } from "../gen/map_event_api/v1/map_event_api_pb";
import { Fragment, useMemo, useState } from "react";
import { clsx } from "clsx";
import FormatDate from "../utils/format-date";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useWindowDimensions from "../hooks/use-window-dimensions";
import { FooterHeight, HeaderHeight, MobileLayoutBreakpoint } from "../pages";

enum SortOrder {
	ALPHABETICAL_ASCENDING = "alphabetical_ascending",
	ALPHABETICAL_DESCENDING = "alphabetical_descending",
	CHRONOLOGICAL_ASCENDING = "chronological_ascending",
	CHRONOLOGICAL_DESCENDING = "chronological_descending",
}

function sortOrderToString(sortOrder: SortOrder): string {
	switch (sortOrder) {
		case SortOrder.ALPHABETICAL_ASCENDING:
			return "Alphabetical Asc";
		case SortOrder.ALPHABETICAL_DESCENDING:
			return "Alphabetical Desc";
		case SortOrder.CHRONOLOGICAL_ASCENDING:
			return "Chronological Asc";
		case SortOrder.CHRONOLOGICAL_DESCENDING:
			return "Chronological Desc";
	}
}

interface EventsListProps {
	onEventLocationSelect?: () => void;
}

export default function EventsList(props: EventsListProps) {
	const client = useClient(MapEventService);
	const { width } = useWindowDimensions();
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState(SortOrder.ALPHABETICAL_ASCENDING);
	const { data } = useSWR(SwrKeys.EVENT_MARKERS, () =>
		client.getAllMapEvents({}).then((res) => {
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
			className="grid px-6"
			style={{
				height: `calc(100dvh - ${subtractedListHeight}px)`,
				borderTop: "1px solid #e9e9ed",
				gridTemplateRows: "min-content auto",
			}}
		>
			<div>
				<div className="text-2xl">Events</div>
				<input
					className="mt-1 mb-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
								className={clsx({
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

function filterEvents(events: GetMapEventResponse[], searchTerm: string) {
	return events.filter((event) =>
		event.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
}

function sortEvents(events: GetMapEventResponse[], sortOrder: SortOrder) {
	function nameComparator(
		a: GetMapEventResponse,
		b: GetMapEventResponse,
	): number {
		if (a.name < b.name) {
			return -1;
		} else if (a.name > b.name) {
			return 1;
		}

		return 0;
	}

	function dateComparator(
		a: GetMapEventResponse,
		b: GetMapEventResponse,
	): number {
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
	event: GetMapEventResponse;
}

function EventCard(props: EventCardProps) {
	return (
		<Fragment>
			<div className="flex">
				<div>
					<div>{`Name: ${props.event.name}`}</div>
					<div>{`Start: ${FormatDate(props.event.startTime)}`}</div>
					<div>{`End: ${FormatDate(props.event.endTime)}`}</div>
				</div>
				<div className="flex ml-auto h-fit mt-1 mr-5">
					<Image
						className="icon"
						src="/location-dot-icon.svg"
						alt="Edit"
						width={12}
						height={12}
						onClick={(event) => {
							const marker = MarkerMap.get(props.event.id);

							if (MapRef && marker) {
								MapRef.flyTo(marker.getLatLng(), 17);
								marker.openPopup();
								props.onEventLocationSelect?.();
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
			<div>{`Description: ${props.event.description}`}</div>
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
						<Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
