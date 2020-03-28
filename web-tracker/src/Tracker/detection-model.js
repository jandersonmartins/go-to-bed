import '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

const getModel = () => cocoSsd.load()

class DetectionModel {
  constructor () {
    this.running = false
  }

  init (args) {
    this.start()
    this.detectFrame(args)
  }

  start () {
    this.running = true
  }

  stop () {
    this.running = false
  }

  detectFrame ({ video, model, onPredictions }) {
    if (this.running) {
      return model.detect(video).then(predictions => {
        onPredictions(predictions)

        requestAnimationFrame(() => {
          this.detectFrame({ video, model, onPredictions })
        })
      })
    }

    setTimeout(() =>
      // delay a little :)
      this.detectFrame({ video, model, onPredictions }), 1000)
  }
}

export { DetectionModel, getModel }
