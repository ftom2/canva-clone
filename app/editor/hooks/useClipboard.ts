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
      // this means the user selected multiple objects
      if (cloned.type === "activeSelection") {
        // since this is a clone of a group, we need to give it the canvas as a context
        cloned.canvas = canvas;
        cloned.forEachObject((obj: any) => {
          canvas?.add(obj);
        });
        cloned.setCoords();
      } else {
        // this means the user selected a single object
        canvas?.add(cloned);
      }
      clipboard.current = cloned;
      canvas?.setActiveObject(cloned);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
}
