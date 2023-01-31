const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 7000

const getImages = require('./components/getImages')

app.use(express.static(__dirname + '/public'))

app.get('/images', async (req, res) => {
    const query = req.query.query
    const count = req.query.count || 100
    const level = req.query.level || 3
    res.send(await getImages(query, count, level))
})

app.listen(PORT, () => console.log('Listening on * ' + PORT))