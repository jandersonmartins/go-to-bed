const renderPredictions = ({
  predictions,
  video,
  canvas,
  onPrediction
}) => {
  const ctx = canvas.getContext('2d')

  // clear
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Font options.
  const font = '16px sans-serif'
  ctx.font = font
  ctx.textBaseline = 'top'

  ctx.drawImage(video, 0, 0, video.width, video.height)

  predictions.forEach(prediction => {
    drawBox(ctx, font, prediction)
    drawText(ctx, prediction)

    onPrediction(prediction.class)
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

const clear = canvas => {
  const ctx = canvas.getContext('2d')

  // clear
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export { renderPredictions, clear }
