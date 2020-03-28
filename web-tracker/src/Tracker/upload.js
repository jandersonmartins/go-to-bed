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

export { upload }
