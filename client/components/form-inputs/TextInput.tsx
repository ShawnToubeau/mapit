import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldProps } from "formik/dist/Field";
import { clsx } from "clsx";
import { ErrorMessage } from "formik";

interface TextInputProps extends FieldProps<string> {
	inputProps?: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>;
}

export default function TextInput({ field, form, inputProps }: TextInputProps) {
	const showError = !!form.touched[field.name] && !!form.errors[field.name];
	return (
		<>
			<input
				{...inputProps}
				type="text"
				value={field.value}
				onBlur={() => form.setFieldTouched(field.name, true)}
				onChange={(event) => form.setFieldValue(field.name, event.target.value)}
				className={clsx(
					"block w-full rounded-md border-gray-300 shadow-sm sm:text-sm pl-2 h-8 outline-none",
					{
						"focus:border-indigo-500 focus:border-2": !showError,
						"border-red-500 focus:border-2": showError,
					},
				)}
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
