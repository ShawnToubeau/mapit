import { type Event } from "@prisma/client";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

import { Input } from "@src/components/simple/Form";
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectViewport,
} from "@src/components/simple/Select";
import { api } from "@src/utils/api";
import { clsx } from "clsx";
import { type Map as LeafletMap } from "leaflet";
import { useMemo, useState } from "react";
import {
  FooterHeight,
  HeaderHeight,
  LargeBreakpoint,
} from "../../../constants";
import useWindowWidth from "../../../hooks/use-window-width";
import { type EventMarker } from "../map/ResponsiveEventMap";
import { EventCard } from "./EventCard";

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
  eventMarkers: Map<string, EventMarker>;
  onEventLocationSelect?: () => void;
}

export default function EventsList(props: EventsListProps) {
  const width = useWindowWidth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(SortOrder.ALPHABETICAL_ASCENDING);
  const { data, isLoading } = api.eventRouter.getByMapId.useQuery({
    mapId: props.mapId,
  });

  // the amount of height we need to subtract to size the event list
  const subtractedListHeight = useMemo(() => {
    if (width > LargeBreakpoint) {
      return HeaderHeight;
    }

    return HeaderHeight + FooterHeight;
  }, [width]);

  return (
    <div
      className="grid border-t border-t-gray-300 px-6"
      style={{
        height: `calc(100dvh - ${subtractedListHeight}px)`,
        gridTemplateRows: "min-content auto",
      }}
    >
      <div>
        <div className="mb-2 pt-1 text-2xl">Events</div>
        <Input
          className="mb-2"
          placeholder="Search events"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <SortOrderDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>

      <div className="mt-2 overflow-auto border-t border-t-gray-300">
        {isLoading ? (
          <div className="mt-8 text-center text-xl text-gray-500">
            <div>Loading events...</div>
          </div>
        ) : null}
        {data &&
          sortEvents(
            filterEvents(data.result.data.events, searchTerm),
            sortOrder
          ).map((event, index) => (
            <div
              key={event.id}
              className={clsx("py-2 pl-4", {
                "mt-2": index > 0, // margin on every card except the first
                "bg-gray-100": index % 2 === 1, // alternating background colors
              })}
            >
              <EventCard {...props} event={event} />
            </div>
          ))}
      </div>
    </div>
  );
}

function filterEvents(events: Event[], searchTerm: string) {
  return events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function sortEvents(events: Event[], sortOrder: SortOrder) {
  function nameComparator(a: Event, b: Event): number {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }

    return 0;
  }

  function dateComparator(a: Event, b: Event): number {
    return a.startTime.getTime() - b.startTime.getTime();
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

interface SortOrderDropdownProps {
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

function SortOrderDropdown(props: SortOrderDropdownProps) {
  return (
    <>
      <Select.Root onValueChange={props.setSortOrder}>
        <div className="flex">
          <SelectTrigger aria-label="Event List Sort Order" width="full">
            <Select.Value>{sortOrderToString(props.sortOrder)}</Select.Value>
            <SelectIcon>
              <ChevronDownIcon />
            </SelectIcon>
          </SelectTrigger>
        </div>
        <Select.Portal>
          <SelectContent>
            <SelectScrollUpButton>
              <ChevronUpIcon />
            </SelectScrollUpButton>
            <SelectViewport>
              {Object.values(SortOrder).map((sortOrderOpt) => (
                <SelectItem key={sortOrderOpt} value={sortOrderOpt}>
                  {sortOrderToString(sortOrderOpt)}
                </SelectItem>
              ))}
            </SelectViewport>
            <SelectScrollDownButton>
              <ChevronDownIcon />
            </SelectScrollDownButton>
          </SelectContent>
        </Select.Portal>
      </Select.Root>
    </>
  );
}
