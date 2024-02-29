import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { MapIcon } from './MapIcon';

const center = [40.714, -74.0059]
const zoom = 30


function DisplayPosition({ map, setLatitude, setLongitude }) {
  const [position, setPosition] = useState(() => map.getCenter())

  // const onClick = useCallback(() => {
  //   map.setView(center, zoom)
  // }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  useEffect(() => {
    setLatitude(position.lat)
    setLongitude(position.lng)
  }, [position, setLatitude, setLongitude])

}

export function Map({longitude, latitude, setLatitude, setLongitude }) {
    const [map, setMap] = useState(null)

    const displayMap = useMemo(
      () => (
        <MapContainer
          style={{ height: "50vh", borderRadius: 15 }}
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          ref={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
          </Marker>
        </MapContainer>
      ),
      [latitude, longitude],
    )
  
    return (
      <div>
        { map 
          ? 
            <DisplayPosition map={map} setLatitude={setLatitude} setLongitude={setLongitude} /> 
          : 
            null
        }
        {displayMap}
      </div>
    )
  }