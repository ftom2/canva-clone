import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { ActiveTool, IEditor } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShapeTool } from "./ShapeTool";
import { ToolSidebarClose } from "./ToolSidebarClose";

interface ShapeSidebarProps {
  editor?: IEditor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const shapes = [
    {
      name: "Circle",
      icon: FaCircle,
      onClick: () => editor?.addCircle(),
    },
    {
      name: "Soft Rectangle",
      icon: FaSquare,
      onClick: () => editor?.addSoftRectangle(),
    },
    {
      name: "Rectangle",
      icon: FaSquareFull,
      onClick: () => editor?.addRectangle(),
    },
    {
      name: "Triangle",
      icon: IoTriangle,
      onClick: () => editor?.addTriangle(),
    },
    {
      name: "Inverse Triangle",
      icon: IoTriangle,
      iconClassName: "rotate-180",
      onClick: () => editor?.addInverseTriangle(),
    },
    {
      name: "Diamond",
      icon: FaDiamond,
      onClick: () => editor?.addDiamond(),
    },
  ];

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          {shapes.map(({ name, icon, iconClassName, onClick }) => (
            <ShapeTool
              key={name}
              onClick={onClick}
              icon={icon}
              iconClassName={iconClassName}
            />
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
