import { booleanAttribute, Directive, ElementRef, inject, Input } from '@angular/core';

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
  selector: '[disable-row]',
  standalone: true
})
export class DisableRowDirective {
  private element = inject(ElementRef);
  private _disabled = false;
  @Input({ transform: booleanAttribute }) set disabled(val: boolean) {
    this._disabled = val;
    if (val) {
      this.disableAllElements();
    }
  }

  get disabled() {
    return this._disabled;
  }

  disableAllElements() {
    const el = this.element?.nativeElement;
    if (!el) {
      return;
    }
    Array.from(el.querySelectorAll('*') as HTMLAllCollection).forEach(child => {
      child?.setAttribute('disabled', '');
    });
  }
}
