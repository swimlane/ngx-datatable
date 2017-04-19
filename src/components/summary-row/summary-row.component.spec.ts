import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { DataTableSummaryRowCellComponent, DataTableSummaryRowComponent } from '.';

describe('DataTableBodyRowComponent', () => {
    let fixture: ComponentFixture<DataTableSummaryRowComponent>;
    let component: DataTableSummaryRowComponent;
    let element;

    // provide our implementations or mocks to the dependency injector
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DataTableSummaryRowCellComponent,
                DataTableSummaryRowComponent
            ]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(DataTableSummaryRowComponent);
            component = fixture.componentInstance;
            element = fixture.nativeElement;
        });
    }));

    /*
     describe('fixture', () => {
     it('should have a component instance', () => {
     expect(component).toBeTruthy();
     });
     });
     */
});
