import {
  Component, Input, ElementRef, Output, EventEmitter,
  OnInit, OnDestroy, ChangeDetectionStrategy, HostBinding
} from '@angular/core';

@Component({
  selector: 'datatable-scroller',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollerComponent implements OnInit, OnDestroy {

  @Input() scrollbarV: boolean = false;
  @Input() scrollbarH: boolean = false;

  @HostBinding('style.height.px')
  @Input() scrollHeight: number;

  @HostBinding('style.width.px')
  @Input() scrollWidth: number;

  @Output() scroll: EventEmitter<any> = new EventEmitter();

  private scrollYPos: number = 0;
  private scrollXPos: number = 0;
  private prevScrollYPos: number = 0;
  private prevScrollXPos: number = 0;
  private element: any;
  private parentElement: any;
  
  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.element.classList.add('datatable-scroll');
  }

  ngOnInit() {
    // manual bind so we don't always listen
    if(this.scrollbarV || this.scrollbarH) {
      this.parentElement = this.element.parentElement.parentElement;
      this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
    }
  }

  ngOnDestroy() {
    if(this.scrollbarV || this.scrollbarH) {
      this.parentElement.removeEventListener('scroll');
    }
  }

  setOffset(offsetY: number) {
    if(this.parentElement) {
      this.parentElement.scrollTop = offsetY;
    }
  }

  onScrolled(event) {
    const dom = event.currentTarget;
    this.scrollYPos = dom.scrollTop;
    this.scrollXPos = dom.scrollLeft;

    requestAnimationFrame(this.updateOffset.bind(this));
  }

  updateOffset() {
    let direction;
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
