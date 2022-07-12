import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

import { MouseEvent } from '../../events';

@Component({
  selector: 'datatable-scroller',
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'datatable-scroll'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollerComponent implements OnInit, OnDestroy {
  @Input() scrollbarV = false;
  @Input() scrollbarH = false;

  @HostBinding('style.height.px')
  @Input()
    scrollHeight: number;

  @HostBinding('style.width.px')
  @Input()
    scrollWidth: number;

  @Output() scroll: EventEmitter<any> = new EventEmitter();

  scrollYPos = 0;
  scrollXPos = 0;
  prevScrollYPos = 0;
  prevScrollXPos = 0;
  element: HTMLElement;
  parentElement: HTMLElement;
  onScrollListener: any;

  private _scrollEventListener: any = null;

  constructor(private ngZone: NgZone, element: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this.element = element.nativeElement;
  }

  ngOnInit(): void {
    // manual bind so we don't always listen
    if (this.scrollbarV || this.scrollbarH) {
      const renderer = this.renderer;
      this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
      this._scrollEventListener = this.onScrolled.bind(this);
      this.parentElement.addEventListener('scroll', this._scrollEventListener);
    }
  }

  ngOnDestroy(): void {
    if (this._scrollEventListener) {
      this.parentElement.removeEventListener('scroll', this._scrollEventListener);
      this._scrollEventListener = null;
    }
  }

  setOffset(offsetY: number): void {
    if (this.parentElement) {
      this.parentElement.scrollTop = offsetY;
    }
  }

  onScrolled(event: MouseEvent): void {
    const dom: Element = event.currentTarget as Element;
    requestAnimationFrame(() => {
      this.scrollYPos = dom.scrollTop;
      this.scrollXPos = dom.scrollLeft;
      this.updateOffset();
    });
  }

  updateOffset(): void {
    let direction: string;
    if (this.scrollYPos < this.prevScrollYPos) {
      direction = 'down';
    } else if (this.scrollYPos > this.prevScrollYPos) {
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
