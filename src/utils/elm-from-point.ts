if (typeof document !== 'undefined' && !document.elementsFromPoint) {
  document.elementsFromPoint = elementsFromPoint;
}

/*tslint:disable*/
/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 */

// Credits to https://github.com/jfkhoury/elementsFromPoint
// get all elements via getBoundingClientRect
// x and y should be passed event.clientX and event.clientY in case of Internet Explorer

export function elementsFromPoint(x: number, y: number) {
  const elements = [];
  let context = document.querySelector("ngx-datatable");
  let selector = "*";

  const children = selector ? context.querySelectorAll(selector) : context.children;

  function hasElCollidedWithCoord(pos: any) {
      return pos.left <= x && x <= pos.right && pos.top <= y && y <= pos.bottom;
  }

  for (let i = 0, l = children.length; i < l; i++) {
      const pos = children[i].getBoundingClientRect();
      if (hasElCollidedWithCoord(pos)) {
          elements.push(children[i]);
      }
  }

  return elements;
};
/*tslint:enable*/
