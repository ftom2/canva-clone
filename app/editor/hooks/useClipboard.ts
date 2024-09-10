import { useCallback, useRef } from "react";

export function useClipboard({ canvas }: { canvas?: fabric.Canvas }) {
  const clipboard = useRef<any>();
  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: any) => {
      clipboard.current = cloned;
    });
  }, [canvas]);
  const paste = useCallback(() => {
    if (!clipboard.current) return;
    clipboard.current.clone((cloned: any) => {
      canvas?.discardActiveObject();
      cloned.set({
        left: cloned.left! + 30,
        top: cloned.top! + 30,
        evented: true,
      });
      if (cloned.type === "activeSelection") {
        cloned.canvas = canvas;
        cloned.forEachObject((obj: any) => {
          canvas?.add(obj);
        });
        cloned.setCoords();
      } else {
        canvas?.add(cloned);
      }
      clipboard.current = cloned;
      canvas?.setActiveObject(cloned);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
}
