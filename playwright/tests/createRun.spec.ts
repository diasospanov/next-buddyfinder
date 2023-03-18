import { expect, test } from '@playwright/test';

test('attempt create run without account', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByAltText('running').click();
  await expect(page).toHaveURL('http://localhost:3000/running');

  await page.getByAltText('single runner').click();
  await expect(page).toHaveURL('http://localhost:3000/running/single');

  await page.getByPlaceholder('DATE (dd/mm/yy)').fill('01/05/23');
  await page.getByPlaceholder('TIME (hh:mm)').fill('10:00');
  await page.getByPlaceholder('DISTANCE (km)').fill('10');
  await page.getByPlaceholder('PACE (min/km)').fill('5');

  await page.getByRole('button', { name: 'Create a Run' }).click();
  await expect(page.getByText('Sign In/Up to create a run')).toBeVisible();
});
