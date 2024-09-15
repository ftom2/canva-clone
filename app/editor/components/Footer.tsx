import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { IEditor } from "../types";

interface FooterProps {
  editor?: IEditor;
}
export default function Footer({ editor }: FooterProps) {
  return (
    <footer className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label="Reset" sideOffset={10} side="top">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            editor?.autoZoom();
          }}
          className="h-full"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom In" sideOffset={10} side="top">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            editor?.zoomIn();
          }}
          className="h-full"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom Out" sideOffset={10} side="top">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            editor?.zoomOut();
          }}
          className="h-full"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
}
