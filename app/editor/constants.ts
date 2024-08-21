import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";
import { ActiveTool } from "./types";

export const exportMenuItems = [
  {
    label: "JSON",
    description: "Save for later editing",
  },
  {
    label: "PNG",
    description: "Best for sharing on the web",
  },
  {
    label: "JPG",
    description: "Best for printing",
  },
  {
    label: "SVG",
    description: "Best for editing in vector graphics software",
  },
];

export const sidebarItems = [
  {
    icon: LayoutTemplate,
    label: "Design",
    tool: "templates" as ActiveTool,
  },
  {
    icon: ImageIcon,
    label: "Image",
    tool: "images" as ActiveTool,
  },
  {
    icon: Type,
    label: "Text",
    tool: "text" as ActiveTool,
  },
  {
    icon: Shapes,
    label: "Shapes",
    tool: "shapes" as ActiveTool,
  },
  {
    icon: Pencil,
    label: "Draw",
    tool: "draw" as ActiveTool,
  },
  {
    icon: Sparkles,
    label: "AI",
    tool: "ai" as ActiveTool,
  },
  {
    icon: Settings,
    label: "Settings",
    tool: "settings" as ActiveTool,
  },
];
