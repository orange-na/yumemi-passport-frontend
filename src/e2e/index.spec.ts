import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("選択した都道府県のグラフが表示される", async ({ page }) => {
  await page.getByLabel("北海道").check();
  await expect(
    page.locator("li").filter({ hasText: /^北海道$/ })
  ).toBeVisible();
  await page.getByLabel("青森県").check();
  await page.locator("li").filter({ hasText: "青森県" }).click();
  await expect(page.getByText("北海道青森県", { exact: true })).toBeVisible();
});
