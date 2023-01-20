'use client';

import {GetMapEventResponse} from "../map_api/v1/map_api_pb";
import {createConnectTransport, createPromiseClient} from "@bufbuild/connect-web";
import {MapEventService} from "../map_api/v1/map_api_connectweb";
import {useEffect, useState} from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
if (backendUrl == undefined) {
    console.error("backend url undefined")
}

// The transport defines what type of endpoint we're hitting.
// In our example we'll be communicating with a Connect endpoint.
const transport = createConnectTransport({
    baseUrl: backendUrl ?? "",
});

// Here we make the client itself, combining the service
// definition with the transport.
const client = createPromiseClient(MapEventService, transport);

export default function EventsList() {
    const [events, setEvents] = useState<GetMapEventResponse[]>([])

    useEffect(() => {
        fetchMapEvents();
    }, [])

    async function fetchMapEvents() {
        const res = await client.getAllMapEvents({});
        setEvents(res.events);
    }

    return (
        <div>
            <ol>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.toJsonString()}
                    </li>
                ))}
            </ol>
        </div>
    )
}