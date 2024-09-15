import { useEvent } from "react-use";
import { fabric } from "fabric";

interface UseHotkeysProps {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
}

export function useHotkeys({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
}: UseHotkeysProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    const isControlKey = e.metaKey || e.ctrlKey;
    const isBackspace = e.key === "Backspace";
    const isUndo = e.key === "z";
    const isRedo = e.key === "y";
    const isSave = e.key === "s";
    const isCopy = e.key === "c";
    const isPaste = e.key === "v";
    const isSelectAll = e.key === "a";

    const isInput =
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement;

    if (isInput) return;

    if (isBackspace) {
      canvas?.remove(...canvas?.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isControlKey && isUndo) {
      // on a mac, undo is cmd + z and redo is cmd + shift + z
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    }

    // on windows, redo is ctrl + y
    if (isControlKey && isRedo) {
      redo();
    }
    if (isControlKey && isSave) {
      save(true);
    }

    if (isControlKey && isCopy) {
      copy();
    }

    if (isControlKey && isPaste) {
      paste();
    }

    if (isControlKey && isSelectAll) {
      canvas?.discardActiveObject();

      const allObjects = canvas?.getObjects().filter((obj) => obj.selectable);
      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjects, {
          canvas: canvas,
        })
      );
      canvas?.requestRenderAll();
    }
    e.preventDefault();
  };

  useEvent("keydown", handleKeyDown);
}
