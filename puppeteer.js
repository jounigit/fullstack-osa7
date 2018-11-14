const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250       // jokainen operaatio kestää nyt 0.25 sekuntia
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  console.log(await page.content())
  await page.type('input[name="username"]', 'tollo')
  await page.type('input[name="password"]', 'passi')
  await page.screenshot({ path: 'kuvaInput_2.png' })

  await browser.close()
}

main()
