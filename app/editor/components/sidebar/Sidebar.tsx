"use client";

import { SidebarItem } from "./SidebarItem";
import { MenuProps } from "../../types";
import { sidebarItems } from "../../constants";

export const Sidebar = ({ activeTool, onChangeActiveTool }: MenuProps) => {
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
