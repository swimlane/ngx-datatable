import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { toInternalColumn } from '../../utils/column-helper';
import { numericIndexGetter } from '../../utils/column-prop-getters';
import { DataTableBodyCellComponent } from './body-cell.component';
import { ComponentRef } from '@angular/core';

describe('DataTableBodyCellComponent', () => {
  let fixture: ComponentFixture<DataTableBodyCellComponent>;
  let component: ComponentRef<DataTableBodyCellComponent>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(DataTableBodyCellComponent);
    component = fixture.componentRef;
  }));

  describe('prop tests', () => {
    // verify there wasn't a mistake where the falsey 0 value
    // resulted in a code path for missing column prop
    it('should get value from zero-index prop', () => {
      component.setInput('row', ['Hello']);
      const columns = toInternalColumn([{ name: 'First Column', prop: 0 }]);
      expect(columns[0].$$valueGetter).toBe(numericIndexGetter);

      component.setInput('column', columns[0]);
      expect(component.instance.value()).toEqual('Hello');
    });
  });
});
