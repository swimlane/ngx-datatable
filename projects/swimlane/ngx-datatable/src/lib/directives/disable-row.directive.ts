import { booleanAttribute, Directive, effect, ElementRef, inject, input } from '@angular/core';

/**
 * Row Disable Directive
 * Use this to disable/enable all children elements
 * Usage:
 *  To disable
 * 		<div [disabled]="true" disable-row >
 * 		</div>
 *  To enable
 *  	<div [disabled]="false" disable-row >
 * 		</div>
 */
@Directive({
  selector: '[disable-row]'
})
export class DisableRowDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly disabled = input(false, {
    transform: booleanAttribute
  });

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.disableAllElements();
      }
    });
  }

  private disableAllElements() {
    const hostElement = this.elementRef?.nativeElement;
    if (!hostElement) {
      return;
    }
    Array.from(hostElement.querySelectorAll<HTMLElement>('*')).forEach(child => {
      child.setAttribute('disabled', '');
    });
  }
}
