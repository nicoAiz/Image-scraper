const puppeteer = require('puppeteer')
const sitesLUT = require('./sitesLUT')
const autoScroll = require('./autoScroll')

const MAX_IMAGES = 1000

module.exports = async (query, count = 100, level = 3) => {
  if (!query) return { OK: false }

  // Clamp count to 1 and MAX_IMAGES
  count = Math.min(Math.max(count, 1), MAX_IMAGES)

  // Clamp level to 1 and lookups.length
  level = Math.min(Math.max(level, 1), sitesLUT.length)

  console.log('query -> ' + query)
  console.log('count -> ' + count)
  console.log('level -> ' + level)

  // Load the browser
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 2000, height: 2000 })

  let images = []

  // Scrape the images from each valid site in the LUT
  for (let i = 0; i < level; i++) {
    const site = sitesLUT[i]
    const url = site.builder(query)
    const imgSelector = site.selector
    await page.goto(url)

    try {
      await page.waitForSelector(imgSelector, { timeout: 1000 })
      // Scroll to load more images
      for (let j = 0; j < 3; j++) {
        images.push(...await page.$$eval(imgSelector, m => m.map(i => i.src)))
        await autoScroll(page)
      }
    } catch(err) { console.log(url, imgSelector) }
  }

  images = images.filter(i => i)

  // Limit the size of the array
  while (images.length > count) {
    images.splice(Math.floor(Math.random() * images.length), 1)
  }

  console.log('Done')

  await browser.close()
  return {
    OK: true,
    data: images
  }
}
