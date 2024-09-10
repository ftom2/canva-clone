import { cn } from "@/lib/utils";
import { SidebarProps } from "@/app/editor/types";
import { ToolSidebarHeader } from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./ToolSidebarClose";

import { useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/app/ai/api/use-generate-image";

export const AISidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SidebarProps) => {
  const [prompt, setPrompt] = useState("");
  const { mutateAsync, isPending } = useGenerateImage();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await mutateAsync({ prompt });
    editor?.addImage(data || "");
  };

  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate images using AI" />
      <ScrollArea>
        <form className="p-4 space-y-6" onSubmit={onSubmit}>
          <Textarea
            disabled={isPending}
            value={prompt}
            placeholder="an astronaut riding a horse on mars, hd, dramatic lighting"
            rows={10}
            cols={30}
            minLength={3}
            required
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
