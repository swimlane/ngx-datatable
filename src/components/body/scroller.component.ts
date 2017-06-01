import {
  Component, Input, ElementRef, Output, EventEmitter, Renderer,
  OnInit, OnDestroy, HostBinding
} from '@angular/core';

import { MouseEvent } from '../../events';

@Component({
  selector: 'datatable-scroller',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'datatable-scroll'
  }
})
export class ScrollerComponent implements OnInit, OnDestroy {

  @Input() scrollbarV: boolean = false;
  @Input() scrollbarH: boolean = false;

  @HostBinding('style.height.px')
  @Input() scrollHeight: number;

  @HostBinding('style.width.px')
  @Input() scrollWidth: number;

  @Output() scroll: EventEmitter<any> = new EventEmitter();

  scrollYPos: number = 0;
  scrollXPos: number = 0;
  prevScrollYPos: number = 0;
  prevScrollXPos: number = 0;
  element: any;
  parentElement: any;
  onScrollListener: any;

  constructor(element: ElementRef, private renderer: Renderer) {
    this.element = element.nativeElement;
  }

  ngOnInit(): void {
    // manual bind so we don't always listen
    if(this.scrollbarV || this.scrollbarH) {
      this.parentElement = this.element.parentElement.parentElement;
      this.onScrollListener = this.renderer.listen(
        this.parentElement, 'scroll', this.onScrolled.bind(this));
    }
  }

  ngOnDestroy(): void {
    if(this.scrollbarV || this.scrollbarH) {
      this.onScrollListener();
    }
  }

  setOffset(offsetY: number): void {
    if(this.parentElement) {
      this.parentElement.scrollTop = offsetY;
    }
  }

  onScrolled(event: MouseEvent): void {
    const dom: Element = <Element>event.currentTarget;
    this.scrollYPos = dom.scrollTop;
    this.scrollXPos = dom.scrollLeft;

    requestAnimationFrame(this.updateOffset.bind(this));
  }

  updateOffset(): void {
    let direction: string;
    if(this.scrollYPos < this.prevScrollYPos) {
      direction = 'down';
    } else if(this.scrollYPos > this.prevScrollYPos) {
      direction = 'up';
    }

    this.scroll.emit({
      direction,
      scrollYPos: this.scrollYPos,
      scrollXPos: this.scrollXPos
    });

    this.prevScrollYPos = this.scrollYPos;
    this.prevScrollXPos = this.scrollXPos;
  }

}
