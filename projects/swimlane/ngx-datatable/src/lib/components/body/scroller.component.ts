import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output
} from '@angular/core';

import { ScrollContainerDirective } from '../../directives/scroll-container.directive';
import { ScrollToRowOptions } from '../../types/public.types';

export interface ScrollEventInternal {
  direction: string;
  scrollYPos: number;
  scrollXPos: number;
}

@Component({
  selector: 'datatable-scroller',
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'datatable-scroll',
    '[style.height.px]': 'scrollHeight()'
  }
})
export class ScrollerComponent implements OnInit, OnDestroy {
  private scrollContainer = inject(ScrollContainerDirective);

  readonly scrollbarV = input(false, {
    transform: booleanAttribute
  });
  readonly scrollbarH = input(false, {
    transform: booleanAttribute
  });
  readonly scrollHeight = input<number>();

  readonly scroll = output<ScrollEventInternal>();

  scrollYPos = 0;
  scrollXPos = 0;
  prevScrollYPos = 0;
  prevScrollXPos = 0;

  private _removeScrollListener?: () => void;
  private _scrollRafId: number | null = null;

  get scrollTop(): number {
    return this.scrollContainer.scrollTop;
  }

  ngOnInit(): void {
    // manual bind so we don't always listen
    if (this.scrollbarV() || this.scrollbarH()) {
      this._removeScrollListener = this.scrollContainer.listenToScroll(this.onScrolled.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (this._scrollRafId !== null) {
      cancelAnimationFrame(this._scrollRafId);
      this._scrollRafId = null;
    }
    this._removeScrollListener?.();
    this._removeScrollListener = undefined;
  }

  setOffset(offsetY: number): void {
    this.scrollContainer.setScrollTop(offsetY);
  }

  scrollTo(top: number, options?: ScrollToRowOptions): void {
    this.scrollContainer.scrollTo(top, options);
  }

  onScrolled(event: Event): void {
    if (this._scrollRafId !== null) {
      return;
    }
    const dom = event.currentTarget as Element;
    this._scrollRafId = requestAnimationFrame(() => {
      this._scrollRafId = null;
      this.scrollYPos = dom.scrollTop;
      this.scrollXPos = dom.scrollLeft;
      this.updateOffset();
    });
  }

  updateOffset(): void {
    let direction: string;
    if (this.scrollYPos < this.prevScrollYPos) {
      direction = 'down';
    } else {
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
