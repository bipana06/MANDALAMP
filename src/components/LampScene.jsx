"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import InfoModal from './InfoModal'; 
import AudioToggle from './AudioToggle'; 
import MandalaImageFile from '../assets/mandala-day.png'; 


const formatHour = (time) => {
  const h = Math.floor(time) % 24;
  const m = Math.round((time % 1) * 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  const displayMinutes = String(m).padStart(2, '0');
  return `${displayHour}:${displayMinutes} ${ampm}`;
};


const getCircadianProperties = (hour) => {
  let lightColor = 'rgba(255, 223, 186, 0.7)'; // Default: Morning
  let lampGlowColor = 'rgba(255, 223, 186, 0.9)';
  let lightPhaseDescription = "Morning Light: Warm tones to gently start the day.";
  let overlayColor = 'rgba(255, 223, 186, 0.5)';

  if (hour >= 9 && hour < 17) {
    // Daylight
    lightColor = 'rgba(240, 248, 255, 0.7)';
    lampGlowColor = 'rgba(240, 248, 255, 1)';
    lightPhaseDescription = "Daylight Spectrum: Bright, cool light for focus and productivity.";
    overlayColor = 'rgba(240, 248, 255, 0.5)';
  } else if (hour >= 17 && hour < 20) {
    // Evening
    lightColor = 'rgba(210, 180, 140, 0.6)';
    lampGlowColor = 'rgba(210, 180, 140, 0.8)';
    lightPhaseDescription = "Evening Light: Warm, dim light to promote winding down.";
    overlayColor = 'rgba(210, 180, 140, 0.5)';
  } else if ((hour >= 20 && hour <= 23) || (hour >= 0 && hour < 4)) {
    // Deep Night
    lightColor = 'rgba(139, 69, 19, 0.5)';
    lampGlowColor = 'rgba(139, 69, 19, 0.7)';
    lightPhaseDescription = "Deep Night: Minimal warm light to avoid disrupting sleep.";
    overlayColor = 'rgba(139, 69, 19, 0.4)';
  } else if (hour >= 4 && hour < 9) {
    // Morning
    lightColor = 'rgba(255, 223, 186, 0.7)';
    lampGlowColor = 'rgba(255, 223, 186, 0.9)';
    lightPhaseDescription = "Morning Light: Warm tones to gently start the day.";
    overlayColor = 'rgba(255, 223, 186, 0.5)';
  }

  return { lightColor, lampGlowColor, lightPhaseDescription, overlayColor };
};


// --- Mandala Light Component ---
const MandalaLight = ({ overlayColor, effectiveHour }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const mandalaImage = useRef(null);

  // Load Mandala Image
  useEffect(() => {
    mandalaImage.current = new Image();
    mandalaImage.current.src = MandalaImageFile; 
    mandalaImage.current.onload = () => setImageLoaded(true);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []); 

  // Animate Mandala on Canvas
  useEffect(() => {
    if (!imageLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rotation = 0;
    let scale = 1;
    let scaleDirection = 0.0005; 

    const canvasSize = 350; 
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const drawRotatingMandala = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = canvas.width * 0.9 * scale;

      ctx.save(); // Save context state
      ctx.translate(centerX, centerY); // Move origin to center
      ctx.rotate(rotation); // Rotate context

      // Draw the mandala image centered
      ctx.drawImage(mandalaImage.current, -size / 2, -size / 2, size, size);

      // Apply the overlay color as a tint ON the drawn image
      ctx.globalCompositeOperation = 'source-atop'; 
      ctx.fillStyle = overlayColor;
      ctx.fillRect(-size / 2, -size / 2, size, size); 

      ctx.restore(); 

      // Update rotation (slower at night)
      const rotationSpeed = effectiveHour >= 17 || effectiveHour < 5 ? 0.0008 : 0.002;
      rotation += rotationSpeed;

      // Update scale for breathing effect
      scale += scaleDirection;
      if (scale > 1.03 || scale < 0.97) { // Subtle breathing range
        scaleDirection *= -1; // Reverse direction
      }

      // Request next frame
      animationRef.current = requestAnimationFrame(drawRotatingMandala);
    };

    // Stop previous animation frame before starting a new one
    if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
    }
    drawRotatingMandala(); // Start the animation loop

    // Cleanup function for this effect instance
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [imageLoaded, overlayColor, effectiveHour]); // Rerun animation if image, color, or hour changes

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[85%] z-0 pointer-events-none opacity-60" 
      height={350}
    />
  );
};

const ControlPanel = ({
    useRealTime,
    setUseRealTime,
    manualHour,
    setManualHour,
    effectiveHour,
    lightPhaseDescription,
    setIsModalOpen,
    audioOn,
    setAudioOn
}) => {
  const handleSliderChange = (e) => {
    setManualHour(parseInt(e.target.value, 10));
    if (useRealTime) setUseRealTime(false); // Switch to manual on slider use
  };

  return (
    <div
    className="absolute bottom-10 left-8 bg-gray-900 text-white p-8 rounded-xl shadow-xl border border-gray-700 max-w-3xl w-8/12 mx-auto mt-8 z-20 transform translate-x-4"
    style={{ marginLeft: '5rem' }} // Push it slightly to the left
  >
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-200 uppercase tracking-wide">Time</span>
          <span className="text-2xl font-semibold text-yellow-400">{formatHour(effectiveHour)}</span>
        </div>
        <div className="flex space-x-2">

           <button
            onClick={() => setUseRealTime(!useRealTime)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition duration-200 ease-in-out ${
              useRealTime
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : 'bg-teal-500 hover:bg-teal-600 text-white'
            }`}
          >
            {useRealTime ? 'Manual Time' : 'Live Time'}
          </button>
        </div>
      </div>

      <label htmlFor="timeSlider" className="block text-xs text-gray-200 mb-1 uppercase tracking-wide">
        Adjust Time {useRealTime ? "(Live)" : "(Manual)"}
      </label>
      <input
        id="timeSlider"
        type="range"
        min="0"
        max="23"
        step="1"
        value={manualHour}
        onChange={handleSliderChange}
        className={`w-full h-2 rounded-full cursor-pointer accent-yellow-400 ${useRealTime ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
        disabled={useRealTime}
      />
      <div className="flex justify-between text-xs text-gray-300 mt-1 px-1">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11 PM</span>
      </div>

      <div className="mt-6 bg-gray-700 p-4 rounded-lg shadow-md">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Current Light Phase:</span>
        <p className="text-lg mt-1 text-gray-100">{lightPhaseDescription}</p>
      </div>

      {/* Buttons Container */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
         <AudioToggle audioOn={audioOn} setAudioOn={setAudioOn} />
         <button
          className="flex items-center space-x-1 text-gray-300 hover:text-teal-300 transition text-sm p-1 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
          onClick={() => setIsModalOpen(true)}
          aria-label="Information"
        >
          <span>ⓘ</span>
          <span>Info</span>
        </button>
      </div>
    </div>
  );
};


// --- Main LampScene Component ---
const LampScene = () => {
  const [realTime, setRealTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [useRealTime, setUseRealTime] = useState(true);
  const [manualHour, setManualHour] = useState(new Date().getHours());

  useEffect(() => {
    let timerId;
    if (useRealTime) {
      setRealTime(new Date()); // Update immediately
      timerId = setInterval(() => setRealTime(new Date()), 60000); // Update every minute
    }
    return () => clearInterval(timerId);
  }, [useRealTime]);


  useEffect(() => {
    if (useRealTime) {
      setManualHour(realTime.getHours());
    }
  }, [realTime, useRealTime]);

  // Calculate effective hour and corresponding light properties
  const effectiveHour = useRealTime
  ? realTime.getHours() + realTime.getMinutes() / 60
  : manualHour;

  const { lightColor, lampGlowColor, lightPhaseDescription, overlayColor } = getCircadianProperties(effectiveHour); // Added overlayColor

  return (

    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col justify-between items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 font-sans"
    >
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
      className="absolute top-40 left-20 z-50"
    >
      <motion.h1
        whileHover={{
          scale: 1.05,
          textShadow: "0px 0px 20px rgba(255, 119, 72, 0.9)",
        }}
        style={{ fontSize: '5.5rem', fontFamily: 'Bebas Neue, sans-serif', color:" #c8b59c" }}
        className="text-[6rem] font-extrabold drop-shadow-2xl tracking-[0.05em] glow-orange shadow-lg" 
      >
        MANDALAMP
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-3xl text-orange-300 mt-2 tracking-wide text-center w-full"
      >
        like the sun in your room
      </motion.p>

      <div className="h-1 mt-4 bg-gradient-to-r from-transparent via-white to-transparent w-full max-w-2xl mx-auto blur" />
    </motion.div>


      <div className="absolute -bottom-8 -right-8 z-10 flex flex-col items-center justify-end scale-[2] md:scale-[2.5] lg:scale-[3] origin-bottom-right pointer-events-none">

         {/* Mandala Canvas (Behind Lamp Parts) */}
         <MandalaLight overlayColor={overlayColor} effectiveHour={effectiveHour} />

        {/* Main Light Glow (emanating from lamp bulb area) */}
        <div
          className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none transition-colors duration-1000 ease-in-out z-10" // Ensure glow is above mandala (z-10 > z-0)
          style={{ background: lightColor, opacity: 0.7 }}
        />

        {/* Lamp Structure (Higher z-index than mandala and glow) */}
        <div className="relative z-20 flex flex-col items-center mb-[-1px]">
          {/* Lampshade */}
          <div className="w-28 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-full shadow-md border-b-4 border-gray-500 relative overflow-hidden">
            {/* Inner glow for bulb */}
            <div className="absolute inset-0 rounded-t-full blur-md transition-colors duration-1000 ease-in-out" style={{ background: lampGlowColor, opacity: 0.9 }} />
          </div>
          {/* Stem */}
          <div className="w-2 h-24 bg-gradient-to-b from-gray-600 to-gray-800 shadow-inner"></div>
          {/* Base */}
          <div className="w-10 h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-sm shadow-md"></div>
        </div>

        {/* Table Structure */}
        <div className="relative mt-[-2px] z-20 flex flex-col items-center"> {/* z-20 ensures it's above mandala */}
          {/* Tabletop */}
          <div className="w-48 h-5 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-full shadow-lg"></div>
          {/* Legs */}
          <div className="relative w-40 h-12 mt-[-5px]">
            <div className="absolute top-0 left-[15%] w-2 h-full bg-gradient-to-b from-yellow-800 to-yellow-950 rounded-b-sm shadow-md -skew-x-6"></div>
            <div className="absolute top-0 right-[15%] w-2 h-full bg-gradient-to-b from-yellow-800 to-yellow-950 rounded-b-sm shadow-md skew-x-6"></div>
          </div>
          {/* Shadow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-44 h-3 bg-black bg-opacity-30 rounded-full blur-md mt-[-45px]"></div> {/* Shadow likely fine at default z-index */}
        </div>
      </div> 


      {/* Control Panel (Positioned Bottom Left) */}
      <ControlPanel
        useRealTime={useRealTime}
        setUseRealTime={setUseRealTime}
        manualHour={manualHour}
        setManualHour={setManualHour}
        effectiveHour={effectiveHour}
        lightPhaseDescription={lightPhaseDescription}
        setIsModalOpen={setIsModalOpen}
        audioOn={audioOn}
        setAudioOn={setAudioOn}
      />

      {/* Modal (Overlay) */}
      {isModalOpen && <InfoModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default LampScene;