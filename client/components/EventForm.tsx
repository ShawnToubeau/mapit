import { CreateMapEventRequest } from "../map_api/v1/map_api_pb";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LatLng } from "leaflet";
import { FieldProps } from "formik/dist/Field";
import { FC } from "react";
import { MapEventService } from "../map_api/v1/map_api_connectweb";
import { useClient } from "../hooks/use-client";
import { useSWRConfig } from "swr";
import { SwrKeys } from "./Map";
import { number, object, string } from "yup";

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
								console.error("Error updating map event", error);
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
								console.error("Error creating map event", error);
							});
					}
				}}
			>
				{({ isSubmitting, isValid }) => (
					<Form
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<label htmlFor="name">Name</label>
						<Field type="text" name="name" />
						<ErrorMessage name="name" component="div" />

						<label htmlFor="startTime">Start Time</label>
						<Field name="startTime" component={DateTimeInput} />
						<ErrorMessage name="startTime" component="div" />

						<label htmlFor="endTime">End Time</label>
						<Field name="endTime" component={DateTimeInput} />
						<ErrorMessage name="endTime" component="div" />

						<label htmlFor="description">Description</label>
						<Field type="text" name="description" />
						<ErrorMessage name="description" component="div" />

						<button type="submit" disabled={isSubmitting || !isValid}>
							{props.eventData ? "Update" : "Create"}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

const DateTimeInput: FC<FieldProps<bigint>> = ({ field, form }) => {
	return (
		<input
			type="datetime-local"
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
