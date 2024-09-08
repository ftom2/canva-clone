import { cn } from "@/lib/utils";
import { SidebarProps } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./ToolSidebarClose";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FONTS } from "../../constants";

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  const selectedFont = editor?.getActiveFontFamily();

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Font"
        description="Change the font of the selected text"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          {FONTS.map((font) => (
            <Button
              key={font}
              className={`w-full text-left text-base py-2 px-4 ${
                selectedFont === font && "bg-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => editor?.changeFontFamily(font)}
              variant="secondary"
              style={{
                fontFamily: font,
              }}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
