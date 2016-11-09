import {
  Directive, Output, EventEmitter, ElementRef, HostBinding, NgZone
} from '@angular/core';

import { checkVisibility } from '../utils';

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
@Directive({ selector: '[visibility-observer]' })
export class VisibilityDirective {

  @HostBinding('class.visible') 
  isVisible: boolean = false;

  @Output() visible: EventEmitter<any> = new EventEmitter();

  constructor(element: ElementRef, zone: NgZone) {
    checkVisibility(
      element.nativeElement,
      this.visbilityChange.bind(this),
      zone);
  }

  visbilityChange() {
    // trigger zone recalc for columns
    setTimeout(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }

}
