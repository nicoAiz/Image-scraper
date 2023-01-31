// https://github.com/chenxiaochun/blog/issues/38
module.exports = async page => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0
            let distance = 100
            let timer = setInterval(() => {
                scrollBy(0, distance)
                totalHeight += distance
                
                if (totalHeight >= innerHeight * 1.6) {
                    clearInterval(timer)
                    resolve()
                }
            }, 10)
        })
    })
}