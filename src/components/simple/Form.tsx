import { blackA, gray, mauve, red, violet } from "@radix-ui/colors";
import * as Form from "@radix-ui/react-form";
import { InputHeight } from "@src/constants";
import { styled } from "stitches.config";

export const FormRoot = styled(Form.Root, {
  width: 260,
});

export const FormField = styled(Form.Field, {
  display: "grid",
  marginBottom: 10,
});

export const FormLabel = styled(Form.Label, {
  fontSize: 15,
  fontWeight: 500,
  lineHeight: "35px",

  variants: {
    variant: {
      required: {
        "&::after": {
          content: "*",
          marginLeft: 2,
          color: red.red11,
        },
      },
    },
  },
});

export const FormMessage = styled(Form.Message, {
  fontSize: 13,
  opacity: 0.8,
  color: red.red11,
});

const inputStyles = {
  all: "unset",
  boxSizing: "border-box",
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,

  fontSize: 15,
  color: blackA.blackA12,
  backgroundColor: blackA.blackA5,
  boxShadow: `0 0 0 1px ${blackA.blackA9}`,
  "&:hover": { boxShadow: `0 0 0 1px black` },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&::selection": { backgroundColor: blackA.blackA9, color: "white" },
};

export const Input = styled("input", {
  ...inputStyles,
  height: InputHeight,
  lineHeight: 1,
  padding: "0 10px",

  variants: {
    bgColor: {
      gray: {
        backgroundColor: gray.gray1,
      },
    },
  },
});

export const Textarea = styled("textarea", {
  ...inputStyles,
  resize: "none",
  padding: 10,
});

export const Button = styled("button", {
  all: "unset",
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  width: "100%",

  backgroundColor: "white",
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: mauve.mauve3 },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});
