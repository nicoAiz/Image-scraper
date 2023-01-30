module.exports = [
  {
    builder: query => `https://www.google.com/search?q=${query}&tbm=isch`,
    selector: '.rg_i'
  },
  {
    builder: query => `https://www.deviantart.com/search?q=${query}`,
    selector: '._3_LJY img'
  },
  {
    builder: query => `https://www.artstation.com/search?query=${query}`,
    selector: '.gallery-grid-overlay img'
  },
  {
    builder: query => `https://imgur.com/search?q=${query}`,
    selector: '.post'
  },
  {
    builder: query => `https://www.freeimages.com/search/${query}`,
    selector: '.grid-image'
  },
  {
    builder: query => `https://www.pexels.com/pt-br/procurar/${query}`,
    selector: '.MediaCard_image__ljFAl'
  }
]