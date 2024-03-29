import { Control, DomEvent, DomUtil, type Map } from "leaflet";
// @ts-expect-error - "cannot find module"
import crossHairIcon from "../public/crosshair-icon.svg";
import "./Control.Locate.css";

// Locate is a map control that sets the map's view to the user's current location.
export const Locate = Control.extend({
  onAdd(map: Map) {
    const className = "leaflet-control-locate";
    const container = DomUtil.create("div", `${className} leaflet-bar`);
    const button = DomUtil.create("button", className, container);
    button.title = "Locate my position";
    const icon = DomUtil.create("img", undefined, button);
    icon.src = crossHairIcon;
    icon.alt = "Locate Icon";
    icon.ariaHidden = "true";

    // screen readers will read this as "Locate my position - button"
    button.setAttribute("role", "button");
    button.setAttribute("aria-label", button.title);

    DomEvent.disableClickPropagation(button);
    DomEvent.on(button, "click", DomEvent.stop);
    DomEvent.on(
      button,
      "click",
      () => map.locate({ setView: true, maxZoom: 16 }),
      this
    );

    return button;
  },
});

export const locate = function (
  options: Record<string, unknown>
): { onAdd: (map: Map) => HTMLButtonElement } & Control {
  return new Locate(options);
};
