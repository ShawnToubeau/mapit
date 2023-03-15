import { EventMapService } from "./gen/event_map_api/v1/event_map_api_connectweb";
import {
  map,
  marker,
  tileLayer,
  circle,
  icon,
  Icon,
  control,
  type Marker,
  type Circle,
} from "leaflet";
import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { locate } from "./MapControls/Control.Locate";
import "leaflet/dist/leaflet.css";
import "./index.css";
// @ts-expect-error - "cannot find module"
import iconUrl from "leaflet/dist/images/marker-icon.png";
// @ts-expect-error - "cannot find module"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// @ts-expect-error - "cannot find module"
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
// @ts-expect-error - "cannot find module"
import { SUPABASE_ANON_KEY, BACKEND_URL } from "env";

// needed to properly load the images in the Leaflet CSS - https://github.com/simon04/leaflet-esbuild/blob/master/index.js
Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

let userMarker: Marker | null = null;
let userMarkerArea: Circle | null = null;

async function main(): Promise<void> {
  const tag = document.getElementById("mapit-script");
  if (tag == null) {
    console.error("unable to select mapit script tag");
    return;
  }
  const mapId = tag.getAttribute("mapId");
  if (mapId === null || mapId.length !== 36) {
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
          Authorization: `Bearer ${SUPABASE_ANON_KEY as string}`,
        }),
      }
    );

    const mapElement = map("mapit-embed");
    // start by marking the user's location
    mapElement.locate();
    mapElement.on("locationfound", (event) => {
      if (userMarker != null && userMarkerArea != null) {
        userMarker.setLatLng(event.latlng);
        userMarkerArea.setLatLng(event.latlng);
      } else {
        userMarker = marker(event.latlng, {
          icon: icon({
            iconUrl: "./public/circle-icon.svg",
            iconSize: [22, 22],
          }),
        });
        userMarkerArea = circle(event.latlng, {
          radius: event.accuracy,
        });
        userMarker.addTo(mapElement);
        userMarkerArea.addTo(mapElement);
      }
    });

    // add map controls
    control
      .scale({
        position: "bottomleft",
      })
      .addTo(mapElement);
    locate({
      position: "bottomright",
    }).addTo(mapElement);

    // if the map has events, fit to the bounding box of them
    if (res.boundingBox != null) {
      mapElement.fitBounds([
        [res.boundingBox.northEastLatitude, res.boundingBox.northEastLongitude],
        [res.boundingBox.southWestLatitude, res.boundingBox.southWestLongitude],
      ]);
    } else {
      // otherwise, go to the user's location
      mapElement.locate({
        setView: true,
        maxZoom: 16,
      });
    }

    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      id: "mapbox.streets",
    }).addTo(mapElement);

    res.events.forEach((event) => {
      marker([event.latitude, event.longitude]).addTo(mapElement).bindPopup(`
        <div>
          <h3 class="event-marker-title">${event.name}</h3>
          <div>
              <b class="event-marker-label">Start</b>
              ${new Date(Number(event.startTime)).toLocaleString()}
          </div>
          <div>
              <b class="event-marker-label">End</b>
              ${new Date(Number(event.endTime)).toLocaleString()}
          </div>
          <b class="event-marker-label">About</b>
          <div class="event-marker-description">${event.description}</div>
        </div>
      `);
    });
  } catch (error) {
    console.error("error fetching map data from mapit server", error);
  }
}
void main();
