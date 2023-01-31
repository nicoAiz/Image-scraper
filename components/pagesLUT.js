module.exports = [
    {
        urlBuilder: query => `https://www.google.com/search?q=${query}&tbm=isch`,
        selector: '#islrg > div.islrc > div img',
        loadOnScroll: true,
    },
    {
        urlBuilder: query => `https://www.deviantart.com/search?q=${query}`,
        selector: '._3_LJY img',
        loadOnScroll: false,
    },
    {
        urlBuilder: query => `https://www.artstation.com/search?query=${query}`,
        selector: 'projects-list-item img',
        loadOnScroll: true,
        options: {
            waitMethod: 'networkidle2'
        }
    },
    {
        urlBuilder: query => `https://imgur.com/search?q=${query}`,
        selector: '.post img',
        loadOnScroll: true,
    },
    {
        urlBuilder: query => `https://www.freeimages.com/search/${query}`,
        selector: '#istock-block-top > div.istock-block.relative > div.relative.overflow-hidden > div img',
        loadOnScroll: false,
    },
    {
        urlBuilder: query => `https://www.pexels.com/pt-br/procurar/${query}`,
        selector: '[data-testid] > div img',
        loadOnScroll: true,
    },
]