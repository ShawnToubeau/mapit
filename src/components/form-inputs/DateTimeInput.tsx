import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import { type FieldProps } from "formik/dist/Field";
import { clsx } from "clsx";
import { ErrorMessage } from "formik";
import { InputHeight } from "../../constants";

interface DateInputProps extends FieldProps<number> {
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

export default function DateTimeInput({
  field,
  form,
  inputProps,
}: DateInputProps) {
  const showError = !!form.touched[field.name] && !!form.errors[field.name];
  return (
    <>
      <input
        {...inputProps}
        type="datetime-local"
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
        // pass undefined so the input displays empty instead of the unix epoch
        value={
          field.value === 0
            ? undefined
            : unixMilliToDateTimeLocal(Number(field.value))
        }
        onBlur={() => form.setFieldTouched(field.name, true)}
        onChange={(event) => {
          if (event.target.value.length === 0) {
            form.setFieldValue(field.name, 0);
          } else {
            form.setFieldValue(
              field.name,
              new Date(event.target.value).getTime()
            );
          }
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

function unixMilliToDateTimeLocal(unixMilli: number) {
  const dt = new Date(unixMilli);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
}
