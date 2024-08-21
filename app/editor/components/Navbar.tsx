"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import NavbarActionItem from "./NavbarActionItem";
import { BsCloudCheck } from "react-icons/bs";
import Dropdown from "@/components/Dropdown";
import { exportMenuItems } from "../constants";

type Props = {};
export default function Navbar({}: Props) {
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
          <DropdownMenuItem className="flex items-center gap-2">
            <CiFileOn className="size-8" />
            <div>
              <p>Open</p>
              <p className="text-xs text-muted-foreground">Open a JSON file</p>
            </div>
          </DropdownMenuItem>
        </Dropdown>

        <Separator orientation="vertical" className="mx-2" />
        <NavbarActionItem
          label="Select"
          icon={<MousePointerClick size={16} />}
        />
        <NavbarActionItem label="Undo" icon={<Undo2 size={16} />} />
        <NavbarActionItem label="Redo" icon={<Redo2 size={16} />} />
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
            {exportMenuItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                className="flex items-center gap-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>{item.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </Dropdown>
          {/* TODO: Add user button */}
        </div>
      </div>
    </div>
  );
}
