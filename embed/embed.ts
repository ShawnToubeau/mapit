import { EventMapService } from "./gen/event_map_api/v1/event_map_api_connectweb";
import { map, marker, tileLayer } from "leaflet";
import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});
const client = createPromiseClient(EventMapService, transport);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bHJ6eXB3enpsbGVpb3JkY2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NTc3NjMsImV4cCI6MTk5MDMzMzc2M30.Glz3uwex31FoIxEJ00D3ipQy2ZfTLFLYvNWbeFVttrs";
function AnonAuthHeader() {
  const requestHeaders = new Headers();
  requestHeaders.set("Authorization", `Bearer ${token}`);
  return requestHeaders;
}

async function main() {
  const tag = document.getElementById("mapit-script");
  if (!tag) {
    console.error("unable to select mapit script");
    return;
  }
  const mapId = tag.getAttribute("mapId");
  if (!mapId || mapId.length !== 36) {
    console.error("missing or invalid map ID:", mapId);
    return;
  }

  try {
    const res = await client.getEventMap(
      { id: mapId },
      { headers: AnonAuthHeader() }
    );
    console.log(res);
    const mapElement = map("my-custom-map").setView([51.505, -0.09], 13);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      id: "mapbox.streets",
    }).addTo(mapElement);

    res.events.forEach((event) => {
      marker([event.latitude, event.longitude])
        .addTo(mapElement)
        .bindPopup(event.name);
    });
  } catch (error) {
    console.error("error fetching map data", error);
  }
}
void main();
