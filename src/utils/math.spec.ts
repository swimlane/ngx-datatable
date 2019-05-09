import { forceFillColumnWidths } from './math';

describe('Math function', () => {
  let columns = [];

  beforeEach(() => {
    columns = [
      { prop: 'id', width: 250, canAutoResize: true },
      { prop: 'name', width: 250, canAutoResize: true },
      { prop: 'email', width: 250, canAutoResize: true }
    ];
  });

  describe('forceFillColumnWidths', () => {
    describe('when a column is expanded', () => {
      it('should shrink columns to the right of the resized column if allowBleed is false', () => {
        columns[1].width = 400;
        forceFillColumnWidths(columns, 750, 1, false);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(400); // Grew from 250 to 400
        expect(columns[2].width).toBe(100); // Shrunk from 250 to 100
      });

      it('should not shrink columns to the right of the resized column if allowBleed is true', () => {
        columns[1].width = 400;
        forceFillColumnWidths(columns, 750, 1, true);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(400); // Grew from 250 to 400
        expect(columns[2].width).toBe(250); // Unchanged
      });

      it('should limit the srhink to the minimum width of the column if allowBleed is false', () => {
        columns[2].minWidth = 150;
        columns[1].width = 400;
        forceFillColumnWidths(columns, 750, 1, false);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(400); // Grew from 250 to 400
        expect(columns[2].width).toBe(150); // Shrunk from 250 to 150
      });

      it('should not srhink to the minimum width of the column if allowBleed is true', () => {
        columns[2].minWidth = 150;
        columns[1].width = 400;
        forceFillColumnWidths(columns, 750, 1, true);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(400); // Grew from 250 to 400
        expect(columns[2].width).toBe(250); // Unchanged
      });
    });

    describe('when a column is compressed', () => {
      it('should expand columns to the right of the resized column', () => {
        columns[1].width = 150;
        forceFillColumnWidths(columns, 750, 1, true);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(150); // Shrunk from 250 to 150
        expect(columns[2].width).toBe(350); // Grew from 250 to 350
      });

      it('should limit the expand to the maximum width of the column', () => {
        columns[2].maxWidth = 300;
        columns[1].width = 150;
        forceFillColumnWidths(columns, 750, 1, true);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(150); // Shrunk from 250 to 150
        expect(columns[2].width).toBe(300); // Grew from 250 to 300
      });
    });

    describe('when the table is expanded', () => {
      it('should expand all columns evenly', () => {
        forceFillColumnWidths(columns, 900, -1, true);

        expect(columns[0].width).toBe(300); // Grew from 250 to 300
        expect(columns[1].width).toBe(300); // Grew from 250 to 300
        expect(columns[2].width).toBe(300); // Grew from 250 to 300
      });

      it('should not expand columns beyond their maximum width', () => {
        columns[0].maxWidth = 250;
        forceFillColumnWidths(columns, 900, -1, true);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(325); // Grew from 250 to 325
        expect(columns[2].width).toBe(325); // Grew from 250 to 325
      });

      it('should expand remaining columns to fill space left by maximum width restrictions', () => {
        columns[0].maxWidth = 250;
        columns[1].maxWidth = 300;
        forceFillColumnWidths(columns, 900, -1, true);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(300); // Grew from 250 to 300
        expect(columns[2].width).toBe(350); // Grew from 250 to 350
      });
    });

    describe('when the table is compressed', () => {
      it('should shrink all columns evenly if allowBleed is false', () => {
        forceFillColumnWidths(columns, 600, -1, false);

        expect(columns[0].width).toBe(200); // Shrank from 250 to 200
        expect(columns[1].width).toBe(200); // Shrank from 250 to 200
        expect(columns[2].width).toBe(200); // Shrank from 250 to 200
      });

      it('should not shrink any columns if allowBleed is true', () => {
        forceFillColumnWidths(columns, 600, -1, true);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(250); // Unchanged
        expect(columns[2].width).toBe(250); // Unchanged
      });

      it('should not shrink columns beyond their minimum width', () => {
        columns[0].minWidth = 250;
        forceFillColumnWidths(columns, 600, -1, false);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(175); // Shrank from 250 to 175
        expect(columns[2].width).toBe(175); // Shrank from 250 to 175
      });

      it('should srink remaining columns to account for space reserved by minimum width restrictions', () => {
        columns[0].minWidth = 250;
        columns[1].minWidth = 200;
        forceFillColumnWidths(columns, 600, -1, false);

        expect(columns[0].width).toBe(250); // Unchanged
        expect(columns[1].width).toBe(200); // Shrank from 250 to 200
        expect(columns[2].width).toBe(150); // Shrank from 250 to 150
      });
    });
  });
});
