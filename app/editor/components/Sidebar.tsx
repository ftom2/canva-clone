"use client";

import { SidebarItem } from "./SidebarItem";
import { ActiveTool } from "../types";
import { sidebarItems } from "../constants";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeTool === item.tool}
            onClick={() => onChangeActiveTool(item.tool)}
          />
        ))}
      </ul>
    </aside>
  );
};
