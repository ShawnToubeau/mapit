import { useState, useLayoutEffect } from "react";

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    function handleResize() {
      if (window.innerWidth !== windowWidth) {
        setWindowWidth(window.innerWidth);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
