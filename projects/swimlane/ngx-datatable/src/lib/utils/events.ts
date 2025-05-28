/**
 * Extracts the position (x, y coordinates) from a MouseEvent or TouchEvent.
 *
 * @param {MouseEvent | TouchEvent} event - The event object from which to extract the position. Can be either a MouseEvent or a TouchEvent.
 * @return {{ x: number, y: number }} An object containing the x and y coordinates of the event relative to the viewport.
 */
export function getPositionFromEvent(event: MouseEvent | TouchEvent): {
  clientX: number;
  clientY: number;
  screenX: number;
  screenY: number;
} {
  return event instanceof MouseEvent ? (event as MouseEvent) : (event.changedTouches[0] as Touch);
}
