import {
  Directive,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  output,
  signal
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
@Directive({
  selector: '[visibilityObserver]',
  host: {
    '[class.visible]': 'isVisible()'
  }
})
export class VisibilityDirective implements OnInit, OnDestroy {
  private element = inject(ElementRef);
  private zone = inject(NgZone);

  readonly isVisible = signal(false);

  readonly visible = output<boolean>();

  timeout?: number;

  ngOnInit(): void {
    this.runCheck();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  onVisibilityChange(): void {
    // trigger zone recalc for columns
    this.zone.run(() => {
      this.isVisible.set(true);
      this.visible.emit(true);
    });
  }

  runCheck(): void {
    const check = (): void => {
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element.nativeElement;

      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = window.setTimeout(() => check(), 50);
        });
      }
    };

    this.timeout = window.setTimeout(() => check());
  }
}
