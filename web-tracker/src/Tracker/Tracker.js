import React, { useState, useRef, useEffect } from 'react'
import { upload } from './upload'
import { renderPredictions, clear } from './prediction-renderer'
import { DetectionModel, getModel } from './detection-model'
import './Tracker.css'

const detection = new DetectionModel()

const App = () => {
  const [trackEnabled, setTrack] = useState(true)
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

      const modelPromise = getModel()

      Promise
        .all([modelPromise, webCamPromise])
        .then(([model, video]) => initPredictions(model, video))
        .catch(error => {
          // :)
        })
    }
  }, [])

  const initPredictions = model => {
    const video = videoRef.current

    detection.init({
      model,
      video,
      onPredictions: predictions => {
        renderPredictions({
          predictions,
          video,
          canvas: canvasRef.current,
          onPrediction: predictionClass => {
            if (predictionClass === 'person') {
              upload(canvasRef.current)
            }
          }
        })
      }
    })
  }

  const btnPrefix = () => trackEnabled ? 'Stop' : 'Start'

  const handleClick = () => {
    if (trackEnabled) {
      detection.stop()
      clear(canvasRef.current)
    } else {
      detection.start()
    }

    setTrack(!trackEnabled)
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>{btnPrefix()} Track</button>
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
    </div>
  )
}

export default App
