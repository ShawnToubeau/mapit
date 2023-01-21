"use client";

import { GetMapEventResponse } from "../map_api/v1/map_api_pb";
import { MapEventService } from "../map_api/v1/map_api_connectweb";
import { useEffect, useState } from "react";
import { useClient } from "../hooks/use-client";

export default function EventsList() {
	const [events, setEvents] = useState<GetMapEventResponse[]>([]);
	const client = useClient(MapEventService);

	useEffect(() => {
		fetchMapEvents();
	}, []);

	async function fetchMapEvents() {
		const res = await client.getAllMapEvents({});
		setEvents(res.events);
	}

	return (
		<div>
			<ol>
				{events.map((event) => (
					<li key={event.id}>{event.toJsonString()}</li>
				))}
			</ol>
		</div>
	);
}
