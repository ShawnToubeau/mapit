import { slate } from "@radix-ui/colors";
import * as Toast from "@radix-ui/react-toast";
import { keyframes, styled } from "stitches.config";

const VIEWPORT_PADDING = 25;

export const ToastViewport = styled(Toast.Viewport, {
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  minWidth: 250,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
});

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

export const ToastRoot = styled(Toast.Root, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: 15,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  '&[data-state="open"]': {
    animation: `${slideIn.toString()} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${hide.toString()} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: "translateX(var(--radix-toast-swipe-move-x))",
  },
  '&[data-swipe="cancel"]': {
    transform: "translateX(0)",
    transition: "transform 200ms ease-out",
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut.toString()} 100ms ease-out`,
  },
});

export const ToastTitle = styled(Toast.Title, {
  gridArea: "title",
  marginBottom: 5,
  fontWeight: 500,
  color: slate.slate12,
  fontSize: 15,

  variants: {
    variant: {
      noDescription: {
        marginBottom: 0,
      },
    },
  },
});

export const ToastDescription = styled(Toast.Description, {
  gridArea: "description",
  margin: 0,
  color: slate.slate11,
  fontSize: 13,
  lineHeight: 1.3,
});

export const ToastAction = styled(Toast.Action, {
  gridArea: "action",
});

// const Button = styled('button', {
//   all: 'unset',
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: 4,
//   fontWeight: 500,

//   variants: {
//     size: {
//       small: {
//         fontSize: 12,
//         padding: '0 10px',
//         lineHeight: '25px',
//         height: 25,
//       },
//       large: {
//         fontSize: 15,
//         padding: '0 15px',
//         lineHeight: '35px',
//         height: 35,
//       },
//     },
//     variant: {
//       violet: {
//         backgroundColor: 'white',
//         color: violet.violet11,
//         boxShadow: `0 2px 10px ${blackA.blackA7}`,
//         '&:hover': { backgroundColor: mauve.mauve3 },
//         '&:focus': { boxShadow: `0 0 0 2px black` },
//       },
//       green: {
//         backgroundColor: green.green2,
//         color: green.green11,
//         boxShadow: `inset 0 0 0 1px ${green.green7}`,
//         '&:hover': { boxShadow: `inset 0 0 0 1px ${green.green8}` },
//         '&:focus': { boxShadow: `0 0 0 2px ${green.green8}` },
//       },
//     },
//   },

//   defaultVariants: {
//     size: 'large',
//     variant: 'violet',
//   },
// });
