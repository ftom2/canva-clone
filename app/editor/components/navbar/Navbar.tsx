"use client";
import { useFilePicker } from "use-file-picker";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import NavbarActionItem from "./NavbarActionItem";
import { BsCloudCheck } from "react-icons/bs";
import Dropdown from "@/components/Dropdown";
import NavbarDropdownItem from "./NavbarDropdownItem";
import { SidebarProps } from "../../types";
import { cn } from "@/lib/utils";
import { getNavbarItems } from "../../utils";

export default function Navbar({
  activeTool,
  onChangeActiveTool,
  editor,
}: SidebarProps) {
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (e) => {
          const result = e.target?.result as string;

          editor?.loadJson(result);
        };
      }
    },
  });
  return (
    <div className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-8">
      <Logo />
      <div className="w-full h-full gap-1 flex items-center">
        <Dropdown
          trigger={
            <Button size="sm" variant="ghost" className="gap-2">
              File
              <ChevronDown size={16} />
            </Button>
          }
        >
          <NavbarDropdownItem
            item={{
              label: "Open",
              description: "Open a JSON file",
              onClick: openFilePicker,
            }}
          />
        </Dropdown>

        <Separator orientation="vertical" className="mx-2" />
        <NavbarActionItem
          label="Select"
          icon={<MousePointerClick size={16} />}
          onClick={() => onChangeActiveTool("select")}
          className={cn(activeTool === "select" && "bg-gray-100")}
        />
        <NavbarActionItem
          disabled={!editor?.canUndo()}
          label="Undo"
          icon={<Undo2 size={16} />}
          onClick={() => editor?.onUndo()}
        />
        <NavbarActionItem
          disabled={!editor?.canRedo()}
          label="Redo"
          icon={<Redo2 size={16} />}
          onClick={() => editor?.onRedo()}
        />
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <BsCloudCheck className="size-5" />
          <p className="text-xs">Saved</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Dropdown
            align="end"
            trigger={
              <Button size="sm" variant="ghost" className="gap-2">
                Export
                <Download size={16} />
              </Button>
            }
          >
            {getNavbarItems(editor).map((item) => (
              <NavbarDropdownItem key={item.label} item={item} />
            ))}
          </Dropdown>
          {/* TODO: Add user button */}
        </div>
      </div>
    </div>
  );
}
