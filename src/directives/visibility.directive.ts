import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostBinding
} from '@angular/core';

import { VisibilityObserver } from '../utils';

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(onVisibilityChange)="doSomething($event)">
 * 		</div>
 *
 */
@Directive({ selector: '[visibility-observer]' })
export class Visibility {

  @HostBinding('class.visible') visible: boolean = false;

  @Output() onVisibilityChange: EventEmitter<any> = new EventEmitter();

  constructor(element: ElementRef) {
    new VisibilityObserver(
      element.nativeElement,
      this.visbilityChange.bind(this));
  }

  visbilityChange() {
    // trigger zone recalc for columns
    setTimeout(() => {
      this.visible = true;
      this.onVisibilityChange.emit(true);
    });
  }

}
