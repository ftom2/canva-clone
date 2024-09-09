import { AlignCenter, AlignLeft, AlignRight, ChevronDown } from "lucide-react";
import { ToolbarItem } from "./ToolbarItem";
import { NumberInput } from "../NumberInput";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { SidebarProps } from "../../types";
import { useMemo } from "react";

export function ToolbarTextItems({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) {
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

  return (
    <div className="flex gap-2">
      <ToolbarItem
        activeTool={activeTool}
        onClick={onChangeActiveTool}
        type="font"
        label="font"
        className="p-2 w-auto justify-start text-left"
      >
        <div className="max-w-[100px] truncate shrink-0">{selectedFont}</div>
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
      <div>
        <NumberInput
          value={editor?.getActiveFontSize() as number}
          onChange={(value) => editor?.changeFontSize(value)}
        />
      </div>
    </div>
  );
}
