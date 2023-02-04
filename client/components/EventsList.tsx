import { useClient } from "../hooks/use-client";
import { MapEventService } from "../gen/map_event_api/v1/map_event_api_connectweb";
import useSWR from "swr";
import { MapRef, MarkerMap, SwrKeys } from "./EventMap";
import { GetMapEventResponse } from "../gen/map_event_api/v1/map_event_api_pb";
import { Fragment, useState } from "react";
import { clsx } from "clsx";
import FormatDate from "../utils/format-date";
import Image from "next/image";

enum SortOrder {
	ALPHABETICAL_ASCENDING = "alphabetical_ascending",
	ALPHABETICAL_DESCENDING = "alphabetical_descending",
	CHRONOLOGICAL_ASCENDING = "chronological_ascending",
	CHRONOLOGICAL_DESCENDING = "chronological_descending",
}

export default function EventsList() {
	const client = useClient(MapEventService);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState(SortOrder.ALPHABETICAL_ASCENDING);
	const { data } = useSWR(SwrKeys.EVENT_MARKERS, () =>
		client.getAllMapEvents({}).then((res) => {
			return res.events;
		}),
	);

	return (
		<div
			className="grid py-2 px-6 w-1/5"
			style={{
				height: "calc(100vh - 90px)",
				borderTop: "1px solid #e9e9ed",
				gridTemplateRows: "min-content auto",
			}}
		>
			<div>
				<div>{"Org > Project"}</div>
				<div className="text-2xl mt-1">Events</div>
				<input
					className="w-full mt-1"
					placeholder="Search events"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
				<select
					className="w-full mt-2"
					value={sortOrder}
					onChange={(event) => setSortOrder(event.target.value as SortOrder)}
				>
					<option value={SortOrder.ALPHABETICAL_ASCENDING}>
						Alphabetical Asc
					</option>
					<option value={SortOrder.ALPHABETICAL_DESCENDING}>
						Alphabetical Desc
					</option>
					<option value={SortOrder.CHRONOLOGICAL_ASCENDING}>
						Chronological Asc
					</option>
					<option value={SortOrder.CHRONOLOGICAL_DESCENDING}>
						Chronological Desc
					</option>
				</select>
			</div>

			<div className="overflow-auto mt-1">
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
								<EventCard event={event} />
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

interface EventCardProps {
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
