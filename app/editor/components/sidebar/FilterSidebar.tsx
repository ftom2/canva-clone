import { cn } from "@/lib/utils";
import { SidebarProps } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./ToolSidebarClose";

import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FILTERS } from "../../constants";

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  const selectedFilter = useMemo(
    () => editor?.getActiveImageFilter() || [],
    [editor]
  )
    .toString()
    .toLowerCase();

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Apply a filter to selected image"
      />
      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              className={`w-full text-left text-base py-6 ${
                selectedFilter === filter && "bg-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => editor?.changeImageFilter(filter)}
              variant="secondary"
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
