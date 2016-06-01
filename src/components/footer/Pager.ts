import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'datatable-pager',
  template: `
    <ul class="pager">
      <li [attr.disabled]="!canPrevious()">
        <a href="#" (click)="selectPage(1)" class="icon-prev"></a>
      </li>
      <li [attr.disabled]="!canPrevious()">
        <a href="#" (click)="prevPage()" class="icon-left"></a>
      </li>
      <li *ngFor="let pg of calcPages()" [class.active]="pg.active">
        <a href="#" (click)="selectPage(pg.number)">{{pg.text}}</a>
      </li>
      <li [attr.disabled]="!canNext()">
        <a href="#" (click)="nextPage()" class="icon-right"></a>
      </li>
      <li [attr.disabled]="!canNext()">
        <a href="#" (click)="selectPage(totalPages)" class="icon-skip"></a>
      </li>
    </ul>
  `,
  host: {
    '[class.datatable-pager]': 'true'
  }
})
export class DataTablePager {

  @Input() page = 1;
  @Input() size = 0;
  @Input() count = 0;
  @Output() onPage = new EventEmitter();

  get totalPages() {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(this.count || 0, 1);
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

  selectPage(page) {
    if (page > 0 && page <= this.totalPages) {
      this.page = page;
      this.onPage.emit({ page });
    }
  }

  calcPages(page) {
    let pages = [],
      startPage = 1,
      endPage = this.totalPages,
      maxSize = 5,
      isMaxSized = maxSize < this.totalPages;

    page = page || this.page;

    if (isMaxSized) {
      startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
      endPage = Math.min(startPage + maxSize - 1, this.totalPages);
    }

    for (let number = startPage; number <= endPage; number++) {
      pages.push({
        number: number,
        text: number,
        active: number === page
      });
    }

    return pages;
  }

}
