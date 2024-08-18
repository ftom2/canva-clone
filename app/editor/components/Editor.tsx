"use client";
import { fabric } from "fabric";
import { useEditor } from "../hooks/useEditor";
import { useEffect, useRef } from "react";

type Props = {};
export default function Editor({}: Props) {
  const { init } = useEditor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      //this will make sure that even though we are clipping the canvas, we can still interact with the objects outside the workspace
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current,
    });
  }, [init]);
  return (
    <div className="h-full flex flex-col">
      <div ref={containerRef} className="h-full flex-1 bg-muted">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
