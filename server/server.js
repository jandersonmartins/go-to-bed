const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const redis = require('redis')

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
})

app.post('/upload-photo', (req, res) => {
  redisClient.hset('photos', Date.now(), req.body.base64)

  res.end()
})

app.get('/photos', (_, res) => {
  redisClient.hgetall('photos', (err, photosEntry) => {
    if (!photosEntry) {
      return res.json({ photos: [] })
    }

    const photos = Object
      .entries(photosEntry)
      .map(([_, base64]) => base64)

    res.json({ photos })
  })
})

app.listen(3333, () => console.log('running'))
