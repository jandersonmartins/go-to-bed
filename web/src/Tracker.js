import React, { useRef, useEffect } from 'react'
import '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import './Tracker.css'

const App = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: 'user'
          }
        })
        .then(stream => {
          window.stream = stream
          videoRef.current.srcObject = stream
          return new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              resolve()
            }
          })
        })

      const modelPromise = cocoSsd.load()

      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          detectFrame(videoRef.current, values[0])
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  const detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      renderPredictions(predictions)
      requestAnimationFrame(() => {
        detectFrame(video, model)
      })
    })
  }

  const drawBox = (ctx, font, prediction) => {
    const x = prediction.bbox[0]
    const y = prediction.bbox[1]
    const width = prediction.bbox[2]
    const height = prediction.bbox[3]
    // Draw the bounding box.
    ctx.strokeStyle = '#00FFFF'
    ctx.lineWidth = 4
    ctx.strokeRect(x, y, width, height)
    // Draw the label background.
    ctx.fillStyle = '#00FFFF'
    const textWidth = ctx.measureText(prediction.class).width
    const textHeight = parseInt(font, 10) // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4)
  }

  const drawText = (ctx, prediction) => {
    const x = prediction.bbox[0]
    const y = prediction.bbox[1]
    // Draw the text last to ensure it's on top.
    ctx.fillStyle = '#000000'
    ctx.fillText(prediction.class, x, y)
  }

  const renderPredictions = predictions => {
    const video = videoRef.current
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // Font options.
    const font = '16px sans-serif'
    ctx.font = font
    ctx.textBaseline = 'top'
    ctx.drawImage(video, 0, 0, video.width, video.height)
    predictions.forEach(prediction => {
      drawBox(ctx, font, prediction)
      drawText(ctx, prediction)

      if (prediction.class === 'person') {
        upload(canvasRef.current)
      }
    })
  }

  const upload = canvas => {
    canvas.toBlob(blob => {
      const formData = new FormData()
      formData.append('photo', blob, Date.now().toString())

      fetch('http://localhost:3333/upload-photo', {
        method: 'POST',
        body: formData
      }).catch(() => { /* ignoring */ })
    }, 'image/jpeg', 0.95)
  }

  return (
    <div className="tracker">
      <video
        className="video"
        autoPlay
        playsInline
        muted
        ref={videoRef}
        width="600"
        height="500"
      />
      <canvas
        className="video"
        ref={canvasRef}
        width="600"
        height="500"
      />
    </div>
  )
}

export default App
