import {
  Component,
  Input,
  Output,
  EventEmitter,
  Renderer,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'datatable-pager',
  template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a
          href="javascript:void(0)"
          (click)="selectPage(1)"
          class="{{cssClasses.pagerPrevious}}">
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a
          href="javascript:void(0)"
          (click)="prevPage()"
          class="{{cssClasses.pagerLeftArrow}}">
        </a>
      </li>
      <li
        *ngFor="let pg of pages"
        [class.active]="pg.number === page">
        <a
          href="javascript:void(0)"
          (click)="selectPage(pg.number)">
          {{pg.text}}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a
          href="javascript:void(0)"
          (click)="nextPage()"
          class="{{cssClasses.pagerRightArrow}}">
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a
          href="javascript:void(0)"
          (click)="selectPage(totalPages)"
          class="{{cssClasses.pagerNext}}">
        </a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTablePager {

  @Input() size: number = 0;
  @Input() cssClasses: any;
  @Output() onPaged: EventEmitter<any> = new EventEmitter();

  @Input()
  set count(val) {
    this._count = val;
    this.pages = this.calcPages();
  }

  get count() {
    return this._count;
  }

  @Input()
  set page(val) {
    this._page = val;
    this.pages = this.calcPages();
  }

  get page() {
    return this._page;
  }

  get totalPages() {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(count || 0, 1);
  }

  private _count: number;
  private _page: number;
  private pages: any;

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-pager', true);
  }

  canPrevious() {
    return this.page > 1;
  }

  canNext() {
    return this.page < this.totalPages;
  }

  prevPage() {
    if (this.page > 1) {
      this.selectPage(--this.page);
    }
  }

  nextPage() {
    this.selectPage(++this.page);
  }

  selectPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.page = page;

      this.onPaged.emit({
        type: 'pager-event',
        value: page
      });
    }
  }

  calcPages(page?: number) {
    let pages = [];
    let startPage = 1;
    let endPage = this.totalPages;
    let maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;

    page = page || this.page;

    if (isMaxSized) {
      startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
      endPage = Math.min(startPage + maxSize - 1, this.totalPages);
    }

    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: num
      });
    }

    return pages;
  }

}
