const uploadQueue = () => {
  const queue = []

  const enqueue = canvas => queue.push(canvas.toDataURL('image/png'))

  const run = () => {
    const current = queue.shift()
    if (!current) {
      return setTimeout(run, 1000)
    }

    fetch('http://localhost:3333/upload-photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ base64: current })
    })
    .then(run)
    .catch(run)
  }

  return { enqueue, run }
}

export { uploadQueue }
