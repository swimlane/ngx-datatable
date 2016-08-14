import {
  Directive,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[scroller]',
  host: {
    '[style.height]': 'scrollHeight',
    '[style.width]': 'scrollWidth + "px"'
  }
})
export class Scroller implements OnInit, OnDestroy {

  @Input() rowHeight: number;
  @Input() count: number;
  @Input() scrollWidth: number;
  @Input() scrollbarV: boolean = false;

  @Output() onScroll: EventEmitter<any> = new EventEmitter();

  private scrollYPos: number = 0;
  private scrollXPos: number = 0;
  private prevScrollYPos: number = 0;
  private prevScrollXPos: number = 0;
  private element: any;
  private parentElement: any;

  get scrollHeight() {
    return (this.count * this.rowHeight) + 'px';
  }

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.element.classList.add('datatable-scroll');
  }

  ngOnInit() {
    // manual bind so we don't always listen
    if(this.scrollbarV) {
      this.parentElement = this.element.parentElement.parentElement;
      this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
    }
  }

  ngOnDestroy() {
    this.parentElement.removeEventListener('scroll');
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

    this.onScroll.emit({
      direction,
      scrollYPos: this.scrollYPos,
      scrollXPos: this.scrollXPos
    });

    this.prevScrollYPos = this.scrollYPos;
    this.prevScrollXPos = this.scrollXPos;
  }

}
