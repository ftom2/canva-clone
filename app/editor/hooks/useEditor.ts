import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./useAutoResize";
import {
  BuildEditorProps,
  IEditor,
  ICanvas,
  CIRCLE_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
  DIAMOND_OPTIONS,
} from "../types";

function buildEditor({ canvas }: BuildEditorProps): IEditor {
  function getWorkspace() {
    return canvas.getObjects().find((obj) => obj.name === "clip");
  }

  function center(obj: fabric.Object) {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();
    if (!center) return;
    // @ts-ignore
    canvas?._centerObject(obj, center);
  }

  function addToCanvas(obj: fabric.Object) {
    center(obj);
    canvas?.add(obj);
    canvas?.setActiveObject(obj);
  }

  return {
    addCircle() {
      const object = new fabric.Circle(CIRCLE_OPTIONS);
      addToCanvas(object);
    },
    addSoftRectangle() {
      const object = new fabric.Rect({ ...RECTANGLE_OPTIONS, rx: 10, ry: 10 });
      addToCanvas(object);
    },
    addRectangle() {
      const object = new fabric.Rect(RECTANGLE_OPTIONS);
      addToCanvas(object);
    },
    addTriangle() {
      const object = new fabric.Triangle(TRIANGLE_OPTIONS);
      addToCanvas(object);
    },
    addInverseTriangle() {
      const object = new fabric.Triangle({ ...TRIANGLE_OPTIONS, angle: 180 });
      addToCanvas(object);
    },
    addDiamond() {
      const SIZE = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: SIZE / 2, y: 0 },
          { x: SIZE, y: SIZE / 2 },
          { x: SIZE / 2, y: SIZE },
          { x: 0, y: SIZE / 2 },
        ],
        DIAMOND_OPTIONS
      );

      addToCanvas(object);
    },
  };
}

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  useAutoResize({
    canvas,
    container,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ canvas });
    }
    return undefined;
  }, [canvas]);

  fabric.Object.prototype.set({
    cornerColor: "#fff",
    cornerStyle: "circle",
    borderColor: "#3b82f6",
    borderScaleFactor: 1.5,
    transparentCorners: false,
    borderOpacityWhenMoving: 1,
    cornerStrokeColor: "#3b82f6",
  });

  const init = useCallback(({ canvas, container }: ICanvas) => {
    if (canvas && container) {
      const workspace = new fabric.Rect({
        //85% of the container width
        width: 900,
        height: 1200,
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
    editor,
  };
};
