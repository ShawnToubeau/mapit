import { type Event } from "@prisma/client";
import { api } from "@src/utils/api";
import { clsx } from "clsx";
import { Field, Form, Formik } from "formik";
import { type FieldProps } from "formik/dist/Field";
import { type FormikProps } from "formik/dist/types";
import { type LatLng } from "leaflet";
import { type Session } from "next-auth";
import { useEffect, useRef } from "react";
import { number, object, string } from "yup";
import DateTimeInput from "../../form-inputs/DateTimeInput";
import TextAreaInput from "../../form-inputs/TextAreaInput";
import TextInput from "../../form-inputs/TextInput";

type FormFields = Pick<Event, "name" | "description"> & {
  startTime: number;
  endTime: number;
};

type EditData = {
  eventId: string;
  initialValues: FormFields;
};

const validationSchema = object({
  name: string()
    .max(44, "Name must be no more than 44 characters")
    .required("Required"),
  startTime: number().min(1, "Required"),
  endTime: number().min(1, "Required"),
  description: string()
    .max(1000, "Description must be no more than 1000 characters")
    .required("Required"),
});

interface EventFormProps {
  mapId: string;
  session: Session;
  latLng: LatLng;
  close: () => void;
  eventData?: EditData;
}

export default function EventForm(props: EventFormProps) {
  const ctx = api.useContext();
  const formRef = useRef<FormikProps<FormFields> | null>(null);
  const createMutation = api.eventRouter.create.useMutation();
  const updateMutation = api.eventRouter.updateById.useMutation();

  // a change in the lat/long signifies a new form was opened at the location.
  // because this component doesn't unmount, we must manually reset it
  useEffect(() => {
    if (formRef.current) {
      formRef.current.handleReset();
    }
  }, [props.latLng.lat, props.latLng.lng]);

  return (
    <div>
      <div className="text-lg">{`${
        props.eventData ? "Edit" : "New"
      } Event`}</div>
      <Formik<FormFields>
        innerRef={formRef}
        validateOnBlur
        validateOnChange
        initialValues={
          props.eventData?.initialValues ?? {
            name: "",
            startTime: 0,
            endTime: 0,
            description: "",
          }
        }
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (props.eventData) {
            updateMutation
              .mutateAsync({
                id: props.eventData.eventId,
                name: values.name,
                startTime: new Date(values.startTime),
                endTime: new Date(values.endTime),
                latitude: props.latLng.lat,
                longitude: props.latLng.lng,
                description: values.description,
              })
              .then(async () => {
                setSubmitting(false);
                // re-fetch events shown on the event_map
                await ctx.eventRouter.getByMapId.invalidate({
                  mapId: props.mapId,
                });
                props.close();
              })
              .catch((error) => {
                console.error("error updating event_map event", error);
              });
          } else {
            createMutation
              .mutateAsync({
                parentMapId: props.mapId,
                name: values.name,
                startTime: new Date(values.startTime),
                endTime: new Date(values.endTime),
                latitude: props.latLng.lat,
                longitude: props.latLng.lng,
                description: values.description,
              })
              .then(async () => {
                setSubmitting(false);
                // re-fetch events shown on the event_map
                await ctx.eventRouter.getByMapId.invalidate({
                  mapId: props.mapId,
                });
                props.close();
              })
              .catch((error) => {
                console.error("error creating event_map event", error);
              });
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex flex-col">
            <label
              htmlFor="name"
              className="required block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Field
              name="name"
              render={(fieldProps: FieldProps<string>) => (
                <TextInput
                  {...fieldProps}
                  inputProps={{ placeholder: "Event name" }}
                />
              )}
            />

            <label
              htmlFor="startTime"
              className="required mt-1 block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <Field
              name="startTime"
              render={(fieldProps: FieldProps<number>) => (
                <DateTimeInput {...fieldProps} inputProps={{}} />
              )}
            />

            <label
              htmlFor="endTime"
              className="required mt-1 block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <Field
              name="endTime"
              render={(fieldProps: FieldProps<number>) => (
                <DateTimeInput {...fieldProps} />
              )}
            />

            <label
              htmlFor="description"
              className="required my-1 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Field
              name="description"
              render={(fieldProps: FieldProps<string>) => (
                <TextAreaInput
                  {...fieldProps}
                  inputProps={{ placeholder: "Event description" }}
                />
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className={clsx(
                "mt-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
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
