import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'datatable-pager',
  template: `
    <ul class="pager">
      <li [attr.disabled]="!canPrevious()">
        <a href (click)="selectPage(1)" class="icon-prev"></a>
      </li>
      <li [attr.disabled]="!canPrevious()">
        <a href (click)="prevPage()" class="icon-left"></a>
      </li>
      <li *ngFor="let pg of pages" [class.active]="pg.active">
        <a href (click)="selectPage(pg.number)">{{pg.text}}</a>
      </li>
      <li [attr.disabled]="!canNext()">
        <a href (click)="nextPage()" class="icon-right"></a>
      </li>
      <li [attr.disabled]="!canNext()">
        <a href (click)="selectPage(totalPages)" class="icon-skip"></a>
      </li>
    </ul>
  `
})
export class DataTablePager {

  @Input() page;
  @Input() size;
  @Input() count;

  @Output() onPage = new EventEmitter();

  @HostBinding('class.datatable-pager')
  private isPager = true;

  canPrevious() {

  }

  canNext() {
    
  }

  prevPage() {

  }

  nextPage() {

  }

  selectPage(pg) {

  }
}
