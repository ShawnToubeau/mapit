import {
  DropdownMenuContent,
  DropdownMenuItem,
  IconButton,
} from "@components/simple/Dropdown";
import { ToastRoot, ToastTitle, ToastViewport } from "@components/simple/Toast";
import { type EventMap } from "@prisma/client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckCircledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { api } from "@src/utils/api";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";
import { theme } from "stitches.config";
import { MapModalMode } from "./MapModal";

type MapWithCount = EventMap & {
  _count: {
    events: number;
  };
};

interface MapListProps {
  session: Session;
  onMapSelect: (
    eventMap: EventMap,
    action: MapModalMode.UPDATE | MapModalMode.DELETE
  ) => void;
}

export default function MapList(props: MapListProps) {
  const { isLoading, data } = api.mapRouter.getByOwnerId.useQuery({
    id: props.session.user.id,
  });

  if (isLoading) {
    return (
      <div className="mt-8 text-center text-xl text-gray-500">
        <div>Loading maps...</div>
      </div>
    );
  }

  if (!data || data.result.data.maps.length === 0) {
    return (
      <div className="mt-8 text-center text-xl text-gray-500">
        <div>{"You don't have any maps yet!"}</div>
        <div>{"Click the + icon to get started."}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {sortNameAsc(data.result.data.maps).map((eventMap) => (
        <MapCard
          key={eventMap.id}
          map={eventMap}
          onMapSelect={props.onMapSelect}
        />
      ))}
    </div>
  );
}

interface MapCardProps {
  map: MapWithCount;
  onMapSelect: (
    eventMap: EventMap,
    action: MapModalMode.UPDATE | MapModalMode.DELETE
  ) => void;
}

function MapCard(props: MapCardProps) {
  const router = useRouter();
  const mapUrl = `/map/${props.map.id}`;
  const [toastOpen, setToastOpen] = React.useState(false);

  return (
    <div>
      <div
        className="map-control-border mx-auto flex h-full cursor-pointer flex-col rounded-xl px-4 py-4 hover:bg-slate-100"
        style={{
          maxWidth: 400,
        }}
        onClick={() => {
          // TODO this doesn't push the map URL to the history stack. need to look into further
          router.push(mapUrl);
        }}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-3xl">{props.map.name}</div>
            <div className="mb-6 mt-2">{`${props.map._count.events} ${pluralize(
              "event",
              "s",
              props.map._count.events
            )}`}</div>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <IconButton aria-label="Customize options">
                <DotsVerticalIcon />
              </IconButton>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenuContent sideOffset={5} align="end">
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    navigator.clipboard
                      .writeText(`${location.origin}${mapUrl}`)
                      .then(() => setToastOpen(true))
                      .catch(console.error);
                  }}
                >
                  Copy Map Link
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    props.onMapSelect(props.map, MapModalMode.UPDATE);
                  }}
                >
                  Edit Map
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    props.onMapSelect(props.map, MapModalMode.DELETE);
                  }}
                >
                  Delete Map
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="mt-auto text-right text-gray-500">
          Last modified 01/02/2023
        </div>
      </div>

      <ToastRoot open={toastOpen} onOpenChange={setToastOpen}>
        <ToastTitle variant="noDescription">Link Copied!</ToastTitle>
        <CheckCircledIcon
          height={20}
          width={20}
          color={theme.colors.green9.toString()}
        />
      </ToastRoot>
      <ToastViewport />
    </div>
  );
}

function sortNameAsc(maps: MapWithCount[]): MapWithCount[] {
  return maps.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }

    return 0;
  });
}

function pluralize(noun: string, pluralEnding: string, count: number): string {
  if (count === 1) {
    return noun;
  }

  return noun + pluralEnding;
}
