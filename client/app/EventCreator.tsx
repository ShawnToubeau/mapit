"use client";

import { CreateMapEventRequest } from "../map_api/v1/map_api_pb";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	startTime: Yup.number().required("Required"),
	endTime: Yup.number().required("Required"),
	latitude: Yup.number().required("Required"),
	longitude: Yup.number().required("Required"),
	description: Yup.string().required("Required"),
});

export default function EventCreator() {
	return (
		<div>
			<Formik<Partial<CreateMapEventRequest>>
				validateOnBlur
				validateOnMount
				validateOnChange
				initialValues={{}}
				validationSchema={ValidationSchema}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					setSubmitting(false);
				}}
			>
				{({ isSubmitting, isValid }) => (
					<Form>
						<label htmlFor="name">Name</label>
						<Field type="text" name="name" />
						<ErrorMessage name="name" component="div" />

						<label htmlFor="startTime">Start Time</label>
						<Field type="datetime-local" name="startTime" />
						<ErrorMessage name="startTime" component="div" />

						<label htmlFor="endTime">End Time</label>
						<Field type="datetime-local" name="endTime" />
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
