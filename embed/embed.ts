import { EventMapService } from "./gen/event_map_api/v1/event_map_api_connectweb";
import { map, marker, tileLayer } from "leaflet";
import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
// @ts-ignore - error saying it cannot find the module or declaration
import { SUPABASE_ANON_KEY, BACKEND_URL } from "env";

async function main() {
  const tag = document.getElementById("mapit-script");
  if (!tag) {
    console.error("unable to select mapit script tag");
    return;
  }
  const mapId = tag.getAttribute("mapId");
  if (!mapId || mapId.length !== 36) {
    console.error(
      "script tag missing or has invalid 'mapId' attribute:",
      mapId
    );
    return;
  }

  try {
    const client = createPromiseClient(
      EventMapService,
      createConnectTransport({
        baseUrl: BACKEND_URL,
      })
    );
    const res = await client.getEventMap(
      { id: mapId },
      {
        headers: new Headers({
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        }),
      }
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
    console.error("error fetching map data from mapit server", error);
  }
}
void main();
