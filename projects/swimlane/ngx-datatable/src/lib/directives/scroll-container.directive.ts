import { Directive, ElementRef, inject } from '@angular/core';

import { ScrollToRowOptions } from '../types/public.types';

/**
 * Marks the `role="table"` css-grid as the single scroll container that owns
 * both the horizontal and vertical scroll. Descendant components (e.g. the
 * scroller) and the datatable interact with the container through these methods
 * instead of reaching for the native element.
 */
@Directive({
  selector: '[datatableScrollContainer]'
})
export class ScrollContainerDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** Current vertical scroll offset of the container. */
  get scrollTop(): number {
    return this.element.scrollTop;
  }

  /** Whether the container's content overflows it vertically. */
  get verticalScrollVisible(): boolean {
    return this.element.scrollHeight > this.element.clientHeight;
  }

  setScrollTop(value: number): void {
    this.element.scrollTop = value;
  }

  scrollTo(top: number, options?: ScrollToRowOptions): void {
    this.element.scrollTo({ top, behavior: options?.behavior });
  }

  /** Subscribes to scroll events, returning a function that unsubscribes. */
  listenToScroll(listener: (event: Event) => void): () => void {
    this.element.addEventListener('scroll', listener, { passive: true });
    return () => this.element.removeEventListener('scroll', listener);
  }
}
