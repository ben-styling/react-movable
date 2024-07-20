import { Examples, getTestUrl, trackMouse, waitForList } from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.SCROLLING_WINDOW));
  await page.setViewport({ width: 400, height: 800 });
  await waitForList(page);
});

test('scroll down', async () => {
  await trackMouse(page as any);
  await page.mouse.move(190, 140);
  await page.mouse.down();
  await page.mouse.move(190, 690);
  await new Promise((r) => setTimeout(r, 200));
  await page.mouse.up();
  const pageYOffset = await page.evaluate(() => window.pageYOffset);
  expect(pageYOffset).toBeGreaterThan(0);
});

test.only('scroll up', async () => {
  await trackMouse(page as any);
  const list = await page.$('#ladle-root ul');
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.mouse.move(190, 641);
  await page.mouse.down();
  await page.mouse.move(190, 100);
  await new Promise((r) => setTimeout(r, 200));
  await page.mouse.up();
  const pageYOffset = await page.evaluate(() => window.pageYOffset);
  expect(pageYOffset).toBeLessThan(301);
});
