const puppeteer = require('puppeteer')
const pagesLUT = require('./pagesLUT')
const autoScroll = require('./autoScroll')

const MAX_IMAGES = 500
const MAX_ITERATIONS = 4

module.exports = async (query, count = 100, level = 3) => {
    if (!query) return { OK: false }
    
    // Clamp count, level and iterations
    count = Math.min(Math.max(count, 1), MAX_IMAGES)
    level = Math.min(Math.max(level, 1), pagesLUT.length)
    const iterations = Math.min(Math.max(count / 50, 1), MAX_ITERATIONS)
    let images = []
    
    // Initializes the browser
    // https://github.com/puppeteer/puppeteer/issues/1718#issuecomment-397532083
    const browser = await puppeteer.launch({ args: [
        '--disable-sync',
        '--proxy-server=\'direct://\'',
        '--proxy-bypass-list=*'
    ], headless: true })
    
    // Scrape the images from each valid site in the Lookup Table
    // Using promises to load each page concurrently
    const promises = []
    for (let i = 0; i < level; i++) {
        const promise = new Promise(async (resolve) => {
            const currentPage = pagesLUT[i]
            const page = await browser.newPage()
            await page.setViewport({ width: 1024, height: 4096 })
            await page.setRequestInterception(true)
            // Intercept and abort any CSS or Font requests
            page.on('request', request => {
                if (request.isInterceptResolutionHandled()) return
                if (['stylesheet', 'font'].includes(request.resourceType())) request.abort()
                else request.continue()
            })
            
            try {
                await page.goto(currentPage.urlBuilder(query), { timeout: 8000, ...currentPage.options })
                await page.waitForSelector(currentPage.selector, { timeout: 1000 })
                
                // Push all the images to the array
                for (let j = 0; j < iterations; j++) {
                    const pageImages = await page.$$eval(currentPage.selector, $ => $.map(i => i.src))
                    images.push(...new Set(pageImages))
                    // Try to scroll down to load more images
                    if (currentPage.loadOnScroll) {
                        await autoScroll(page)
                        await new Promise(res => setTimeout(res, 2000))
                    } else break
                }
            } catch(err) {
                console.log(`Error in '${currentPage.urlBuilder(query)}' with the selector '${currentPage.selector}'`)
            } finally {
                resolve()
            }
        })
        
        promises.push(promise)
    }
    
    await Promise.all(promises)
    images = [...new Set(images.filter(i => i))]
    
    // Limit the size of the array
    while (images.length > count) {
        images.splice(Math.floor(Math.random() * images.length), 1)
    }
    
    await browser.close()
    return { OK: true, data: images  }
}
