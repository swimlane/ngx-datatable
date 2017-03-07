import {FixedRowHeightPage} from "../pages/fixed-row-height.po";

describe('Drag and drop columns [ Name, Company, Gender ]', () => {

  let page;

  let NAME = 0,
    COMPANY = 1,
    GENDER = 2;

  beforeEach(() => {
    page = new FixedRowHeightPage();

    page.navigateTo();
  });

  // columns are [ Name, Company, Gender ]
  describe('when the first column is dragged to the second ', () => {

    beforeEach(() => {
      expect(page.table.columnText(NAME)).toBe('Name');
      expect(page.table.columnText(COMPANY)).toBe('Company');
    });

    it('then it should swap the columns [ Company, Name, Gender ]', () => {
      page.table.drag(NAME, COMPANY)
        .then(() => {
          expect(page.table.columnText(NAME)).toBe('Company');
          expect(page.table.columnText(COMPANY)).toBe('Name');
        });
    });
  });

  // columns are [ Name, Company, Gender ]
  describe('when the first column is dragged to the third', () => {

    beforeEach(() => {
      // page.printColumns();
      expect(page.table.columnText(NAME)).toBe('Name');
      expect(page.table.columnText(GENDER)).toBe('Gender');
    });

    it('then it should swap the columns [ Gender, Company, Name ]', () => {
      page.table.drag(NAME, GENDER)
        .then(() => {
          // page.printColumns();
          expect(page.table.columnText(NAME)).toBe('Gender');
          expect(page.table.columnText(GENDER)).toBe('Name');
        });
    });
  });

  // columns are [ Name, Company, Gender ]
  describe('when the second column is dragged to the third', () => {
    beforeEach(() => {
      expect(page.table.columnText(COMPANY)).toBe('Company');
      expect(page.table.columnText(GENDER)).toBe('Gender');
    });

    it('then it should swap the columns [ Name, Gender, Company ]', () => {
      page.table.drag(COMPANY, GENDER)
        .then(() => {
          expect(page.table.columnText(COMPANY)).toBe('Gender');
          expect(page.table.columnText(GENDER)).toBe('Company');
        });
    });
  });

  // columns are [ Name, Company, Gender ]
  describe('when the third column is dragged to the second', () => {
    beforeEach(() => {
      expect(page.table.columnText(GENDER)).toBe('Gender');
      expect(page.table.columnText(COMPANY)).toBe('Company');
    });

    it('then it should swap the columns [ Name, Gender, Company ]', () => {
      page.table.drag(GENDER, COMPANY)
        .then(() => {
          expect(page.table.columnText(GENDER)).toBe('Company');
          expect(page.table.columnText(COMPANY)).toBe('Gender');
        });
    });
  });

  // columns are [ Name, Company, Gender ]
  describe('when the third column is dragged to the first', () => {
    beforeEach(() => {
      expect(page.table.columnText(GENDER)).toBe('Gender');
      expect(page.table.columnText(NAME)).toBe('Name');
    });

    it('then it should swap the columns [ Gender, Company, Name ]', () => {
      page.table.drag(GENDER, NAME)
        .then(() => {
          expect(page.table.columnText(GENDER)).toBe('Name');
          expect(page.table.columnText(NAME)).toBe('Gender');
        });
    });
  });

});
