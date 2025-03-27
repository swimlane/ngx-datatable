import { test } from '../support/test-helpers';

test.describe('tree', () => {
  test.describe('fullscreen tree', () => {
    const example = 'fullscreen-tree';
    test(example, async ({ si, page }) => {
      await si.visitExample(example);
      await page.getByRole('cell', { name: 'Frank Bradford' }).getByRole('button').click();
      await page.getByRole('cell', { name: 'Carrie Mcconnell' }).getByRole('button').click();
      await page.getByRole('cell', { name: 'Kathryn Rios' }).getByRole('button').click();
      await page.getByRole('cell', { name: 'Stefanie Huff' }).getByRole('button').click();

      await si.runVisualAndA11yTests('fullscreen-tree');
    });
  });

  test.describe('client tree', () => {
    const example = 'client-tree';
    test(example, async ({ si, page }) => {
      await si.visitExample(example);
      await page.getByRole('cell', { name: 'Georgina Schultz ' }).getByRole('button').click();

      await si.runVisualAndA11yTests('client-tree');
    });
  });
});
