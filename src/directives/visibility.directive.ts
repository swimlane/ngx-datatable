import {
  Directive, Output, EventEmitter, ElementRef, HostBinding, NgZone, OnInit, OnDestroy
} from '@angular/core';
import { VisibilityService } from '../services';
import { Subscription } from 'rxjs';

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
export class VisibilityDirective implements OnInit, OnDestroy {

  @HostBinding('class.visible') 
  isVisible: boolean = false;

  @Output() visible: EventEmitter<any> = new EventEmitter();
  visibleSubscription: Subscription;
  constructor(private element: ElementRef,
              private zone: NgZone,
              private readonly visibilityService: VisibilityService) { }

  ngOnInit(): void {
    this.visibleSubscription = this.visibilityService.observe(this.element.nativeElement)
    .subscribe((visible: boolean) => {
      this.zone.run(() => {
        this.isVisible = visible;
        if (this.isVisible) {
          this.visible.emit(true);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.visibilityService.unobserve(this.element.nativeElement);
    if (this.visibleSubscription) {
      this.visibleSubscription.unsubscribe();
    }
  }
}
