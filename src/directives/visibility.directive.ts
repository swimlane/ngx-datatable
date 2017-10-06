import {
  Directive, Output, EventEmitter, ElementRef, HostBinding, NgZone, OnInit, OnDestroy, DoCheck
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
export class VisibilityDirective implements OnInit, OnDestroy, DoCheck {

  @HostBinding('class.visible') 
  isVisible: boolean = false;

  @Output() visible: EventEmitter<any> = new EventEmitter();

  timeout: any;

  constructor(private element: ElementRef, private zone: NgZone) { }

  ngOnInit(): void {
    this.timeout = setTimeout(() => this.check());
  }

  ngDoCheck(): void {
    if(this.timeout !== undefined) return;
    this.check();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  clearTimeout(): void {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  onVisibilityChange(): void {
    // trigger zone recalc for columns
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }

  check: () => void = () => {
    // https://davidwalsh.name/offsetheight-visibility
    const { offsetHeight, offsetWidth } = this.element.nativeElement;

    if (offsetHeight && offsetWidth) {
      this.clearTimeout();
      this.onVisibilityChange();
    } else {
      this.clearTimeout();
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => this.check(), 50);
      });
    }
  }
}
