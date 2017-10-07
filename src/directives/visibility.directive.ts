import { checkVisibility } from '../utils/visibility-observer';
import {
  Directive, Output, EventEmitter, ElementRef, HostBinding
} from '@angular/core';

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
@Directive({ selector: '[visibilityObserver]' })
export class VisibilityDirective {

  @HostBinding('class.visible') 
  isVisible: boolean | undefined;

  @Output() visible: EventEmitter<boolean> = new EventEmitter();

  constructor(private element: ElementRef) { }

  checkVisibility(): void {
    const { offsetHeight, offsetWidth } = this.element.nativeElement;
    this.onVisibilityChange(offsetHeight > 0 && offsetWidth > 0);
  }

  onVisibilityChange(visible: boolean): void {
    if(visible === this.isVisible) return;
    this.isVisible = visible;
    // trigger zone recalc for columns
    setTimeout(() => {
      this.visible.emit(visible);
    });
  }
}
