import { ActiveTool, IEditor } from "../types";

import { BsBorderWidth } from "react-icons/bs";
import { ToolbarItem } from "./sidebar/ToolbarItem";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
} from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";
import { cn } from "@/lib/utils";

import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { useMemo } from "react";

interface ToolbarProps {
  editor?: IEditor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
  const selectedFont = editor?.getActiveFontFamily();
  const fontWeight = editor?.getActiveFontWeight();
  const strikeThrough = useMemo(
    () => editor?.getActiveFontStrikeThough(),
    [editor]
  );
  const fontStyle = useMemo(() => editor?.getActiveFontStyle(), [editor]);
  const fontUnderline = useMemo(
    () => editor?.getActiveFontUnderline(),
    [editor]
  );
  const textAlign = useMemo(() => editor?.getActiveTextAlign(), [editor]);
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);

  function toggleBold() {
    editor?.changeFontWeight((fontWeight as number) > 500 ? 500 : 700);
  }

  function toggleStrikeThrough() {
    editor?.changeFontStrikeThrough(!strikeThrough);
  }

  function toggleFontStyle() {
    editor?.changeFontStyle(fontStyle === "italic" ? "normal" : "italic");
  }
  function toggleFontUnderline() {
    editor?.changeFontUnderline(!fontUnderline);
  }

  if (!editor?.selectedObjects.length) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-40 p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-40 p-2 gap-x-2">
      <div className="flex items-center justify-center h-full">
        <ToolbarItem
          activeTool={activeTool}
          onClick={onChangeActiveTool}
          style={{ backgroundColor: fillColor }}
          type="fill"
          label="color"
        />
        {!isText && (
          <>
            <ToolbarItem
              activeTool={activeTool}
              onClick={onChangeActiveTool}
              style={{ borderColor: strokeColor }}
              type="stroke-color"
              label="stroke color"
            />

            <ToolbarItem
              activeTool={activeTool}
              onClick={onChangeActiveTool}
              type="stroke-width"
              label="stroke width"
            >
              <BsBorderWidth className="size-4" />
            </ToolbarItem>
          </>
        )}
        {isText && (
          <div className="flex gap-2">
            <ToolbarItem
              activeTool={activeTool}
              onClick={onChangeActiveTool}
              type="font"
              label="font"
              className="p-2 w-auto justify-start text-left"
            >
              <div className="max-w-[100px] truncate shrink-0">
                {selectedFont}
              </div>
              <ChevronDown className="size-4 shrink-0" />
            </ToolbarItem>
            <ToolbarItem
              onClick={toggleBold}
              label="Bold"
              className={cn(
                "p-2 w-auto justify-start text-left",
                (fontWeight as number) > 500 && "bg-gray-100"
              )}
            >
              <FaBold className="size-4" />
            </ToolbarItem>
            <ToolbarItem
              onClick={toggleStrikeThrough}
              label="Strikethrough"
              className={cn(
                "p-2 w-auto justify-start text-left",
                strikeThrough && "bg-gray-100"
              )}
            >
              <FaStrikethrough className="size-4" />
            </ToolbarItem>
            <ToolbarItem
              onClick={toggleFontStyle}
              label="Italic"
              className={cn(
                "p-2 w-auto justify-start text-left",
                fontStyle === "italic" && "bg-gray-100"
              )}
            >
              <FaItalic className="size-4" />
            </ToolbarItem>
            <ToolbarItem
              onClick={toggleFontUnderline}
              label="Underline"
              className={cn(
                "p-2 w-auto justify-start text-left",
                fontUnderline && "bg-gray-100"
              )}
            >
              <FaUnderline className="size-4" />
            </ToolbarItem>
            <ToolbarItem
              onClick={() => editor?.changeTextAlign("left")}
              label="Align Left"
              className={cn(
                "p-2 w-auto justify-start text-left",
                textAlign === "left" && "bg-gray-100"
              )}
            >
              <AlignLeft className="size-4" />
            </ToolbarItem>
            <ToolbarItem
              onClick={() => editor?.changeTextAlign("center")}
              label="Align Center"
              className={cn(
                "p-2 w-auto justify-start text-left",
                textAlign === "center" && "bg-gray-100"
              )}
            >
              <AlignCenter className="size-4" />
            </ToolbarItem>

            <ToolbarItem
              onClick={() => editor?.changeTextAlign("right")}
              label="Align Right"
              className={cn(
                "p-2 w-auto justify-start text-left",
                textAlign === "right" && "bg-gray-100"
              )}
            >
              <AlignRight className="size-4" />
            </ToolbarItem>
          </div>
        )}
        <ToolbarItem
          onClick={() => editor?.bringForward()}
          label="bring forward"
        >
          <ArrowUp className="size-4" />
        </ToolbarItem>
        <ToolbarItem onClick={() => editor?.sendBackwards()} label="send back">
          <ArrowDown className="size-4" />
        </ToolbarItem>
        <ToolbarItem
          activeTool={activeTool}
          onClick={onChangeActiveTool}
          label="opacity"
          type="opacity"
        >
          <RxTransparencyGrid className="size-4" />
        </ToolbarItem>
      </div>
    </div>
  );
}
