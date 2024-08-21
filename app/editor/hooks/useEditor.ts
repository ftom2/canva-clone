import { useCallback, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./useAutoResize";
import { IEditor } from "@/app/types";

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  useAutoResize({
    canvas,
    container,
  });

  fabric.Object.prototype.set({
    cornerColor: "#fff",
    cornerStyle: "circle",
    borderColor: "#3b82f6",
    borderScaleFactor: 1.5,
    transparentCorners: false,
    borderOpacityWhenMoving: 1,
    cornerStrokeColor: "#3b82f6",
  });

  const init = useCallback(({ canvas, container }: IEditor) => {
    if (canvas && container) {
      const workspace = new fabric.Rect({
        //85% of the container width
        width: container.offsetWidth * 0.9,
        height: container.offsetHeight * 0.9,
        fill: "white",
        name: "clip",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      canvas.setWidth(container.offsetWidth);
      canvas.setHeight(container.offsetHeight);

      canvas.add(workspace).centerObject(workspace);
      canvas.clipPath = workspace;

      setCanvas(canvas);
      setContainer(container);

      const test = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "black",
      });
      canvas.add(test).centerObject(test);
      // this will clip the canvas to the workspace, so every object outside the workspace will be clipped
    }
  }, []);
  return {
    init,
  };
};
