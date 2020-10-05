import puppetteer from 'puppeteer';

const childProcess = require('child_process');

let server = null;

jest.setTimeout(30000);
describe('Проверка валидности формы', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = await childProcess.fork(`${__dirname}/test-server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  describe('Проверка валидности формы', () => {
    test('Добавлен .valid', async () => {
      await page.goto(baseUrl);
      const form = await page.$('[class=valid-form]');
      const input = await form.$('[id=input]');
      await input.type('378282246310005');
      const submit = await form.$('[id=valid-button]');
      submit.click();
      await page.waitForSelector('[id=input].valid');
    });

    test('Добавлен .invalid', async () => {
      await page.goto(baseUrl);
      const form = await page.$('[class=valid-form]');
      const input = await form.$('[id=input]');
      await input.type('28265254126813864');
      const submit = await form.$('[id=valid-button]');
      submit.click();
      await page.waitForSelector('[id=input].invalid');
    });
  });
});
