import { test } from '../support/test-helpers';

test('disabled rows', async ({ si, page }) => {
  await si.visitExample('disabled');
  await page
    .getByRole('row', { name: 'Merritt Booker' })
    .getByRole('button', { name: 'Disable row' })
    .click();
  await si.runVisualAndA11yTests(undefined, [
    { id: 'color-contrast', enabled: false },
    { id: 'label', enabled: false },
    { id: 'select-name', enabled: false }
  ]);
});
