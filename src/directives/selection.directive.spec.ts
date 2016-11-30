import { SelectionDirective } from './selection.directive';
import { SelectionType } from '../types/selection.type';

describe('SelectionDirective', () => {
  let selectionDir: SelectionDirective;

  let rows = [];
  for(let i = 0; i < 10; i++)
    rows.push({ name: 'Row ' + i });

  beforeEach(() => {
   selectionDir = new SelectionDirective();
   selectionDir.rows = rows;
  });

  describe('single selection', () => {

    it('should have no element selected', () => {
      expect(selectionDir.selection.length).toBe(0);
    });

    it('should select one element', () => {
      selectionDir.select(rows[0], true);
      expect(selectionDir.selection).toEqual([ rows[0] ]);
    });

    it('should select last element', () => {
      selectionDir.select(rows[0], true);
      selectionDir.select(rows[1], true);

      expect(selectionDir.selection).toEqual([ rows[1] ]);
    });

    it('should unselect element', () => {
      selectionDir.select(rows[0], true);
      selectionDir.select(rows[0], false);

      expect(selectionDir.selection.length).toBe(0);
    });

    it('should toggle element', () => {
      selectionDir.select(rows[0]);
      expect(selectionDir.selection).toEqual([ rows[0] ]);

      selectionDir.select(rows[0]);
      expect(selectionDir.selection.length).toBe(0);
    });

  });

  describe('multi selection', () => {

    beforeEach(() => {
     selectionDir.selectionType = SelectionType.multi;
    });

    it('should select two elements', () => {
      selectionDir.select(rows[1], true);
      selectionDir.select(rows[5], true);

      expect(selectionDir.selection).toEqual([ rows[1], rows[5] ]);
    });

    it('should unselect one element', () => {
      selectionDir.select(rows[1], true);
      selectionDir.select(rows[5], true);

      selectionDir.select(rows[1], false);

      expect(selectionDir.selection).toEqual([ rows[5] ]);
    });

    it('should toggle two elements', () => {
      selectionDir.select(rows[1]);
      selectionDir.select(rows[5]);

      expect(selectionDir.selection).toEqual([ rows[1], rows[5] ]);

      selectionDir.select(rows[1]);
      selectionDir.select(rows[5]);

      expect(selectionDir.selection.length).toBe(0);
    });

  });

  describe('multiShift selection', () => {

    beforeEach(() => {
     selectionDir.selectionType = SelectionType.multiShift;
    });

    it('should select range elements', () => {
      selectionDir.selectRowsBetween(rows[2], rows[4]);

      expect(selectionDir.selection).toEqual([ rows[2], rows[3], rows[4] ]);
    });

    it('should select range elements, reversed', () => {
      selectionDir.selectRowsBetween(rows[4], rows[2]);

      expect(selectionDir.selection).toEqual([ rows[2], rows[3], rows[4] ]);
    });

  });
});
