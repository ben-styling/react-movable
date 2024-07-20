import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  getListItems,
  makeDnd,
  waitForList,
} from "./utils";

const POSITIONS = [
  [190, 111],
  [190, 190],
  [190, 263],
  [190, 346],
  [190, 418],
  [190, 501],
];

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.DISABLED_ITEMS));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page as any);
  await waitForList(page);
});

test("dnd the first item to second position", async ({ page }) => {
  await trackMouse(page as any);
  await makeDnd(page, page.mouse, 1, 2, POSITIONS);
  expect(await getListItems(page as any)).toEqual([
    "Item 2",
    "Item 1",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  await untrackMouse(page as any);
  await expect(page).toHaveScreenshot();
});

test("attempt to dnd the fourth item, should have no effect", async ({
  page,
}) => {
  await trackMouse(page as any);
  await makeDnd(page, page.mouse, 4, 1, POSITIONS);
  expect(await getListItems(page as any)).toEqual([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  await untrackMouse(page as any);
  await expect(page).toHaveScreenshot();
});
