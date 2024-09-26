import { adjustColumnWidths, forceFillColumnWidths } from './math';

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

  describe('adjustColumnWidths', () => {
    describe('flex mode', () => {
      it('should not go over/under compared to given max width', () => {
        const cols = [
          {
            prop: 'id1',
            width: 287,
            maxWidth: undefined,
            minWidth: 175,
            flexGrow: 2,
            canAutoResize: true
          },
          {
            prop: 'id2',
            width: 215,
            maxWidth: undefined,
            minWidth: 200,
            flexGrow: 1.5,
            canAutoResize: true
          },
          {
            prop: 'id3',
            width: 287,
            maxWidth: undefined,
            minWidth: 150,
            flexGrow: 2,
            canAutoResize: true
          },
          {
            prop: 'id4',
            width: 175,
            maxWidth: undefined,
            minWidth: 175,
            flexGrow: 1,
            canAutoResize: true
          },
          {
            prop: 'id5',
            width: 143,
            maxWidth: undefined,
            minWidth: 120,
            flexGrow: 1,
            canAutoResize: true
          }
        ];

        const givenTableWidth = 1180;

        adjustColumnWidths(cols, givenTableWidth);

        const totalAdjustedColumnWidths = cols.map(c => c.width).reduce((p, c) => p + c, 0);
        expect(totalAdjustedColumnWidths).toBeCloseTo(givenTableWidth, 0.001);
      });

      it('should overflow if the total of given min widths is bigger than given max width', () => {
        const cols = [
          {
            prop: 'id1',
            width: 100,
            maxWidth: undefined,
            minWidth: 100,
            flexGrow: 1,
            canAutoResize: true
          },
          {
            prop: 'id2',
            width: 100,
            maxWidth: undefined,
            minWidth: 100,
            flexGrow: 1,
            canAutoResize: true
          }
        ];
        const maxWidth = 199;

        adjustColumnWidths(cols, maxWidth);

        const totalAdjustedColumnWidths = cols.map(c => c.width).reduce((p, c) => p + c, 0);
        expect(totalAdjustedColumnWidths).toBeGreaterThan(maxWidth);
      });

      it('should respect min widths', () => {
        const cols = [
          {
            prop: 'id1',
            width: 0,
            maxWidth: undefined,
            minWidth: 10,
            flexGrow: 3.0000000000000075,
            canAutoResize: true
          },
          {
            prop: 'id2',
            width: 0,
            maxWidth: undefined,
            minWidth: 10,
            flexGrow: 1,
            canAutoResize: true
          }
        ];

        adjustColumnWidths(cols, 40);

        for (const col of cols) {
          expect(col.width - col.minWidth).toBeGreaterThanOrEqual(0);
        }
      });
    });
  });
});
