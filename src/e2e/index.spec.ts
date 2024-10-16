import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("都道府県の人口データを表示する", async ({ page }) => {
  await page.getByLabel("北海道").check();
  await page.getByLabel("青森県").check();

  await expect(page.getByRole("list").getByText("北海道")).toBeVisible();
  await expect(page.getByRole("list").getByText("青森県")).toBeVisible();
  await expect(page.getByText("西暦(年度)")).toBeVisible();
  await expect(page.getByText("人口(万人)")).toBeVisible();
});

test("選択した都道府県のチェックを外す", async ({ page }) => {
  await page.getByLabel("北海道").check();
  await page.getByLabel("青森県").check();

  await page.getByLabel("北海道").uncheck();

  await expect(page.getByRole("list").getByText("北海道")).not.toBeVisible();
  await expect(page.getByRole("list").getByText("青森県")).toBeVisible();
  await expect(page.getByText("西暦(年度)")).toBeVisible();
  await expect(page.getByText("人口(万人)")).toBeVisible();
});

test("存在しないページへのアクセス", async ({ page }) => {
  await page.goto("http://localhost:3000/invalid");

  await expect(page.getByText("404 Not Found")).toBeVisible();
});
