import { blackA, gray, green, mauve, violet } from "@radix-ui/colors";
import { InputHeight } from "@src/constants";
import { styled } from "stitches.config";

const borderWidth = 2;

export const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,

  "&:disabled": {
    backgroundColor: gray.gray8,
    borderColor: gray.gray10,
    // disables hover style
    pointerEvents: "none",
  },

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
    style: {
      iconOnly: {
        height: InputHeight - borderWidth * 2,
        width: InputHeight - borderWidth * 2,
        padding: 0,
        borderWidth: borderWidth,
        borderStyle: "solid",
        borderColor: gray.gray8,
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});
