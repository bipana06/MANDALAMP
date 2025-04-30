"use client"

import { useEffect, useRef } from "react"
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import ambientNight from "../assets/meditating-music.mp3"

const AudioToggle = ({ audioOn, setAudioOn }) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioOn) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
        setAudioOn(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [audioOn, setAudioOn])

  return (
    <div className="absolute bottom-5 right-5 z-30">
      <audio ref={audioRef} loop src={ambientNight} />
      <button
        onClick={() => setAudioOn(!audioOn)}
        className="text-white text-2xl hover:text-teal-300 transition p-2 bg-gray-900 bg-opacity-50 rounded-full"
        aria-label={audioOn ? "Mute audio" : "Play audio"}
      >
        {audioOn ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
    </div>
  )
}

export default AudioToggle
