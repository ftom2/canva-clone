import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export interface EditorHookProps {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  clearSelectionCallback?: () => void;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
}

export type FontStyle = "" | "normal" | "italic" | "oblique";

export type BuildEditorProps = {
  // undo: () => void;
  // redo: () => void;
  // save: (skip?: boolean) => void;
  // canUndo: () => boolean;
  // canRedo: () => boolean;
  // autoZoom: () => void;
  // copy: () => void;
  // paste: () => void;
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  strikeThrough: boolean;
  fontUnderline: boolean;
  textAlign: string;
  setStrokeDashArray: (value: number[]) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setOpacity: (value: number) => void;
  setFontFamily: (value: string) => void;
  setFontWeight: (value: number) => void;
  setStrikeThrough: (value: boolean) => void;
  setFontStyle: (value: FontStyle) => void;
  setFontUnderline: (value: boolean) => void;
  setTextAlign: (value: string) => void;
};

export interface IEditor {
  // savePng: () => void;
  // saveJpg: () => void;
  // saveSvg: () => void;
  // saveJson: () => void;
  // loadJson: (json: string) => void;
  // onUndo: () => void;
  // onRedo: () => void;
  // canUndo: () => boolean;
  // canRedo: () => boolean;
  // autoZoom: () => void;
  // zoomIn: () => void;
  // zoomOut: () => void;
  // getWorkspace: () => fabric.Object | undefined;
  // changeBackground: (value: string) => void;
  // changeSize: (value: { width: number; height: number }) => void;
  // enableDrawingMode: () => void;
  // disableDrawingMode: () => void;
  // onCopy: () => void;
  // onPaste: () => void;
  // changeImageFilter: (value: string) => void;
  // addImage: (value: string) => void;
  // delete: () => void;
  // changeFontSize: (value: number) => void;
  // getActiveFontSize: () => number;
  changeTextAlign: (value: string) => void;
  getActiveTextAlign: () => string;
  changeFontUnderline: (value: boolean) => void;
  getActiveFontUnderline: () => boolean;
  changeFontStrikeThrough: (value: boolean) => void;
  getActiveFontStrikeThough: () => boolean;
  changeFontStyle: (value: FontStyle) => void;
  getActiveFontStyle: () => FontStyle;
  changeFontWeight: (value: number) => void;
  getActiveFontWeight: () => number;
  getActiveFontFamily: () => string;
  changeFontFamily: (value: string) => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  getActiveOpacity: () => number;
  changeOpacity: (value: number) => void;
  bringForward: () => void;
  sendBackwards: () => void;
  changeStrokeWidth: (value: number) => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;

  canvas: fabric.Canvas;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  selectedObjects: fabric.Object[];
}

export interface ICanvas {
  canvas?: fabric.Canvas | null;
  container?: HTMLDivElement | null;
}

export interface MenuProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export interface SidebarProps {
  editor?: IEditor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
