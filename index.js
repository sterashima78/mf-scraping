const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });
  const page = await browser.newPage();
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')
  await page.goto('https://moneyforward.com/users/sign_in');
  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})()