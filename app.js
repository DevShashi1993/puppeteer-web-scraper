const puppeteer = require("puppeteer");
const WebsiteUrl = "https://www.smartprix.com/";

(async () => {
  // create a new browser instance
  const browser = await puppeteer.launch();

  // create a page inside the browser;
  const page = await browser.newPage();

  // navigate to a website and set the viewport
  // await page.setViewport({ width: 1280, height: 800 });
  await page.goto(WebsiteUrl);
  
  await page.type('#search-form > input.search-box', 'smartwatch');
  await page.click('#search-form > input.search-button');

  await page.waitForSelector('#search-result-items');
  // await page.screenshot({ path: 'screenshot.png' });

  const mobileList = await page.evaluate(() => {
    const list = Array.from(
      document.querySelectorAll(".list-content li[class^='f-']")
    );

    return list.map((li) => {
      return {
        name: li.querySelector(".info > h2").textContent,
        price: li.querySelector(".extra .price").textContent,
      };
    });
  });

  console.log(mobileList);
  
  browser.close();
})();
