import React, {useState} from 'react'

export default function SOSButton(){
  const [status, setStatus] = useState('')

  async function handleSOS(){
    setStatus('locating')
    if(!navigator.geolocation){
      setStatus('Geolocation not supported')
      return
    }
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setStatus(`Location shared: ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`)
      window.open('tel:911')
    }, err => {
      setStatus('Location failed: ' + err.message)
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={handleSOS} className="bg-red-500 text-white p-4 rounded-full shadow-lg w-20 h-20 flex items-center justify-center text-lg font-bold">SOS</button>
      <div className="text-sm mt-2 text-right text-gray-700">{status}</div>
    </div>
  )
}