import { forceFillColumnWidths } from './math';

describe('Math function', () => {

  describe('forceFillColumnWidths', () => {
    describe('when column expanded', () => {
      it('should resize only columns right to the resized column', () => {
        const columns = [
          { prop: 'id', width: 250, canAutoResize: true },
          { prop: 'name', width: 400, canAutoResize: true },
          { prop: 'email', width: 250, canAutoResize: true }
        ];

        forceFillColumnWidths(columns, 750, 1, true); // Column 2 expanded from 250 to 400

        expect(columns[0].width).toBe(250); // Not changed
        expect(columns[1].width).toBe(400);
        expect(columns[2].width).toBe(250);

      });
    });

    describe('when column compressed', () => {
      it('should resize only columns right to the resized column', () => {
        const columns = [
          { prop: 'id', width: 250, canAutoResize: true },
          { prop: 'name', width: 180, canAutoResize: true },
          { prop: 'email', width: 250, canAutoResize: true }
        ];

        forceFillColumnWidths(columns, 750, 1, true); // Column 2 contracted from 250 to 180

        expect(columns[0].width).toBe(250); // Not changed
        expect(columns[1].width).toBe(180);
        expect(columns[2].width).toBe(320);

      });
    });

  });
});
