import { type Event } from "@prisma/client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon, SewingPinIcon } from "@radix-ui/react-icons";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  IconButton,
} from "@src/components/simple/Dropdown";

import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";

import { type EventMarker } from "@src/components/complex/map/ResponsiveEventMap";
import FormatDate from "../../../utils/format-date";
import { EventMarkerViews } from "../map/map-controls/EventMarkers";

interface EventCardProps {
  event: Event;
  eventMarkers: Map<string, EventMarker>;
  onEventLocationSelect?: () => void;
}

export function EventCard(props: EventCardProps) {
  const [isClamped, setIsClamped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const descRef = useRef<HTMLDivElement | null>(null);

  // checks whether the description's text is clamped. clamped text will have a "show more" button
  useEffect(() => {
    function handleResize() {
      if (descRef && descRef.current) {
        setIsClamped(
          descRef.current.scrollHeight > descRef.current.clientHeight
        );
      }
    }

    // initial check
    handleResize();
    // re-runs check when the window resizes
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [descRef]);

  function goToEvent() {
    const eventMarker = props.eventMarkers.get(props.event.id);
    if (eventMarker) {
      eventMarker.marker.openPopup();
      props.onEventLocationSelect?.();
    } else {
      console.error("marker ref undefined");
    }
  }

  return (
    <>
      <div className="flex justify-between gap-4">
        <div>
          <div>
            <div className="mr-1 inline font-bold">Name:</div>
            <div className="inline">{props.event.name}</div>
          </div>
          <div>
            <div className="mr-1 inline font-bold">Start:</div>
            <div className="inline">{FormatDate(props.event.startTime)}</div>
          </div>
          <div>
            <div className="mr-1 inline font-bold">End:</div>
            <div className="inline">{FormatDate(props.event.endTime)}</div>
          </div>
        </div>
        <div className="mr-1 flex items-start">
          <button
            className="rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={goToEvent}
          >
            <SewingPinIcon height={28} width={28} />
          </button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <IconButton aria-label="Customize options">
                <DotsVerticalIcon />
              </IconButton>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenuContent sideOffset={5} align="start">
                <DropdownMenuItem
                  onClick={() => {
                    goToEvent();
                    const eventMarker = props.eventMarkers.get(props.event.id);
                    if (eventMarker) {
                      eventMarker.setView(EventMarkerViews.EDIT);
                    }
                  }}
                >
                  Edit Event
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    goToEvent();
                    const eventMarker = props.eventMarkers.get(props.event.id);
                    if (eventMarker) {
                      eventMarker.setView(EventMarkerViews.DELETE);
                    }
                  }}
                >
                  Delete Map
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
      <div
        ref={descRef}
        className={clsx({
          "line-clamp-6": isExpanded,
        })}
      >
        <div className="mr-1 inline font-bold">Description:</div>
        <div className="inline">{props.event.description}</div>
      </div>
      {isClamped && (
        <button
          className="mt-1 text-gray-600 hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show more" : "Show less"}
        </button>
      )}
    </>
  );
}
