import {
    Directive, Input, Output, EventEmitter, ElementRef, OnDestroy, ViewChild
  } from '@angular/core';

import ResizeObserver from 'resize-observer-polyfill';

/**
 * ResizeObserverDirective is used to detect element resizes independent from a window resize event
 */

@Directive({
  selector: '[resizeObserver]'
})
export class ResizeObserverDirective implements OnDestroy {

  @Output() resize: EventEmitter<ResizeObserverEntry> = new EventEmitter();

  @Input() set enabled(val: boolean) {
    this._enabled = val;
    if(val) {
      this.attach();
    } else {
      this.detach();
    }
  }
  get enabled(): boolean {
    return this._enabled;
  }

  private resizeElement: Element;
  private resizeObserver: ResizeObserver;
  
  private _enabled: boolean = false;
  
  constructor(element: ElementRef) {
    this.resizeElement = element.nativeElement;

    this.resizeObserver = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
            if(entry.target === this.resizeElement) {
                this.resize.emit(entry);
                break;
            }
        }
    });
  }

  ngOnDestroy(): void {
    this.detach();
    this.resizeObserver.disconnect();
  }

  private attach() {
    this.resizeObserver.observe(this.resizeElement);
  }

  private detach() {
    this.resizeObserver.unobserve(this.resizeElement);
  }
}
