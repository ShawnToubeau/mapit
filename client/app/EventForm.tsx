"use client";

import { CreateMapEventRequest } from "../map_api/v1/map_api_pb";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { LatLng } from "leaflet";
import { FieldProps } from "formik/dist/Field";
import { FC } from "react";
import { MapEventService } from "../map_api/v1/map_api_connectweb";
import { useClient } from "../hooks/use-client";

const ValidationSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	startTime: Yup.number().required("Required"),
	endTime: Yup.number().required("Required"),
	latitude: Yup.number().required("Required"),
	longitude: Yup.number().required("Required"),
	description: Yup.string().required("Required"),
});

interface EventFormProps {
	latLng: LatLng;
	close: () => void;
}

export default function EventForm(props: EventFormProps) {
	const client = useClient(MapEventService);
	return (
		<div>
			<Formik<Partial<CreateMapEventRequest>>
				validateOnBlur
				validateOnMount
				validateOnChange
				initialValues={{
					latitude: props.latLng.lat,
					longitude: props.latLng.lng,
				}}
				validationSchema={ValidationSchema}
				onSubmit={(values, { setSubmitting }) => {
					client
						.createMapEvent({
							name: values.name,
							startTime: values.startTime,
							endTime: values.endTime,
							latitude: values.latitude,
							longitude: values.longitude,
							description: values.description,
						})
						.then(() => {
							setSubmitting(false);
							props.close();
						})
						.catch((error) => {
							console.error("Error creating map event", error);
						});
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
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

const DateTimeInput: FC<FieldProps<bigint | undefined>> = ({ field, form }) => {
	return (
		<input
			type="datetime-local"
			value={
				field.value ? unixMilliToDateTimeLocal(Number(field.value)) : undefined
			}
			onChange={(event) => {
				// set value to undefined when the input is cleared
				if (event.target.value.length === 0) {
					form.setFieldValue(field.name, undefined);
				} else {
					form.setFieldValue(
						field.name,
						new Date(event.target.value).getTime(),
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
