import { type DetailedHTMLProps, type TextareaHTMLAttributes } from "react";
import { type FieldProps } from "formik/dist/Field";
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
          "block w-full rounded-md border border-gray-300 pl-2 shadow-sm outline-none sm:text-sm",
          {
            "focus:border-2 focus:border-indigo-500": !showError,
            "border-red-500 focus:border-2": showError,
          }
        )}
        style={{
          width: 300,
          height: 80,
        }}
      />
      {/* @ts-expect-error 'ErrorMessage' cannot be used as a JSX component. Related? https://github.com/vercel/next.js/issues/42292 */}
      <ErrorMessage
        name={field.name}
        render={(errorMessage) => (
          <div className="text-red-500">{errorMessage}</div>
        )}
      />
    </>
  );
}
