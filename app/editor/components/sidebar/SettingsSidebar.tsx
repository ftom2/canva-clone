import { cn } from "@/lib/utils";
import { SidebarProps } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./ToolSidebarClose";
import { ColorPicker } from "../ColorPicker";
import { FILL_COLOR } from "../../constants";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SettingsSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const workspace = editor?.getWorkspace();

  const initialWidth = useMemo(
    () => workspace?.width?.toString() ?? "0",
    [workspace]
  );
  const initialHeight = useMemo(
    () => workspace?.height?.toString() ?? "0",
    [workspace]
  );
  const initialBackground = useMemo(
    () => workspace?.fill ?? "#fff",
    [workspace]
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  const onChangeBackground = (color: string) => {
    setBackground(color);
    editor?.changeBackground(color);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editor?.changeSize({ width: +width, height: +height });
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change workspace settings"
      />
      <ScrollArea>
        <form className="p-4 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker
            onChange={onChangeBackground}
            value={background as string}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
