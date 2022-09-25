// https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements

import { Selection } from './editor.context';

export function detectIsOverlap(
  selection1: Selection,
  selection2: Selection
): boolean {
  const rect1 = formatSelection(selection1);
  const rect2 = formatSelection(selection2);
  
  return !(rect1.right < rect2.left || 
    rect1.left > rect2.right || 
    rect1.bottom < rect2.top || 
    rect1.top > rect2.bottom);
};

function formatSelection(selection: Selection) {
  return {
    top: selection.y,
    right: selection.x + selection.width,
    bottom: selection.y + selection.height,
    left: selection.x,
  };
}
