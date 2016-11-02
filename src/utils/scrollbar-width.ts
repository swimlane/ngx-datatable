/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 * @return {int} width
 */
export function getScrollBarWidth() {
  let outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  let widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  let inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};

export const scrollbarWidth = getScrollBarWidth();
