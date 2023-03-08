import { useClient } from "../../hooks/use-client";
import { EventMapService } from "../../gen/event_map_api/v1/event_map_api_connectweb";
import useSWR from "swr";
import { GetEventMapResponse } from "../../gen/event_map_api/v1/event_map_api_pb";
import { Session } from "@supabase/auth-helpers-react";
import GenerateAuthHeader from "../../utils/generate-auth-header";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { clsx } from "clsx";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { SwrKeys } from "../../constants";
import { MapModalMode } from "../../components/MapModal";
import { useRouter } from "next/navigation";

interface MapListProps {
	session: Session;
	onMapSelect: (eventMap: GetEventMapResponse, action: MapModalMode) => void;
}

export default function MapList(props: MapListProps) {
	const client = useClient(EventMapService);
	const { data, isLoading } = useSWR(SwrKeys.MAPS, () =>
		client
			.getAllEventMaps(
				{
					ownerId: props.session.user.id,
				},
				{ headers: GenerateAuthHeader(props.session) },
			)
			.then((res) => {
				return res.events;
			}),
	);

	if (isLoading) {
		return (
			<div className="text-center text-xl text-gray-500 mt-8">
				<div>Loading maps...</div>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="text-center text-xl text-gray-500 mt-8">
				<div>{"You don't have any maps yet!"}</div>
				<div>{"Click the + icon to get started."}</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
			{sortNameAsc(data).map((eventMap) => (
				<MapCard
					key={eventMap.id}
					eventMap={eventMap}
					onMapSelect={props.onMapSelect}
				/>
			))}
		</div>
	);
}

interface MapCardProps {
	eventMap: GetEventMapResponse;
	onMapSelect: (eventMap: GetEventMapResponse, action: MapModalMode) => void;
}

function MapCard(props: MapCardProps) {
	const router = useRouter();
	const mapUrl = `/map/${props.eventMap.id}`;
	return (
		<div>
			<div
				className="flex flex-col map-control-border px-4 py-4 mx-auto cursor-pointer hover:bg-slate-100 rounded-xl h-full"
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
						<div className="text-3xl">{props.eventMap.name}</div>
						<div className="mt-2 mb-6">{`${
							props.eventMap.numEvents
						} ${pluralize("event", "s", props.eventMap.numEvents)}`}</div>
					</div>

					<div className="flex items-start">
						<Menu as="div" className="relative ml-1 inline-block text-left">
							<div onClick={(e) => e.stopPropagation()}>
								<Menu.Button className="flex items-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-slate-200 p-1">
									<span className="sr-only">Open options</span>
									<EllipsisVerticalIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</Menu.Button>
							</div>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="py-1">
										<Menu.Item>
											{({ active }) => (
												<button
													type="button"
													className={clsx(
														active
															? "bg-gray-100 text-gray-900"
															: "text-gray-700",
														"flex w-full justify-between px-4 py-2 text-sm",
													)}
													onClick={async (event) => {
														event.stopPropagation();
														await navigator.clipboard.writeText(
															`${location.origin}${mapUrl}`,
														);
													}}
												>
													<span>Copy map link</span>
												</button>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													type="button"
													className={clsx(
														active
															? "bg-gray-100 text-gray-900"
															: "text-gray-700",
														"flex w-full justify-between px-4 py-2 text-sm",
													)}
													onClick={(event) => {
														event.stopPropagation();
														props.onMapSelect(
															props.eventMap,
															MapModalMode.EDIT,
														);
													}}
												>
													<span>Edit map</span>
												</button>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													className={clsx(
														active
															? "bg-gray-100 text-gray-900"
															: "text-gray-700",
														"flex w-full justify-between px-4 py-2 text-sm",
													)}
													onClick={(event) => {
														event.stopPropagation();
														props.onMapSelect(
															props.eventMap,
															MapModalMode.DELETE,
														);
													}}
												>
													<span>Delete map</span>
												</button>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>

				<div className="text-right mt-auto text-gray-500">
					Last modified 01/02/2023
				</div>
			</div>
		</div>
	);
}

function sortNameAsc(maps: GetEventMapResponse[]): GetEventMapResponse[] {
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
