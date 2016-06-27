import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[scroller]',
  host: {
    '[style.height]': 'scrollHeight',
    '[style.width]': 'scrollWidth + "px"'
  }
})
export class Scroller {

  @Input() rowHeight: number;
  @Input() count: number;
  @Input() scrollWidth: number;

  get scrollHeight() {
    return (this.count * this.rowHeight) + 'px';
  }

  constructor(elm: ElementRef){
    elm.nativeElement.classList.add('scroller');
  }

}
