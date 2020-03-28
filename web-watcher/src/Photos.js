import React, { useState, useEffect } from 'react'
import './Photos.css'

const Photos = () => {
  const [photos, setPhotos] = useState([])

  const fetchPhotos = async () => {
    const res = await fetch('http://192.168.25.110:3333/photos', {
      method: 'GET'
    })

    const json = await res.json()

    setPhotos(json.photos)
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <div>
      <button type="button" onClick={fetchPhotos}>Reload</button>
      {!!photos.length && (
        <div>
          {photos.map(url =>
            <div key={url}>
              <img className="photo" src={url} alt="Tracked"/>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default Photos
