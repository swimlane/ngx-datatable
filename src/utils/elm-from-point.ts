if (document !== undefined && !document.elementsFromPoint) {
  document.elementsFromPoint = elementsFromPoint;
}

/*tslint:disable*/
/**
 * Polyfill for `elementsFromPoint`
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 * 
 * @export
 * @param {any} x 
 * @param {any} y 
 * @returns 
 */
export function elementsFromPoint(x: number, y: number) {
  const elements = [];
  const previousPointerEvents = [];
  let current: any;  // TODO: window.getComputedStyle should be used with inferred type (Element)
  let i;
  let d;

  //if (document === undefined) return elements;

  // get all elements via elementFromPoint, and remove them from hit-testing in order
  while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current != null) {

    // push the element and its current style
    elements.push(current);
    previousPointerEvents.push({
      value: current.style.getPropertyValue('pointer-events'),
      priority: current.style.getPropertyPriority('pointer-events')
    });

    // add "pointer-events: none", to get to the underlying element
    current.style.setProperty('pointer-events', 'none', 'important');
  }

  // restore the previous pointer-events values
  for (i = previousPointerEvents.length; d = previousPointerEvents[--i];) {
    elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
  }

  // return our results
  return elements;
}
/*tslint:enable*/
