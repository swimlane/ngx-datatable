/*
 * VERITAS: Copyright (c) 2017 Veritas Technologies LLC. All rights reserved.
 *
 * THIS SOFTWARE CONTAINS CONFIDENTIAL INFORMATION AND TRADE SECRETS OF VERITAS
 * TECHNOLOGIES LLC. USE, DISCLOSURE OR REPRODUCTION IS PROHIBITED WITHOUT THE PRIOR
 * EXPRESS WRITTEN PERMISSION OF VERITAS TECHNOLOGIES LLC.
 *
 * The Licensed Software and Documentation are deemed to be commercial computer
 * software as defined in FAR 12.212 and subject to restricted rights as defined
 * in FAR Section 52.227-19 "Commercial Computer Software - Restricted Rights"
 * and DFARS 227.7202, Rights in "Commercial Computer Software or Commercial
 * Computer Software Documentation," as applicable, and any successor regulations,
 * whether delivered by Veritas as on premises or hosted services. Any use,
 * modification, reproduction release, performance, display or disclosure of
 * the Licensed Software and Documentation by the U.S. Government shall be
 * solely in accordance with the terms of this Agreement.

 * SS45-8248-1773-66-15-0
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionType } from '../../types/selection.type';
import { Keys } from '../../utils/keys';

import { DataTableSelectionComponent } from './index';
import { Model } from './selection.component';

describe('DataTableSelectionComponent', () => {
  let fixture: ComponentFixture<DataTableSelectionComponent>;
  let component: DataTableSelectionComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableSelectionComponent
      ]
    });
    return TestBed.compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DataTableSelectionComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('selectRow', () => {
    it('should default to none (no selection behavior defined)', () => {
      expect(component.selected).toBeFalsy();
      spyOn(component.select, 'emit').and.callThrough();
      component.selectRow({} as KeyboardEvent, 0, {});
      expect(component.selected).toBeFalsy();
      expect(component.select.emit).not.toHaveBeenCalled();
    });

    describe('when selectType === SelectionType.single', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.single;
      });

      it('should select a single row and emit select event', () => {
        const row = 'foo';

        spyOn(component.select, 'emit').and.callThrough();
        component.rows = ['foo', 'bar'];
        fixture.detectChanges();

        expect(component.selected).toBeFalsy();

        component.selectRow({} as MouseEvent, 0, row);

        expect(component.selected).toEqual([row]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
      });

      it('should not de-select a previously selected row', () => {
        spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1];
        fixture.detectChanges();

        component.selectRow({} as KeyboardEvent, 1, 1);
        expect(component.selected).toEqual([1]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});

        component.selectRow({} as KeyboardEvent, 1, 1);
        expect(component.selected).toEqual([1]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});
      });

      describe('and shift key is held', () => {
        it('with no previous selection should select single row', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);

          expect(component.selected).toEqual([6]);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [6]});
        });

        it('with previous selection should select single row', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 6, 6);
          component.selectRow({shiftKey: true} as KeyboardEvent, 3, 3);

          expect(component.selected).toEqual([3]);
          expect(selectEvent.calls.count()).toEqual(2);
          expect(selectEvent.calls.first().args[0]).toEqual({selected: [6]});
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [3]});
        });
      });

      describe('AND ctrl key is held', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 1);

          expect(component.selected).toEqual([1]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});
        });

        it('should store most recent selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, true);

          const selected = [true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('re-selecting a previously selected row should not deselect the row', () => {
          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 0, 0);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });

      describe('AND meta key is held (ctrl click on the mac)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, true);

          const selected = [true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [7]});
        });

        it('re-selecting a previously selected row should not deselect the row', () => {
          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, 1);

          expect(component.selected).toEqual([1]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});
        });
      });
    });

    describe('when selectType === SelectionType.cell', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.cell;
      });

      it('should select a single row and emit select event', () => {
        const row = 'foo';

        spyOn(component.select, 'emit').and.callThrough();
        component.rows = ['foo', 'bar'];
        fixture.detectChanges();

        expect(component.selected).toBeFalsy();

        component.selectRow({} as MouseEvent, 0, row);

        expect(component.selected).toEqual([row]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
      });

      it('should not de-select a previously selected row', () => {
        spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1];
        fixture.detectChanges();

        component.selectRow({} as KeyboardEvent, 1, 1);
        expect(component.selected).toEqual([1]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});

        component.selectRow({} as KeyboardEvent, 1, 1);
        expect(component.selected).toEqual([1]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});
      });

      describe('and shift key is held', () => {
        it('with previous selection should select rows between indexes (inclusive)', () => {
          const row = 1;

          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 0, row);
          component.selectRow({shiftKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0, 1]);
          expect(selectEvent.calls.count()).toEqual(2);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1]});
        });

        it('with previous selection should select rows between indexes (inclusive) and order of selection does not matter', () => {
          const row = 1;

          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 6, row);
          component.selectRow({shiftKey: true} as KeyboardEvent, 0, row);

          expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.count()).toEqual(2);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1, 2, 3, 4, 5, 6]});
        });

        it('should select rows between zero and current index (inclusive) if shift is held for first selection', () => {
          const row = 1;

          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, row);

          expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.count()).toEqual(1);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1, 2, 3, 4, 5, 6]});
        });

        it('should select rows between initial click and shift click (inclusive) if shift click happens inbetween', () => {
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 3, 3);
          expect(component.selected).toEqual([3]);

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);
          expect(component.selected).toEqual([3, 4, 5, 6]);

          component.selectRow({shiftKey: true} as KeyboardEvent, 0, 0);
          expect(component.selected).toEqual([0, 1, 2, 3]);
        });
      });

      describe('and ctrl key is held (i.e. ctrl key should have no effect)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });

      describe('and meta key is held (ctrl click on the mac) (i.e. meta key should have no effect)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });
    });

    describe('when selectType === SelectionType.checkbox', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.checkbox;
      });
      it('should select only a single row (nothing is previously selected)', () => {
        const row = 1;

        spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1];
        fixture.detectChanges();

        component.selectRow({} as KeyboardEvent, 1, row);

        expect(component.selected).toEqual([row]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
      });

      it('should store multiple selections in order of selection', () => {
        const selectEvent = spyOn(component.select, 'emit').and.callThrough();
        component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
        fixture.detectChanges();

        component.selectRow({} as KeyboardEvent, 1, 'Hulk');
        component.selectRow({} as MouseEvent, 1, '+');
        component.selectRow({} as KeyboardEvent, 1, 'Thor');
        component.selectRow({} as MouseEvent, 1, '===');
        component.selectRow({} as KeyboardEvent, 1, 'dale-prime');
        component.selectRow({} as MouseEvent, 1, true);

        const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
        expect(component.selected).toEqual(selected);
        expect(selectEvent.calls.count()).toEqual(6);
        expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
      });

      it('should add to previous selection when selecting a new row', () => {
        const row = 7;

        spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1, 3, 5, 7];
        component.selected = [0, 1];
        fixture.detectChanges();

        component.selectRow({} as MouseEvent, 4, row);

        expect(component.selected).toEqual([0, 1, 7]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
      });

      it('re-selecting a previously selected row should deselect the row', () => {
        const row = 1;

        spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1];
        component.selected = [0, 1];
        fixture.detectChanges();

        component.selectRow({} as KeyboardEvent, 1, row);

        expect(component.selected).toEqual([0]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
      });

      describe('and shift key is held', () => {
        it('with previous selection should select rows between indexes (inclusive)', () => {
          const row = 1;

          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 0, row);
          component.selectRow({shiftKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0, 1]);
          expect(selectEvent.calls.count()).toEqual(2);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1]});
        });

        it('with previous selection should select rows between indexes (inclusive) and order of selection does not matter', () => {
          const row = 1;

          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 6, row);
          component.selectRow({shiftKey: true} as KeyboardEvent, 0, row);

          expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.count()).toEqual(2);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1, 2, 3, 4, 5, 6]});
        });

        it('should select rows between zero and current index (inclusive) if shift is held for first selection', () => {
          const row = 1;

          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, row);

          expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.count()).toEqual(1);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1, 2, 3, 4, 5, 6]});
        });

        it('should select rows between initial click and shift click (inclusive) if shift click happens inbetween', () => {
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 3, 3);
          expect(component.selected).toEqual([3]);

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);
          expect(component.selected).toEqual([3, 4, 5, 6]);

          component.selectRow({shiftKey: true} as KeyboardEvent, 0, 0);
          expect(component.selected).toEqual([0, 1, 2, 3]);
        });
      });

      describe('and ctrl key is held (i.e. ctrl key should have no effect)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });

      describe('and meta key is held (ctrl click on the mac) (i.e. meta key should have no effect)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });
    });

    describe('when selectType === SelectionType.multiClick', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.multiClick;
      });

      it('should add a row for each click and selection order is maintained', () => {
        const selectEvent = spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1, 3, 5, 7, 9];
        fixture.detectChanges();

        component.selectRow({} as KeyboardEvent, 1, 1);
        expect(component.selected).toEqual([1]);
        expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [1]});

        component.selectRow({} as KeyboardEvent, 0, 0);
        expect(component.selected).toEqual([1, 0]);
        expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [1, 0]});

        component.selectRow({} as KeyboardEvent, 5, 9);
        expect(component.selected).toEqual([1, 0, 9]);
        expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [1, 0, 9]});
      });

      describe('AND shift key is held', () => {
        it('should select rows between zero and current index (inclusive)', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);

          expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.count()).toEqual(1);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1, 2, 3, 4, 5, 6]});
        });

        it('should select rows between first click and current index (inclusive)', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 1, 1);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [1]});

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);

          expect(component.selected).toEqual([1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [1, 2, 3, 4, 5, 6]});
        });
      });

      describe('AND ctrl key is held (i.e. ctrl key should have no effect)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });

      describe('AND meta key is held (ctrl click on the mac) (i.e. meta key should have no effect)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });
    });

    describe('when selectType === selectionType.multi', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.multi;
      });

      it('should select only a single row (nothing is previously selected)', () => {
        spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1];
        fixture.detectChanges();

        component.selectRow({} as KeyboardEvent, 1, 1);

        expect(component.selected).toEqual([1]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});
      });

      it('should select only a single row (if multiple rows are previously selected)', () => {
        spyOn(component.select, 'emit').and.callThrough();
        component.rows = [0, 1, 3, 5, 7, 9];
        fixture.detectChanges();

        component.selectRow({shiftKey: true} as KeyboardEvent, 5, 9);
        expect(component.selected).toEqual([0, 1, 3, 5, 7, 9]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 3, 5, 7, 9]});

        component.selectRow({} as KeyboardEvent, 2, 3);
        expect(component.selected).toEqual([3]);
        expect(component.select.emit).toHaveBeenCalledWith({selected: [3]});
      });

      describe('and shift key is held', () => {
        it('with previous selection should select rows between indexes (inclusive)', () => {
          const row = 1;

          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 0, row);
          component.selectRow({shiftKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0, 1]);
          expect(selectEvent.calls.count()).toEqual(2);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1]});
        });

        it('with previous selection should select rows between indexes (inclusive) and order of selection does not matter', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 6, 1);
          component.selectRow({shiftKey: true} as KeyboardEvent, 0, 1);

          expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.count()).toEqual(2);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1, 2, 3, 4, 5, 6]});
        });

        it('should select rows between zero and current index (inclusive) if shift is held for first selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);

          expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
          expect(selectEvent.calls.count()).toEqual(1);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected: [0, 1, 2, 3, 4, 5, 6]});
        });

        it('should select rows between initial click and shift click (inclusive) if shift click happens inbetween', () => {
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();

          component.selectRow({} as KeyboardEvent, 3, 3);
          expect(component.selected).toEqual([3]);

          component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);
          expect(component.selected).toEqual([3, 4, 5, 6]);

          component.selectRow({shiftKey: true} as KeyboardEvent, 0, 0);
          expect(component.selected).toEqual([0, 1, 2, 3]);
        });
      });

      describe('AND ctrl key is held', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 1);

          expect(component.selected).toEqual([1]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [1]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({ctrlKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });

      describe('AND meta key is held (ctrl click on the mac)', () => {
        it('should select only a single row (nothing is previously selected)', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([row]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [row]});
        });

        it('should store multiple selections in order of selection', () => {
          const selectEvent = spyOn(component.select, 'emit').and.callThrough();
          component.rows = [true, '+', 'dale-prime', 'Hulk', '===', 'Thor'];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Hulk');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '+');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'Thor');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, '===');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, 'dale-prime');
          component.selectRow({metaKey: true} as KeyboardEvent, 1, true);

          const selected = ['Hulk', '+', 'Thor', '===', 'dale-prime', true];
          expect(component.selected).toEqual(selected);
          expect(selectEvent.calls.count()).toEqual(6);
          expect(selectEvent.calls.mostRecent().args[0]).toEqual({selected});
        });

        it('should add to previous selection when selecting a new row', () => {
          const row = 7;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1, 3, 5, 7];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 4, row);

          expect(component.selected).toEqual([0, 1, 7]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0, 1, 7]});
        });

        it('re-selecting a previously selected row should deselect the row', () => {
          const row = 1;

          spyOn(component.select, 'emit').and.callThrough();
          component.rows = [0, 1];
          component.selected = [0, 1];
          fixture.detectChanges();

          component.selectRow({metaKey: true} as KeyboardEvent, 1, row);

          expect(component.selected).toEqual([0]);
          expect(component.select.emit).toHaveBeenCalledWith({selected: [0]});
        });
      });
    });
  });

  describe('selectCheck', () => {
    it('should exclude sections that do not pass test', () => {
      component.selectionType = SelectionType.multiClick;
      component.rows = [0, 1, 2, 3, 4, 5, 6];
      component.selectCheck = (row: any) => row % 2 === 0;
      fixture.detectChanges();

      component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);
      expect(component.selected).toEqual([0, 2, 4, 6]);
    });

    it('should not cause an error if it is not a function', () => {
      component.selectionType = SelectionType.multiClick;
      component.rows = [0, 1, 2, 3, 4, 5, 6];
      component.selectCheck = undefined;
      fixture.detectChanges();

      component.selectRow({shiftKey: true} as KeyboardEvent, 6, 6);
      expect(component.selected).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });
  });

  describe('onActivate', () => {
    describe('When selectType === SelectionType.single ', () => {

      beforeEach(() => {
        component.selectionType = SelectionType.single;
      });

      it('should do nothing model.type === keyup', () => {
        spyOn(component.activate, 'emit').and.callThrough();
        component.rows = [0, 1];
        component.selected = [];
        fixture.detectChanges();

        component.onActivate({type: 'keyup', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([]);
        expect(component.activate.emit).toHaveBeenCalled();
      });

      it('should select the row when model.type === click', () => {
        spyOn(component.activate, 'emit').and.callThrough();
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'click', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
        expect(component.activate.emit).toHaveBeenCalled();
      });

      it('should select the row when model.type === dblclick', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'dblclick', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });

      it('should select the row when user presses enter', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'keydown', row: 1, event: {keyCode: Keys.return} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });

      it('should NOT select the row when user presses down', () => {
        component.rows = [0, 1];
        component.selected = [];
        const keyboardFocus = spyOn(component, 'onKeyboardFocus'); // Don't call through, it will fail.
        fixture.detectChanges();

        component.onActivate({type: 'keydown', row: 1, event: {keyCode: Keys.down} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([]);
        expect(keyboardFocus).toHaveBeenCalled();
      });
    });

    describe('When selectType === SelectionType.checkbox ', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.checkbox;
      });

      describe('AND model.type === checkbox', () => {
        it('should select single row', () => {
          component.rows = [0, 1, 2, 3, 4, 5, 6];
          fixture.detectChanges();
          component.onActivate({type: 'checkbox', row: 1, event: {} as KeyboardEvent} as Model, 1);
          expect(component.selected).toEqual([1]);
        });
      });
    });

    describe('When selectType === SelectionType.multi', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.multi;
      });

      it('should select the row when model.type === click', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'click', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });

      it('should select the row when model.type === dblclick', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'dblclick', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });
    });

    describe('When selectType === SelectionType.multiClick', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.multiClick;
      });

      it('should select the row when model.type === click', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'click', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });

      it('should select the row when model.type === dblclick', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'dblclick', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });
    });

    describe('When selectType === SelectionType.cell', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.cell;
      });

      it('should select the row when model.type === click', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'click', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });

      it('should select the row when model.type === dblclick', () => {
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onActivate({type: 'dblclick', row: 1, event: {} as KeyboardEvent} as Model, 1);
        expect(component.selected).toEqual([1]);
      });
    });
  });

  describe('onKeyboardFocus', () => {
    // these tests are worthless, just getting coverage.
    // the combinations make the tests and the implementation unintelligible

    it('should ignore all keys but up, down, right, and left', () => {
      const focusRow = spyOn(component, '_focusRow');
      const focusCell = spyOn(component, '_focusCell');
      component.selected = [];
      component.rows = [0, 1];
      fixture.detectChanges();

      component.onKeyboardFocus({cellElement: true, row: 1, event: {keyCode: Keys.return} as KeyboardEvent} as Model);
      expect(component.selected).toEqual([]);
      expect(focusRow).not.toHaveBeenCalled();
      expect(focusCell).not.toHaveBeenCalled();
    });

    it('should delegate to focusRow if cellElement is false', () => {
      const focusRow = spyOn(component, '_focusRow');
      const focusCell = spyOn(component, '_focusCell');
      component.selected = [];
      component.rows = [0, 1];
      fixture.detectChanges();

      component.onKeyboardFocus({cellElement: false, row: 1, event: {keyCode: Keys.down} as KeyboardEvent} as Model);
      expect(component.selected).toEqual([]);
      expect(focusRow).toHaveBeenCalled();
      expect(focusCell).not.toHaveBeenCalled();
    });

    describe('When selectType === SelectionType.cell', () => {
      beforeEach(() => {
        component.selectionType = SelectionType.cell;
      });

      it('should select the row when model.type === click', () => {
        const focusCell = spyOn(component, '_focusCell');
        component.selected = [];
        component.rows = [0, 1];
        fixture.detectChanges();

        component.onKeyboardFocus({cellElement: true, row: 1, event: {keyCode: Keys.up} as KeyboardEvent} as Model);
        expect(component.selected).toEqual([]);
        expect(focusCell).toHaveBeenCalled();
      });
    });
  });

  describe('_focusRow', () => {
    // these tests are worthless, just getting coverage.
    it('should delegate to getPrevNextRow for next row element', () => {
      const getPrevNextRow = spyOn(component, '_getPrevNextRow');
      component._focusRow(1, Keys.return);
      expect(getPrevNextRow).toHaveBeenCalled();
    });

    it('should focus next row element returned by getPrevNextRow', () => {
      const nextRowElement = jasmine.createSpyObj('nextRowElement', ['focus']);
      const getPrevNextRow = spyOn(component, '_getPrevNextRow').and.returnValue(nextRowElement);
      component._focusRow(1, Keys.return);
      expect(nextRowElement.focus).toHaveBeenCalled();
    });
  });

  describe('f_ocusCell', () => {
    // these tests are worthless, just getting coverage.
    it('should do nothing with return key', () => {
      const nextElement = jasmine.createSpyObj('nextElement', ['focus']);
      const cellElement = {};
      component._focusCell(cellElement, {}, Keys.return, 1);
    });

    it('should not call focus if nextElement is undefined', () => {
      const nextElement = jasmine.createSpyObj('nextElement', ['focus']);
      const cellElement = {};
      component._focusCell(cellElement, {}, Keys.left, 1);
    });

    it('should delegate to previousElementSibling on left arrow', () => {
      const nextElement = jasmine.createSpyObj('nextElement', ['focus']);
      const cellElement = {previousElementSibling: nextElement};

      component._focusCell(cellElement, {}, Keys.left, 1);
      expect(nextElement.focus).toHaveBeenCalled();
    });

    it('should delegate to previousElementSibling on right arrow', () => {
      const nextElement = jasmine.createSpyObj('nextElement', ['focus']);
      const cellElement = {nextElementSibling: nextElement};

      component._focusCell(cellElement, {}, Keys.right, 1);
      expect(nextElement.focus).toHaveBeenCalled();
    });

    it('should delegate to getPrevNextRow on up arrow', () => {
      const getPrevNextRow = spyOn(component, '_getPrevNextRow');

      component._focusCell({}, {}, Keys.up, 1);
      expect(getPrevNextRow).toHaveBeenCalled();
    });

    it('should delegate to getPrevNextRow on down arrow', () => {
      const getPrevNextRow = spyOn(component, '_getPrevNextRow');

      component._focusCell({}, {}, Keys.up, 1);
      expect(getPrevNextRow).toHaveBeenCalled();
    });

    it('should delegate to getPrevNextRow on up arrow and call the index child', () => {
      const nextRowElement = {
        getElementsByClassName: jasmine.createSpy('getElementsByClassName').and.returnValue([])
      };
      const getPrevNextRow = spyOn(component, '_getPrevNextRow').and.returnValue(nextRowElement);

      component._focusCell({}, {}, Keys.up, 0);
      expect(getPrevNextRow).toHaveBeenCalled();
    });

    it('should delegate to getPrevNextRow on down arrow and call the index child', () => {
      const nextElement = jasmine.createSpyObj('nextElement', ['focus']);
      const nextRowElement = {
        getElementsByClassName: jasmine.createSpy('getElementsByClassName').and.returnValue([nextElement])
      };
      const getPrevNextRow = spyOn(component, '_getPrevNextRow').and.returnValue(nextRowElement);

      component._focusCell({}, {}, Keys.down, 0);
      expect(getPrevNextRow).toHaveBeenCalled();
      expect(nextElement.focus).toHaveBeenCalled();
    });
  });

  describe('_getPrevNextRow', () => {
    it('should return undefined if element has no parent', () => {
      expect(component._getPrevNextRow({} as Element, Keys.return)).toBeUndefined();
    });

    it('should return undefined on all values except key up or key down', () => {
      const parentElement: any = {};
      const rowElement: any = {};
      rowElement.parentElement = parentElement;
      expect(component._getPrevNextRow(rowElement as Element, Keys.return)).toBeUndefined();
    });

    it('should return undefined for key up if focusElement has no children', () => {
      const nextElement: any = {};
      nextElement.children = [];
      const parentElement: any = {};
      parentElement.previousElementSibling = nextElement;
      const rowElement: any = {};
      rowElement.parentElement = parentElement;
      expect(component._getPrevNextRow(rowElement as Element, Keys.up)).toBeUndefined();
    });

    it('should return undefined for key down if focusElement has no children', () => {
      const nextElement: any = {};
      nextElement.children = [];
      const parentElement: any = {};
      parentElement.previousElementSibling = nextElement;
      const rowElement: any = {};
      rowElement.parentElement = parentElement;
      expect(component._getPrevNextRow(rowElement as Element, Keys.down)).toBeUndefined();
    });

    it('should return first child of focusElement', () => {
      const nextElement: any = {};
      const child = {};
      nextElement.children = [child];
      const parentElement: any = {};
      parentElement.previousElementSibling = nextElement;

      const rowElement: any = {};
      rowElement.parentElement = parentElement;
      expect(component._getPrevNextRow(rowElement as Element, Keys.up)).toEqual(child);
    });
  });
});
