"use client";
import { fabric } from "fabric";
import { useEditor } from "../hooks/useEditor";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./navbar/Navbar";
import { Sidebar } from "./sidebar/Sidebar";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { ActiveTool } from "../types";
import { ShapeSidebar } from "./sidebar/ShapeSidebar";

type Props = {};
export default function Editor({}: Props) {
  const { init } = useEditor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) return setActiveTool("select");

      if (tool === "draw") {
        // TODO: enable draw tool
      }

      if (activeTool === "draw") {
        // TODO: disable draw tool
      }
      setActiveTool(tool);
    },
    [activeTool]
  );

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      //this will make sure that even though we are clipping the canvas, we can still interact with the objects outside the workspace
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      canvas,
      container: containerRef.current,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);
  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            ref={containerRef}
            className="h-[calc(100%-124px)] flex-1 bg-gray-100"
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
