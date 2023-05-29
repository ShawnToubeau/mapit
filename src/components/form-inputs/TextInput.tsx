import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import { type FieldProps } from "formik/dist/Field";
import { clsx } from "clsx";
import { ErrorMessage } from "formik";
import { InputHeight } from "../../constants";

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
        style={{
          height: InputHeight,
        }}
        className={clsx(
          "block w-full rounded-md border-gray-300 pl-2 shadow-sm outline-none sm:text-sm",
          {
            "focus:border-2 focus:border-indigo-500": !showError,
            "border-red-500 focus:border-2": showError,
          }
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
