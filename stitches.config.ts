import { blue, gray, green, red } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const { styled, getCssText, keyframes, theme } = createStitches({
  theme: {
    fonts: {
      system: "system-ui",
    },
    colors: {
      hiContrast: "hsl(206,10%,5%)",
      loContrast: "white",
      ...gray,
      ...blue,
      ...red,
      ...green,
    },
    fontSizes: {
      1: "13px",
      2: "15px",
      3: "17px",
    },
  },
});
