// https://github.com/chenxiaochun/blog/issues/38
module.exports = async page => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0
      let distance = 500
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance

        if(totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 20)
    })
  })
}