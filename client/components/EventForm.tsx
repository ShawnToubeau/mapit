import { ErrorMessage, Field, Form, Formik } from "formik";
import { LatLng } from "leaflet";
import { FieldProps } from "formik/dist/Field";
import { FC } from "react";
import { useClient } from "../hooks/use-client";
import { useSWRConfig } from "swr";
import { SwrKeys } from "./EventMap";
import { number, object, string } from "yup";
import { CreateMapEventRequest } from "../gen/map_event_api/v1/map_event_api_pb";
import { MapEventService } from "../gen/map_event_api/v1/map_event_api_connectweb";
import { clsx } from "clsx";

type FormFields = Pick<
	CreateMapEventRequest,
	"name" | "startTime" | "endTime" | "description"
>;

type EditData = {
	eventId: string;
	initialValues: FormFields;
};

const validationSchema = object({
	name: string().required("Required"),
	startTime: number().required("Required"),
	endTime: number().required("Required"),
	description: string().required("Required"),
});

interface EventFormProps {
	latLng: LatLng;
	close: () => void;
	eventData?: EditData;
}

export default function EventForm(props: EventFormProps) {
	const { mutate } = useSWRConfig();
	const client = useClient(MapEventService);

	return (
		<div>
			<div className="text-lg">{`${
				props.eventData ? "Edit" : "New"
			} Event`}</div>
			<Formik<FormFields>
				validateOnBlur
				validateOnMount
				validateOnChange
				initialValues={
					props.eventData?.initialValues ?? {
						name: "",
						startTime: BigInt(0),
						endTime: BigInt(0),
						description: "",
					}
				}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (props.eventData) {
						client
							.updateMapEvent({
								id: props.eventData.eventId,
								name: values.name,
								startTime: values.startTime,
								endTime: values.endTime,
								latitude: props.latLng.lat,
								longitude: props.latLng.lng,
								description: values.description,
							})
							.then(() => {
								setSubmitting(false);
								// re-fetch events shown on the map
								mutate(SwrKeys.EVENT_MARKERS);
								props.close();
							})
							.catch((error) => {
								console.error("error updating map event", error);
							});
					} else {
						client
							.createMapEvent({
								name: values.name,
								startTime: values.startTime,
								endTime: values.endTime,
								latitude: props.latLng.lat,
								longitude: props.latLng.lng,
								description: values.description,
							})
							.then(() => {
								setSubmitting(false);
								// re-fetch events shown on the map
								mutate(SwrKeys.EVENT_MARKERS);
								props.close();
							})
							.catch((error) => {
								console.error("error creating map event", error);
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
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<Field name="name" component={NameInput} />
						<ErrorMessage name="name" component="div" />

						<label
							htmlFor="startTime"
							className="block text-sm font-medium text-gray-700 mt-1"
						>
							Start Time
						</label>
						<Field name="startTime" component={DateTimeInput} />
						<ErrorMessage name="startTime" component="div" />

						<label
							htmlFor="endTime"
							className="block text-sm font-medium text-gray-700 mt-1"
						>
							End Time
						</label>
						<Field name="endTime" component={DateTimeInput} />
						<ErrorMessage name="endTime" component="div" />

						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mt-1"
						>
							Description
						</label>
						<Field
							type="text"
							name="description"
							component={DescriptionInput}
						/>
						<ErrorMessage name="description" component="div" />

						<button
							type="submit"
							disabled={isSubmitting || !isValid || !dirty}
							className={clsx(
								"mt-2 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",
							)}
						>
							{props.eventData ? "Update" : "Create"}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

const NameInput: FC<FieldProps<string>> = ({ field, form }) => {
	return (
		<input
			type="text"
			value={field.value}
			placeholder="Event name"
			onChange={(event) => form.setFieldValue(field.name, event.target.value)}
			className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
	);
};

const DescriptionInput: FC<FieldProps<string>> = ({ field, form }) => {
	return (
		<textarea
			rows={3}
			value={field.value}
			placeholder="Event description"
			onChange={(event) => form.setFieldValue(field.name, event.target.value)}
			className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			style={{
				width: 300,
			}}
		/>
	);
};

const DateTimeInput: FC<FieldProps<bigint>> = ({ field, form }) => {
	return (
		<input
			type="datetime-local"
			className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			// pass undefined so the input displays empty instead of the unix epoch
			value={
				field.value === BigInt(0)
					? undefined
					: unixMilliToDateTimeLocal(Number(field.value))
			}
			onChange={(event) => {
				if (event.target.value.length === 0) {
					form.setFieldValue(field.name, BigInt(0));
				} else {
					form.setFieldValue(
						field.name,
						BigInt(new Date(event.target.value).getTime()),
					);
				}
			}}
		/>
	);
};

function unixMilliToDateTimeLocal(unixMilli: number) {
	const dt = new Date(unixMilli);
	dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
	return dt.toISOString().slice(0, 16);
}
