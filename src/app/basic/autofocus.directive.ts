import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

/**
 * Focuses the host element once it is attached to the DOM.
 *
 * The native `autofocus` attribute is only honored once, when the browser
 * first parses the document — it does nothing when an element is created
 * dynamically (e.g. inside an `@if`/`*ngIf` block), which is why the
 * inline-edit demo's input/select never received focus after the first
 * activation.
 *
 * Usage:
 *
 * 		<input autofocus ... />
 *
 */
@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  private element = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }
}
