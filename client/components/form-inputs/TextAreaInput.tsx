import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { FieldProps } from "formik/dist/Field";
import { clsx } from "clsx";
import { ErrorMessage } from "formik";

interface TextAreaInputProps extends FieldProps<string> {
	inputProps?: DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>;
}

export default function TextAreaInput({
	field,
	form,
	inputProps,
}: TextAreaInputProps) {
	const showError = !!form.touched[field.name] && !!form.errors[field.name];
	return (
		<>
			<textarea
				{...inputProps}
				value={field.value}
				onBlur={() => form.setFieldTouched(field.name, true)}
				onChange={(event) => form.setFieldValue(field.name, event.target.value)}
				className={clsx(
					"border block w-full rounded-md border-gray-300 shadow-sm sm:text-sm pl-2 outline-none",
					{
						"focus:border-indigo-500 focus:border-2": !showError,
						"border-red-500 focus:border-2": showError,
					},
				)}
				style={{
					width: 300,
					height: 124,
				}}
			/>
			<ErrorMessage
				name={field.name}
				render={(errorMessage) => (
					<div className="text-red-500">{errorMessage}</div>
				)}
			/>
		</>
	);
}
