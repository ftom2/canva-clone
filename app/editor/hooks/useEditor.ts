import { copy } from "./../../../node_modules/effect/src/Array";
import { FilterType } from "./../types";
import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./useAutoResize";
import { BuildEditorProps, IEditor, ICanvas, FontStyle } from "../types";
import {
  CIRCLE_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
  STROKE_DASH_ARRAY,
  TEXT_OPTIONS,
  FONT_FAMILY,
  FONT_WEIGHT,
  FONT_SIZE,
} from "../constants";
import useCanvasEvents from "./useCanvasEvents";
import { createFilter, isTextType } from "../utils";
import { useClipboard } from "./useClipboard";

function buildEditor({
  autoZoom,
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  strokeDashArray,
  setStrokeDashArray,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  selectedObjects,
  setOpacity,
  fontFamily,
  setFontFamily,
  fontWeight,
  setFontWeight,
  strikeThrough,
  setStrikeThrough,
  fontStyle,
  setFontStyle,
  fontUnderline,
  setFontUnderline,
  textAlign,
  setTextAlign,
  fontSize,
  setFontSize,
  imageFilter,
  setImageFilter,
  copy,
  paste,
}: BuildEditorProps): IEditor {
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

  const SHARED_SVG_PROPS = {
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeDashArray: strokeDashArray,
  };

  return {
    getWorkspace,
    changeSize(value: { width: number; height: number }) {
      const workspace = getWorkspace();
      if (workspace) {
        workspace.set(value);
        autoZoom();

        //TODO: save
      }
    },
    changeBackground(value: string) {
      const workspace = getWorkspace();
      if (workspace) {
        workspace.set({ fill: value });
        canvas.requestRenderAll();
        //TODO: save
      }
    },
    enableDrawingMode() {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.freeDrawingBrush.color = strokeColor;
    },
    disableDrawingMode() {
      canvas.isDrawingMode = false;
    },
    onCopy() {
      copy();
    },
    onPaste() {
      paste();
    },
    addImage(value: string) {
      fabric.Image.fromURL(
        value,
        (image) => {
          const workspace = getWorkspace();

          image.scaleToWidth(workspace?.width ?? 0);
          image.scaleToHeight(workspace?.height ?? 0);
          image.crossOrigin = "anonymous";
          addToCanvas(image);
        },
        {
          crossOrigin: "anonymous",
        }
      );
    },
    delete() {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    },
    changeImageFilter(value: FilterType) {
      setImageFilter(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (obj.type === "image") {
          const imageObj = obj as fabric.Image;
          const filter = createFilter(value);
          imageObj.filters = filter ? [filter] : [];
          imageObj.applyFilters();
          canvas.requestRenderAll();
        }
      });
      canvas.requestRenderAll();
    },
    getActiveImageFilter() {
      const selectedObject = selectedObjects[0];
      if (selectedObject?.type === "image") {
        const imageObject = selectedObject as fabric.Image;
        const filter = imageObject.filters?.[0];

        return (filter as any)?.type ?? "none";
      }
      return "none";
    },
    changeFontSize(value: number) {
      setFontSize(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          (obj as fabric.Textbox).set({ fontSize: value });
        }
      });
      canvas.requestRenderAll();
    },
    getActiveFontSize() {
      const selectedObject = selectedObjects[0] as fabric.Textbox;
      return selectedObject?.fontSize ?? fontSize;
    },
    changeTextAlign(value) {
      setTextAlign(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          (obj as fabric.Textbox).set({ textAlign: value });
        }
      });
      canvas.requestRenderAll();
    },
    getActiveTextAlign() {
      const selectedObject = selectedObjects[0] as fabric.Textbox;
      return selectedObject?.textAlign ?? textAlign;
    },
    changeFontUnderline() {
      setFontUnderline(!fontUnderline);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          const text = obj as fabric.Textbox;
          text.set({ underline: !text.underline });
        }
      });
      canvas.requestRenderAll();
    },
    getActiveFontUnderline() {
      const selectedObject = selectedObjects[0] as fabric.Textbox;
      return selectedObject?.underline ?? fontUnderline;
    },
    changeFontStyle(value) {
      setFontStyle(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          (obj as fabric.Textbox).set({ fontStyle: value });
        }
      });
      canvas.requestRenderAll();
    },
    getActiveFontStyle() {
      const selectedObject = selectedObjects[0] as fabric.Textbox;
      return selectedObject?.fontStyle ?? (fontStyle as FontStyle);
    },
    changeFontStrikeThrough() {
      setStrikeThrough(!strikeThrough);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          const text = obj as fabric.Textbox;
          text.set({ linethrough: !text.linethrough });
        }
      });
      canvas.requestRenderAll();
    },
    getActiveFontStrikeThough() {
      const selectedObject = selectedObjects[0] as fabric.Textbox;
      return selectedObject?.linethrough ?? strikeThrough;
    },
    changeFontWeight(value: number) {
      setFontWeight(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          (obj as fabric.Textbox).set({ fontWeight: value });
        }
      });
      canvas.requestRenderAll();
    },
    getActiveFontWeight() {
      const selectedObject = selectedObjects[0] as fabric.Textbox;
      return (selectedObject?.fontWeight as number) ?? fontWeight;
    },
    changeFontFamily(value: string) {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          (obj as fabric.Textbox).set({ fontFamily: value });
        }
      });
      canvas.requestRenderAll();
    },
    getActiveFontFamily() {
      const selectedObject = selectedObjects[0];
      return (selectedObject as fabric.Textbox)?.fontFamily ?? fontFamily;
    },
    addText(text: string, options?: fabric.ITextOptions) {
      const object = new fabric.Textbox(text, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });
      addToCanvas(object);
    },
    changeOpacity(value: number) {
      setOpacity(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ opacity: value });
      });
      canvas.requestRenderAll();
    },
    getActiveOpacity() {
      const selectedObject = selectedObjects[0];
      return selectedObject?.opacity ?? 1;
    },
    bringForward() {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.bringForward(obj);
      });
      canvas.requestRenderAll();
    },
    sendBackwards() {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.sendBackwards(obj);
      });
      canvas.requestRenderAll();
      // prevent the object being placed behind the workspace
      getWorkspace()?.sendToBack();
    },
    changeFillColor(value: string) {
      setFillColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ fill: value });
      });
      canvas.requestRenderAll();
    },
    changeStrokeColor(value: string) {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          obj.set({ fill: value });
          return;
        }
        obj.set({ stroke: value });
      });
      canvas.freeDrawingBrush.color = value;
      canvas.requestRenderAll();
    },
    changeStrokeWidth(value: number) {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeWidth: value });
      });
      canvas.freeDrawingBrush.width = value;

      canvas.requestRenderAll();
    },
    changeStrokeDashArray(value: number[]) {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeDashArray: value });
      });

      canvas.requestRenderAll();
    },
    addCircle() {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        ...SHARED_SVG_PROPS,
      });
      addToCanvas(object);
    },
    addSoftRectangle() {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10,
        ...SHARED_SVG_PROPS,
      });
      addToCanvas(object);
    },
    addRectangle() {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        ...SHARED_SVG_PROPS,
      });
      addToCanvas(object);
    },
    addTriangle() {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        ...SHARED_SVG_PROPS,
      });
      addToCanvas(object);
    },
    addInverseTriangle() {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        angle: 180,
        ...SHARED_SVG_PROPS,
      });
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
        {
          ...DIAMOND_OPTIONS,
          ...SHARED_SVG_PROPS,
        }
      );

      addToCanvas(object);
    },
    getActiveFillColor() {
      const selectedObject = selectedObjects[0];
      const value = selectedObject?.get("fill") ?? fillColor;
      // Gradients and patterns are not supported, so we know that value will be a string
      return value as string;
    },
    getActiveStrokeColor() {
      const selectedObject = selectedObjects[0];
      const value = selectedObject?.stroke ?? strokeColor;

      return value as string;
    },
    getActiveStrokeWidth() {
      const selectedObject = selectedObjects[0];
      const value = selectedObject?.strokeWidth ?? strokeWidth;

      return value;
    },
    getActiveStrokeDashArray() {
      const selectedObject = selectedObjects[0];
      const value = selectedObject?.strokeDashArray ?? strokeDashArray;

      return value;
    },
    canvas,
    selectedObjects,
  };
}

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [, setOpacity] = useState<number>(1);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);
  const [fontFamily, setFontFamily] = useState<string>(FONT_FAMILY);
  const [fontWeight, setFontWeight] = useState<number>(FONT_WEIGHT);
  const [strikeThrough, setStrikeThrough] = useState(false);
  const [fontUnderline, setFontUnderline] = useState(false);
  const [fontStyle, setFontStyle] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");
  const [fontSize, setFontSize] = useState(FONT_SIZE);
  const [imageFilter, setImageFilter] = useState<FilterType>("none");

  const { copy, paste } = useClipboard({ canvas: canvas ?? undefined });
  const { autoZoom } = useAutoResize({
    canvas: canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    container,
    setSelectedObjects,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        autoZoom,
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
        setOpacity,
        fontFamily,
        setFontFamily,
        fontWeight,
        setFontWeight,
        strikeThrough,
        setStrikeThrough,
        fontStyle,
        setFontStyle,
        fontUnderline,
        setFontUnderline,
        textAlign,
        setTextAlign,
        fontSize,
        setFontSize,
        imageFilter,
        setImageFilter,
        copy,
        paste,
      });
    }
    return undefined;
  }, [
    canvas,
    autoZoom,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    fontFamily,
    fontWeight,
    strikeThrough,
    fontStyle,
    fontUnderline,
    textAlign,
    fontSize,
    imageFilter,
    copy,
    paste,
  ]);

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
      // this will clip the canvas to the workspace, so every object outside the workspace will be clipped
      canvas.clipPath = workspace;

      setCanvas(canvas);
      setContainer(container);
    }
  }, []);
  return {
    init,
    editor,
  };
};
