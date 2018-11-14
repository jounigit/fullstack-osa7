const puppeteer = require('puppeteer')

const user = {
  username: 'herray',
  password: 'passiy'
}/**/

describe('E2E, Blog app', () => {
  let browser
  let page

  beforeAll(async () => {
    jest.setTimeout(1600000)
    browser = await puppeteer.launch({
      //headless: false,
      //devtools: true,
      //slowMo: 250
    })
    page = await browser.newPage()
  })

  beforeEach(async () => {
    page = await browser.newPage()
  })

  afterAll(() => {
    browser.close()
  })

  test('see Login page', async () => {
    await page.goto('http://localhost:3000')
    await page.waitForSelector('.card')
    //console.log(await page.content())
    //await expect(page).toMatch('Kirjaudu sovellukseen')

    const textContent = await page.$eval('body', el => el.textContent)
    expect(textContent.includes('Kirjaudu sovellukseen')).toBe(true)
  }, 1600000)

  test('not loggedin user', async () => {
    await page.goto('http://localhost:3000/blogs/1')
    await expect(page).toMatch('Kirjaudu sovellukseen')
  })

  test('users can login', async () => {
    await page.goto('http://localhost:3000')
    await page.waitForSelector('.card')

    await page.click('input[name=username]')
    await page.type('input[name=username]', user.username)
    await page.click('input[name=password]')
    await page.type('input[name=password]', user.password)
    await page.click('button[role=button]')
    await page.waitForSelector('.segments')
  }, 1600000)

})

/*
test('users can login', async () => {
  jest.setTimeout(1600000)
  await page.waitForSelector('.card')

  await page.click('input[name=username]')
  await page.type('input[name=username]', user.username)
  await page.click('input[name=password]')
  await page.type('input[name=password]', user.password)
  await page.click('button[role=button]')
  //await page.waitForSelector('.segments')
  await page.waitForSelector('.container')
}, 1600000)
*/
