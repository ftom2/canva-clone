import { useCallback } from "react";
import { fabric } from "fabric";

export const useEditor = () => {
  fabric.Object.prototype.set({
    cornerColor: "#fff",
    cornerStyle: "circle",
    borderColor: "#3b82f6",
    borderScaleFactor: 1.5,
    transparentCorners: false,
    borderOpacityWhenMoving: 1,
    cornerStrokeColor: "#3b82f6",
  });

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas?: fabric.Canvas | null;
      initialContainer?: HTMLDivElement | null;
    }) => {
      if (initialCanvas && initialContainer) {
        const workspace = new fabric.Rect({
          width: 900,
          height: 1200,
          fill: "white",
          selectable: false,
          hasControls: false,
          shadow: new fabric.Shadow({
            color: "rgba(0,0,0,0.8)",
            blur: 5,
          }),
        });
        const test = new fabric.Rect({
          width: 100,
          height: 100,
          fill: "black",
        });

        initialCanvas.setWidth(initialContainer.offsetWidth);
        initialCanvas.setHeight(initialContainer.offsetHeight);

        initialCanvas.add(workspace).centerObject(workspace);
        initialCanvas.add(test).centerObject(test);
        // this will clip the canvas to the workspace, so every object outside the workspace will be clipped
        initialCanvas.clipPath = workspace;
      }
    },
    []
  );
  return {
    init,
  };
};
