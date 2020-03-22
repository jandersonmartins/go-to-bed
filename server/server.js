const { join } = require('path')
const { readdir } = require('fs')
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
const photosPath = join(__dirname, 'photos')

let index = 0

app.use(cors())
app.use(fileUpload())

app.post('/upload-photo', (req, res) => {
  const fullPath = join(photosPath, `${++index}.jpeg`)
  req.files.photo.mv(fullPath, err => {
    // ignoring error for now :)
    res.end()
  })
})

app.get('/photos', (req, res) => {
  readdir('./photos', (e, photos) => {
    const photosUrl = photos
      .filter(photo => photo.match(/jpeg/))
      .map(photo => `http://192.168.25.110:3333/uploads/${photo}`)

    res.json({ photos: photosUrl })
  })
})

app.use('/uploads', express.static(photosPath))

app.listen(3333, () => console.log('running'))
