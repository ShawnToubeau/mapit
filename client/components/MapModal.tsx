import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	CreateEventMapRequest,
	GetEventMapResponse,
} from "../gen/event_map_api/v1/event_map_api_pb";
import { object, string } from "yup";
import { Session } from "@supabase/auth-helpers-react";
import { useSWRConfig } from "swr";
import { useClient } from "../hooks/use-client";
import { EventMapService } from "../gen/event_map_api/v1/event_map_api_connectweb";
import { Field, Form, Formik } from "formik";
import GenerateAuthHeader from "../utils/generate-auth-header";
import { SwrKeys } from "../constants";
import { FieldProps } from "formik/dist/Field";
import TextInput from "./form-inputs/TextInput";
import Highlight, { defaultProps } from "prism-react-renderer";
import { clsx } from "clsx";

export enum MapModalMode {
	CREATE = "create",
	EDIT = "edit",
	DELETE = "delete",
	EMBED = "embed",
}

function MapModalModeToString(modalMode: MapModalMode) {
	switch (modalMode) {
		case MapModalMode.CREATE:
			return "Create";
		case MapModalMode.EDIT:
			return "Edit";
		case MapModalMode.DELETE:
			return "Delete";
		case MapModalMode.EMBED:
			return "Embed";
	}
}

export type MapModalData = {
	modalMode: MapModalMode;
	mapData: GetEventMapResponse | null;
};

export interface MapModalProps {
	onClose: () => void;
	session: Session;
	modalData: MapModalData | null;
}

export default function MapModal(props: MapModalProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (props.modalData) {
			setOpen(true);
		}
	}, [props.modalData]);

	function handleClose() {
		setOpen(false);
		// delay closing further to avoid UI race conditions
		setTimeout(() => {
			props.onClose();
		}, 300);
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={handleClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel
								className={clsx(
									"relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:p-6",
									{
										"sm:max-w-lg":
											props.modalData?.modalMode !== MapModalMode.EMBED,
										"sm:max-w-3xl":
											props.modalData?.modalMode === MapModalMode.EMBED,
									},
								)}
							>
								<div className="absolute top-0 right-0 pt-4 pr-4 block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										onClick={handleClose}
									>
										<span className="sr-only">Close</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
								<div
									className="sm:flex flex-col sm:items-start"
									style={{
										// 90% of the view height minus the vertical padding of the modal
										maxHeight: "calc(90vh - 48px)",
									}}
								>
									<div className="mt-0 text-center sm:text-left">
										<Dialog.Title
											as="h2"
											className="text-2xl font-medium leading-6 text-gray-900"
										>
											{`${
												props.modalData &&
												MapModalModeToString(props.modalData.modalMode)
											} Map`}
										</Dialog.Title>
									</div>

									<div className="mt-2 w-full overflow-y-auto">
										{renderModalContent({ ...props, onClose: handleClose })}
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

function renderModalContent(props: MapModalProps) {
	if (!props.modalData) {
		return null;
	}

	switch (props.modalData.modalMode) {
		case MapModalMode.CREATE:
			return (
				<MapForm
					session={props.session}
					onClose={props.onClose}
					mapData={null}
				/>
			);
		case MapModalMode.EDIT:
			if (!props.modalData.mapData) {
				throw new Error("error rendering map edit ui, map is null");
			}

			return (
				<MapForm
					session={props.session}
					onClose={props.onClose}
					mapData={{
						mapId: props.modalData.mapData.id,
						initialValues: {
							name: props.modalData.mapData.name,
						},
					}}
				/>
			);
		case MapModalMode.DELETE:
			if (!props.modalData.mapData) {
				throw new Error("error rendering map delete ui, map is null");
			}

			return (
				<MapDeletePrompt
					map={props.modalData.mapData}
					session={props.session}
					close={props.onClose}
				/>
			);
		case MapModalMode.EMBED:
			if (!props.modalData.mapData) {
				throw new Error("error rendering map embed ui, map is null");
			}

			return (
				<MapEmbedPrompt map={props.modalData.mapData} close={props.onClose} />
			);
	}
}

const validationSchema = object({
	name: string()
		.max(42, "Name must be no more than 42 characters")
		.required("Required"),
});

type FormFields = Pick<CreateEventMapRequest, "name">;

export type MapFormData = {
	mapId: string;
	initialValues: FormFields;
};

interface MapFormProps extends Pick<MapModalProps, "onClose"> {
	session: Session;
	mapData: MapFormData | null;
}

function MapForm(props: MapFormProps) {
	const { mutate } = useSWRConfig();
	const client = useClient(EventMapService);

	return (
		<Formik<FormFields>
			validateOnBlur
			validateOnChange
			initialValues={
				props.mapData?.initialValues ?? {
					name: "",
				}
			}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				if (props.mapData) {
					client
						.updateEventMap(
							{
								id: props.mapData.mapId,
								name: values.name,
							},
							{
								headers: GenerateAuthHeader(props.session),
							},
						)
						.then(async () => {
							setSubmitting(false);
							// re-fetch maps
							await mutate(SwrKeys.MAPS);
							props.onClose();
						})
						.catch((error) => {
							console.error("error updating map", error);
						});
				} else {
					client
						.createEventMap(
							{
								name: values.name,
							},
							{
								headers: GenerateAuthHeader(props.session),
							},
						)
						.then(async () => {
							setSubmitting(false);
							// re-fetch maps
							await mutate(SwrKeys.MAPS);
							props.onClose();
						})
						.catch((error) => {
							console.error("error creating map", error);
						});
				}
			}}
		>
			{({ isSubmitting, isValid, dirty }) => (
				<Form
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Field
						name="name"
						render={(fieldProps: FieldProps<string>) => (
							<TextInput
								{...fieldProps}
								inputProps={{ placeholder: "Map name" }}
							/>
						)}
					/>

					<div className="mt-5 sm:mt-4 flex flex-row-reverse">
						<button
							type="submit"
							disabled={isSubmitting || !isValid || !dirty}
							className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
						>
							{props.mapData ? "Update" : "Create"}
						</button>
						<button
							type="button"
							className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
							onClick={() => props.onClose()}
						>
							Cancel
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

interface MapDeletePromptProps {
	session: Session;
	map: GetEventMapResponse;
	close: () => void;
}

function MapDeletePrompt(props: MapDeletePromptProps) {
	const { mutate } = useSWRConfig();
	const client = useClient(EventMapService);

	return (
		<div>
			<div className="flex flex-col">
				<div className="text-lg">
					<div className="mr-1 inline-block">
						Are you sure you wish to delete this map?
					</div>
					<div className="font-bold inline-block">{props.map.name}</div>
				</div>
				<div className="flex justify-center gap-2 mt-4">
					<button
						className="w-full inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(event) => {
							event.stopPropagation();
							props.close;
						}}
					>
						Cancel
					</button>
					<button
						className="w-full inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						onClick={() => {
							client
								.deleteEventMap(
									{
										id: props.map.id,
									},
									{
										headers: GenerateAuthHeader(props.session),
									},
								)
								.then(async () => {
									// re-fetch maps
									await mutate(SwrKeys.MAPS);
									props.close();
								})
								.catch((error) => {
									console.error("error deleting map", error);
								});
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

interface MapEmbedPromptProps {
	map: GetEventMapResponse;
	close: () => void;
}

function MapEmbedPrompt(props: MapEmbedPromptProps) {
	const styleCode = `
<link 
	crossorigin=""
	type="text/css"
	rel="stylesheet" 
	href="https://unpkg.com/mapit-embed/dist/index.css" 
	integrity="sha384-fV3LrW2ZpZwopK5DBFqymSO28cvs7SM6v+KAVtHNBpwx7ya1+koVreq6iaLikDo+"
/>
	`;
	const mapElementCode = `
<div 
	id="mapit-embed" 
	style="width: 600px; height: 400px" 
/>
	`;
	const jsCode = `	
<script 
	type="module"
	id="mapit-script" 
	crossorigin="anonymous"
	mapId="${props.map.id}" 
	src="https://unpkg.com/mapit-embed/dist/index.js" 
	integrity="sha384-SLUGmUhnMsIjCMK3AM4hQhxuvkSHr0Fs2oK76OMzJRQdTB9itqVXd5RmCu3Zdzkb"
/>
	`;

	return (
		<div>
			<div className="mt-2 mb-1 flex">
				{"Insert this anywhere within your"}
				<div className="font-bold mx-1">{"<head> ... </head>"}</div>
				{"tags."}
			</div>
			<Highlight {...defaultProps} code={styleCode} language="jsx">
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre className={clsx(className, "overflow-x-auto")} style={style}>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token, key })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
			<div className="mt-2 mb-1 flex">
				{"Insert this anywhere within your"}
				<div className="font-bold mx-1">{"<body> ... </body>"}</div>
				{"tags."}
			</div>
			<Highlight {...defaultProps} code={mapElementCode} language="jsx">
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre className={clsx(className, "overflow-x-auto")} style={style}>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token, key })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
			<div className="mt-2 mb-1 flex">
				{"Insert this after your closed"}
				<div className="font-bold mx-1">{"</body>"}</div>
				{"tag."}
			</div>
			<Highlight {...defaultProps} code={jsCode} language="jsx">
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre className={clsx(className, "overflow-x-auto")} style={style}>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token, key })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
	);
}
