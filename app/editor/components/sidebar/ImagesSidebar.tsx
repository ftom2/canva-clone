import { cn } from "@/lib/utils";
import { SidebarProps } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./ToolSidebarClose";

import { useCallback } from "react";
import { useGetImages } from "@/app/images/hooks/use-get-images";
import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ImagesSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  const { data, isLoading, isError } = useGetImages();

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Upload an image or select one from the library"
      />
      {isLoading && (
        <div className="grid place-items-center w-full h-screen">
          <Loader className="size-8 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="grid place-items-center w-full h-screen">
          <div className="text-red-500 flex flex-col items-center gap-4">
            <AlertTriangle className="size-8" />
            <p className="text-xs ">Failed to fetch images</p>
          </div>
        </div>
      )}
      <ScrollArea>
        <div className="p-4 grid grid-cols-2 gap-2  border-b">
          {data &&
            data.map((image) => (
              <button
                key={image.id}
                className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                onClick={() => editor?.addImage(image.urls.regular)}
              >
                <Image
                  fill
                  src={image.urls.small}
                  alt={image.alt_description as string}
                  className="object-cover"
                />
                <Link
                  href={image.links.html}
                  target="_blank"
                  className="absolute bottom-0 left-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold truncate min-w-0 w-full underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {image.user.name}
                </Link>
              </button>
            ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
