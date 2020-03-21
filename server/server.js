const { join } = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

let index = 0

app.use(cors())
app.use(fileUpload())

app.post('/upload-photo', (req, res) => {
  const fullPath = join(__dirname, 'photos', `${++index}.jpeg`)
  req.files.photo.mv(fullPath, err => {
    // ignoring error for now :)
    res.end()
  })
})

app.listen(3333, () => console.log('running'))
