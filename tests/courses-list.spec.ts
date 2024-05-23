import { test, expect } from '@playwright/test';

test('create delete course list', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('name').click();
  await page.getByPlaceholder('name').click();
  await page.getByPlaceholder('name').fill('Test course');
  await page.getByPlaceholder('description').dblclick();
  await page.getByPlaceholder('description').fill('Test description');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByText('Test courseTest description')).toBeVisible();
  await page.getByText('Test courseTest description').click({
    modifiers: ['Shift'],
  });
  await expect(
    page.getByRole('heading', { name: 'Test course' })
  ).toBeVisible();
  await expect(
    page.getByText(
      'NameDescriptionTest descriptionAddTest courseTest descriptionDelete'
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click({
    modifiers: ['Shift'],
  });
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(
    page.getByRole('heading', { name: 'Test course' })
  ).toBeVisible();
  await expect(
    page.locator('div').filter({ hasText: /^Delete$/ })
  ).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(
    page.locator('div').filter({ hasText: /^Delete$/ })
  ).not.toBeVisible();
});
