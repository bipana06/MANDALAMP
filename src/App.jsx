// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from '/vite.svg'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <div>
// // //         <a href="https://vite.dev" target="_blank">
// // //           <img src={viteLogo} className="logo" alt="Vite logo" />
// // //         </a>
// // //         <a href="https://react.dev" target="_blank">
// // //           <img src={reactLogo} className="logo react" alt="React logo" />
// // //         </a>
// // //       </div>
// // //       <h1>Vite + React</h1>
// // //       <div className="card">
// // //         <button onClick={() => setCount((count) => count + 1)}>
// // //           count is {count}
// // //         </button>
// // //         <p>
// // //           Edit <code>src/App.jsx</code> and save to test HMR
// // //         </p>
// // //       </div>
// // //       <p className="read-the-docs">
// // //         Click on the Vite and React logos to learn more
// // //       </p>
// // //     </>
// // //   )
// // // }

// // // export default App

// // // import React, { useState, useMemo } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Info, X } from 'lucide-react'; // Using lucide-react for icons

// // // // --- Configuration for Circadian Phases ---
// // // const circadianPhases = {
// // //   dawn: {
// // //     startHour: 5, // 5 AM
// // //     endHour: 8,   // Up to 8 AM (exclusive)
// // //     bgColor: '#FFDAB9', // PeachPuff - warm, soft
// // //     textColor: '#4A2E00', // Dark brown
// // //     phaseName: 'Dawn',
// // //     explanation: 'As dawn approaches, warm light signals the Suprachiasmatic Nucleus (SCN) in your brain. This gradually suppresses melatonin production and initiates the release of cortisol, gently waking your body and preparing you for the day.'
// // //   },
// // //   day: {
// // //     startHour: 8,
// // //     endHour: 17, // Up to 5 PM
// // //     bgColor: '#ADD8E6', // LightBlue - bright, cool
// // //     textColor: '#003366', // Dark blue
// // //     phaseName: 'Day',
// // //     explanation: 'Bright, cooler light during the day keeps melatonin levels low and supports alertness and cognitive function. The SCN uses this strong light signal to firmly anchor your internal clock to the daytime.'
// // //   },
// // //   dusk: {
// // //     startHour: 17,
// // //     endHour: 21, // Up to 9 PM
// // //     bgColor: '#FFB6C1', // LightPink / Amber - warm, dimming
// // //     textColor: '#5C001E', // Dark red/purple
// // //     phaseName: 'Dusk',
// // //     explanation: 'As light dims and warms in the evening, the SCN receives the signal to start winding down. Reducing exposure to blue light allows melatonin production to begin its rise, preparing your body for sleep.'
// // //   },
// // //   night: {
// // //     startHour: 21,
// // //     endHour: 5, // Wraps around midnight
// // //     bgColor: '#191970', // MidnightBlue - very dark
// // //     textColor: '#E0E0FF', // Light lavender/white
// // //     phaseName: 'Night',
// // //     explanation: 'In darkness or very dim, warm light, melatonin levels peak, promoting sleep and allowing the body to perform restorative functions. Avoiding bright, especially blue, light is crucial for maintaining sleep quality.'
// // //   }
// // // };

// // // // --- Helper Function to Get Phase Details ---
// // // function getCircadianPhase(hour) {
// // //   // Normalize hour to be within 0-23
// // //   const currentHour = hour % 24;

// // //   for (const phaseKey in circadianPhases) {
// // //     const phase = circadianPhases[phaseKey];
// // //     // Handle night phase wrapping around midnight
// // //     if (phase.startHour > phase.endHour) { // e.g., Night starts at 21, ends at 5
// // //       if (currentHour >= phase.startHour || currentHour < phase.endHour) {
// // //         return phase;
// // //       }
// // //     } else { // Normal phases (Dawn, Day, Dusk)
// // //       if (currentHour >= phase.startHour && currentHour < phase.endHour) {
// // //         return phase;
// // //       }
// // //     }
// // //   }
// // //   // Default fallback (should ideally not be reached with proper config)
// // //   return circadianPhases.night;
// // // }

// // // // --- Simple Placeholder Mandala SVG Component ---
// // // // You can replace this with a more complex SVG or an <img> tag if you have a specific design
// // // function Mandala() {
// // //   return (
// // //     <svg
// // //       viewBox="0 0 100 100"
// // //       className="absolute inset-0 m-auto w-3/4 h-3/4 max-w-md max-h-md opacity-15 pointer-events-none"
// // //       fill="none"
// // //       stroke="currentColor" // Color will be inherited or can be set explicitly
// // //       strokeWidth="1"
// // //       xmlns="http://www.w3.org/2000/svg"
// // //     >
// // //       {/* Outer circle */}
// // //       <circle cx="50" cy="50" r="48" />
// // //       {/* Inner circles */}
// // //       <circle cx="50" cy="50" r="35" />
// // //       <circle cx="50" cy="50" r="22" />
// // //       {/* Petals (example) */}
// // //       {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
// // //         <ellipse
// // //           key={angle}
// // //           cx="50"
// // //           cy="50"
// // //           rx="15"
// // //           ry="30"
// // //           transform={`rotate(${angle} 50 50)`}
// // //           strokeWidth="0.5"
// // //         />
// // //       ))}
// // //       {/* Center dot */}
// // //       <circle cx="50" cy="50" r="5" fill="currentColor" />
// // //     </svg>
// // //   );
// // // }


// // // // --- Main Application Component ---
// // // function App() {
// // //   // State for the current hour (0-23), initialized to user's actual current hour
// // //   const [currentHour, setCurrentHour] = useState(new Date().getHours());
// // //   // State for info pop-up visibility
// // //   const [showInfo, setShowInfo] = useState(false);

// // //   // Calculate current phase details based on currentHour using useMemo for optimization
// // //   const phaseDetails = useMemo(() => getCircadianPhase(currentHour), [currentHour]);

// // //   // Handle slider change
// // //   const handleSliderChange = (event) => {
// // //     setCurrentHour(parseInt(event.target.value, 10));
// // //   };

// // //   // Format time for display (e.g., 14 -> 2:00 PM)
// // //   const formattedTime = useMemo(() => {
// // //     const hour12 = currentHour % 12 === 0 ? 12 : currentHour % 12; // Convert 0 to 12 for 12 AM/PM
// // //     const ampm = currentHour < 12 || currentHour === 24 ? 'AM' : 'PM'; // Handle midnight/noon
// // //     // Pad hour if needed (though not strictly necessary for 1-12)
// // //     // const paddedHour = String(hour12).padStart(2, '0');
// // //     return `${hour12}:00 ${ampm}`; // Displaying only the hour for simplicity
// // //   }, [currentHour]);

// // //   return (
// // //     // --- Main Container ---
// // //     // Uses Framer Motion to animate the background color
// // //     <motion.div
// // //       className="relative flex flex-col items-center justify-center min-h-screen w-full font-sans overflow-hidden p-4"
// // //       // Animate background color based on the current phase
// // //       animate={{ backgroundColor: phaseDetails.bgColor }}
// // //       // Define the transition properties for smoothness
// // //       transition={{ duration: 1.5, ease: "easeInOut" }}
// // //       // Style text color based on the current phase for contrast
// // //       style={{ color: phaseDetails.textColor }}
// // //     >
// // //       {/* --- Mandala Overlay --- */}
// // //       {/* Inherits text color from parent, adjust opacity as needed */}
// // //       <Mandala />

// // //       {/* --- Content Area --- */}
// // //       {/* z-10 ensures content is above the background/mandala */}
// // //       <div className="relative z-10 flex flex-col items-center space-y-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-lg w-full text-center">

// // //         {/* Title */}
// // //         <h1 className="text-3xl md:text-4xl font-bold" style={{ color: phaseDetails.textColor }}>
// // //           Circadian Rhythm Simulator
// // //         </h1>

// // //         {/* Time and Phase Display */}
// // //         <div className="text-xl md:text-2xl" style={{ color: phaseDetails.textColor }}>
// // //           <div className="font-semibold">Time: {formattedTime} ({currentHour}:00)</div>
// // //           <div className="mt-1">Phase: <span className="font-bold">{phaseDetails.phaseName}</span></div>
// // //         </div>

// // //         {/* Info Button */}
// // //         <button
// // //           onClick={() => setShowInfo(true)}
// // //           className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 transition-colors shadow"
// // //           style={{ color: phaseDetails.textColor }} // Ensure button text is readable
// // //           aria-label="Show neuroscience information"
// // //         >
// // //           <Info size={20} />
// // //           <span>How does this work?</span>
// // //         </button>

// // //         {/* Time Slider */}
// // //         <div className="w-full pt-4">
// // //           <label htmlFor="time-slider" className="block text-sm font-medium mb-2" style={{ color: phaseDetails.textColor }}>
// // //             Adjust Time (0-23 hours)
// // //           </label>
// // //           <input
// // //             id="time-slider"
// // //             type="range"
// // //             min="0"
// // //             max="23" // Represents hours 0 through 23
// // //             step="1" // Increment by 1 hour
// // //             value={currentHour}
// // //             onChange={handleSliderChange}
// // //             className="w-full h-2 bg-gray-200/50 rounded-lg appearance-none cursor-pointer dark:bg-gray-700/50 accent-white/80 dark:accent-black/80"
// // //             aria-label="Time adjustment slider"
// // //           />
// // //           {/* Optional: Display numerical value of slider */}
// // //           {/* <div className="text-xs mt-1">{currentHour}:00</div> */}
// // //         </div>
// // //       </div> {/* End Content Area */}

// // //       {/* --- Information Pop-up Modal --- */}
// // //       {/* AnimatePresence handles the mounting/unmounting animation */}
// // //       <AnimatePresence>
// // //         {showInfo && (
// // //           // Modal Backdrop (semi-transparent overlay)
// // //           <motion.div
// // //             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //             onClick={() => setShowInfo(false)} // Close modal on backdrop click
// // //           >
// // //             {/* Modal Content Box */}
// // //             <motion.div
// // //               className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full relative text-gray-800 dark:text-gray-200"
// // //               initial={{ scale: 0.9, opacity: 0 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               exit={{ scale: 0.9, opacity: 0 }}
// // //               transition={{ type: "spring", stiffness: 300, damping: 25 }}
// // //               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
// // //             >
// // //               {/* Close Button (Top Right) */}
// // //               <button
// // //                 onClick={() => setShowInfo(false)}
// // //                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
// // //                 aria-label="Close information pop-up"
// // //               >
// // //                 <X size={24} />
// // //               </button>

// // //               {/* Modal Title */}
// // //               <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: phaseDetails.textColor }}>
// // //                 Neuroscience: {phaseDetails.phaseName} Phase
// // //               </h2>

// // //               {/* Explanation Text */}
// // //               <p className="text-sm leading-relaxed">
// // //                 {phaseDetails.explanation}
// // //               </p>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //     </motion.div> // End Main Container
// // //   );
// // // }

// // // export default App;

// // "use client"

// // import React from "react"

// // import { useState, useMemo, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { Info, X, Moon, Sun, Sunrise, Sunset } from "lucide-react"
// // // import { cn } from "@/lib/utils"
// // // import Mandala from "@/components/mandala"
// // // import { Button } from "@/components/ui/button"
// // // import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// // // Configuration for Circadian Phases
// // const circadianPhases = {
// //   dawn: {
// //     startHour: 5, // 5 AM
// //     endHour: 8, // Up to 8 AM (exclusive)
// //     bgGradient: "from-amber-200 via-orange-100 to-sky-200",
// //     textColor: "text-amber-950",
// //     phaseName: "Dawn",
// //     icon: Sunrise,
// //     explanation:
// //       "As dawn approaches, warm light signals the Suprachiasmatic Nucleus (SCN) in your brain. This gradually suppresses melatonin production and initiates the release of cortisol, gently waking your body and preparing you for the day.",
// //   },
// //   day: {
// //     startHour: 8,
// //     endHour: 17, // Up to 5 PM
// //     bgGradient: "from-sky-300 via-blue-200 to-sky-300",
// //     textColor: "text-blue-950",
// //     phaseName: "Day",
// //     icon: Sun,
// //     explanation:
// //       "Bright, cooler light during the day keeps melatonin levels low and supports alertness and cognitive function. The SCN uses this strong light signal to firmly anchor your internal clock to the daytime.",
// //   },
// //   dusk: {
// //     startHour: 17,
// //     endHour: 21, // Up to 9 PM
// //     bgGradient: "from-orange-300 via-pink-200 to-purple-300",
// //     textColor: "text-rose-950",
// //     phaseName: "Dusk",
// //     icon: Sunset,
// //     explanation:
// //       "As light dims and warms in the evening, the SCN receives the signal to start winding down. Reducing exposure to blue light allows melatonin production to begin its rise, preparing your body for sleep.",
// //   },
// //   night: {
// //     startHour: 21,
// //     endHour: 5, // Wraps around midnight
// //     bgGradient: "from-indigo-950 via-purple-900 to-blue-950",
// //     textColor: "text-indigo-100",
// //     phaseName: "Night",
// //     icon: Moon,
// //     explanation:
// //       "In darkness or very dim, warm light, melatonin levels peak, promoting sleep and allowing the body to perform restorative functions. Avoiding bright, especially blue, light is crucial for maintaining sleep quality.",
// //   },
// // }

// // // Helper Function to Get Phase Details
// // function getCircadianPhase(hour) {
// //   // Normalize hour to be within 0-23
// //   const currentHour = hour % 24

// //   for (const phaseKey in circadianPhases) {
// //     const phase = circadianPhases[phaseKey]
// //     // Handle night phase wrapping around midnight
// //     if (phase.startHour > phase.endHour) {
// //       // e.g., Night starts at 21, ends at 5
// //       if (currentHour >= phase.startHour || currentHour < phase.endHour) {
// //         return phase
// //       }
// //     } else {
// //       // Normal phases (Dawn, Day, Dusk)
// //       if (currentHour >= phase.startHour && currentHour < phase.endHour) {
// //         return phase
// //       }
// //     }
// //   }
// //   // Default fallback (should ideally not be reached with proper config)
// //   return circadianPhases.night
// // }

// // // Format time for display (e.g., 14 -> 2:00 PM)
// // function formatTime(hour) {
// //   const hour12 = hour % 12 === 0 ? 12 : hour % 12 // Convert 0 to 12 for 12 AM/PM
// //   const ampm = hour < 12 || hour === 24 ? "AM" : "PM" // Handle midnight/noon
// //   return `${hour12}:00 ${ampm}`
// // }

// // export default function CircadianLightSimulator() {
// //   // State for the current hour (0-23), initialized to user's actual current hour
// //   const [currentHour, setCurrentHour] = useState(new Date().getHours())
// //   // State for info pop-up visibility
// //   const [showInfo, setShowInfo] = useState(false)
// //   // State for auto mode
// //   const [autoMode, setAutoMode] = useState(false)

// //   // Calculate current phase details based on currentHour using useMemo for optimization
// //   const phaseDetails = useMemo(() => getCircadianPhase(currentHour), [currentHour])

// //   // Handle slider change
// //   const handleSliderChange = (event) => {
// //     setCurrentHour(Number.parseInt(event.target.value, 10))
// //     setAutoMode(false)
// //   }

// //   // Format time for display
// //   const formattedTime = useMemo(() => formatTime(currentHour), [currentHour])

// //   // Auto mode effect - update time to match real time
// //   useEffect(() => {
// //     if (!autoMode) return

// //     const updateRealTime = () => {
// //       const now = new Date()
// //       setCurrentHour(now.getHours())
// //     }

// //     // Update immediately
// //     updateRealTime()

// //     // Then update every minute
// //     const intervalId = setInterval(updateRealTime, 60000)
// //     return () => clearInterval(intervalId)
// //   }, [autoMode])

// //   // Icon component for the current phase
// //   const PhaseIcon = phaseDetails.icon

// //   return (
// //     <motion.div
// //       className={cn(
// //         "relative flex flex-col items-center justify-center min-h-screen w-full font-sans overflow-hidden p-4 transition-colors duration-1000 bg-gradient-to-br",
// //         phaseDetails.bgGradient,
// //         phaseDetails.textColor,
// //       )}
// //       animate={{ opacity: 1 }}
// //       initial={{ opacity: 0 }}
// //       transition={{ duration: 1.5 }}
// //     >
// //       {/* Mandala Overlay */}
// //       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //         <Mandala className="w-3/4 h-3/4 max-w-md max-h-md opacity-15" />
// //       </div>

// //       {/* Light Rays Effect */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute inset-0 opacity-30 animate-pulse-slow">
// //           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-screen bg-gradient-radial from-white to-transparent"></div>
// //         </div>
// //       </div>

// //       {/* Content Area */}
// //       <div className="relative z-10 flex flex-col items-center space-y-6 bg-white/20 dark:bg-black/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
// //         {/* Title with Icon */}
// //         <div className="flex items-center justify-center space-x-3">
// //           <PhaseIcon className="h-8 w-8" />
// //           <h1 className="text-3xl md:text-4xl font-bold">Circadian Light Sculpture</h1>
// //         </div>

// //         {/* Time and Phase Display */}
// //         <div className="text-xl md:text-2xl">
// //           <div className="font-semibold">
// //             Time: {formattedTime} {autoMode && "(Live)"}
// //           </div>
// //           <div className="mt-1">
// //             Phase: <span className="font-bold">{phaseDetails.phaseName}</span>
// //           </div>
// //         </div>

// //         {/* Auto Mode Toggle */}
// //         <div className="flex items-center justify-center space-x-2">
// //           <Button
// //             variant={autoMode ? "default" : "outline"}
// //             size="sm"
// //             onClick={() => setAutoMode(true)}
// //             className={autoMode ? "" : "opacity-70"}
// //           >
// //             Live Time
// //           </Button>
// //           <Button
// //             variant={!autoMode ? "default" : "outline"}
// //             size="sm"
// //             onClick={() => setAutoMode(false)}
// //             className={!autoMode ? "" : "opacity-70"}
// //           >
// //             Manual
// //           </Button>
// //         </div>

// //         {/* Info Button */}
// //         <TooltipProvider>
// //           <Tooltip>
// //             <TooltipTrigger asChild>
// //               <Button
// //                 onClick={() => setShowInfo(true)}
// //                 variant="outline"
// //                 className="flex items-center justify-center space-x-2"
// //               >
// //                 <Info size={18} />
// //                 <span>How does this work?</span>
// //               </Button>
// //             </TooltipTrigger>
// //             <TooltipContent>
// //               <p className="max-w-xs">
// //                 Learn about the science behind circadian rhythms and how light affects your body
// //               </p>
// //             </TooltipContent>
// //           </Tooltip>
// //         </TooltipProvider>

// //         {/* Time Slider */}
// //         <div className="w-full pt-4">
// //           <label htmlFor="time-slider" className="block text-sm font-medium mb-2">
// //             Adjust Time (0-23 hours)
// //           </label>
// //           <input
// //             id="time-slider"
// //             type="range"
// //             min="0"
// //             max="23" // Represents hours 0 through 23
// //             step="1" // Increment by 1 hour
// //             value={currentHour}
// //             onChange={handleSliderChange}
// //             className="w-full h-2 bg-gray-200/50 rounded-lg appearance-none cursor-pointer dark:bg-gray-700/50"
// //             aria-label="Time adjustment slider"
// //             disabled={autoMode}
// //           />
// //           <div className="flex justify-between text-xs mt-1 px-1">
// //             <span>12 AM</span>
// //             <span>6 AM</span>
// //             <span>12 PM</span>
// //             <span>6 PM</span>
// //             <span>12 AM</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Information Pop-up Modal */}
// //       <AnimatePresence>
// //         {showInfo && (
// //           <motion.div
// //             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={() => setShowInfo(false)}
// //           >
// //             <motion.div
// //               className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full relative text-gray-800 dark:text-gray-200"
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               transition={{ type: "spring", stiffness: 300, damping: 25 }}
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <button
// //                 onClick={() => setShowInfo(false)}
// //                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
// //                 aria-label="Close information pop-up"
// //               >
// //                 <X size={24} />
// //               </button>

// //               <div className="flex items-center space-x-2 mb-4">
// //                 <PhaseIcon className="h-6 w-6" />
// //                 <h2 className="text-xl font-semibold">{phaseDetails.phaseName} Phase</h2>
// //               </div>

// //               <div className="space-y-4">
// //                 <p className="text-sm leading-relaxed">{phaseDetails.explanation}</p>

// //                 <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
// //                   <h3 className="font-medium mb-2">About Circadian Light</h3>
// //                   <p className="text-sm">
// //                     The Circadian Light Sculpture is designed to mimic natural daylight patterns, helping to regulate
// //                     your body's internal clock. By providing the right light at the right time, it can help improve
// //                     sleep quality, mood, and overall wellbeing.
// //                   </p>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-3 text-xs">
// //                   {Object.entries(circadianPhases).map(([key, phase]) => {
// //                     const Icon = phase.icon
// //                     return (
// //                       <div
// //                         key={key}
// //                         className={cn(
// //                           "p-2 rounded-md flex items-center space-x-2",
// //                           key === phaseDetails.phaseName.toLowerCase() ? "bg-gray-200 dark:bg-gray-600" : "",
// //                         )}
// //                       >
// //                         <Icon className="h-4 w-4 flex-shrink-0" />
// //                         <span>{phase.phaseName}</span>
// //                       </div>
// //                     )
// //                   })}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </motion.div>
// //   )
// // }

// import React, { useState, useEffect } from 'react';
// import './App.css';

// const getLightPhase = (hour) => {
//   if (hour >= 6 && hour < 10) {
//     return { color: '#FFD580', intensity: 0.7, phase: 'Morning Glow' }; // warm soft yellow
//   } else if (hour >= 10 && hour < 17) {
//     return { color: '#FFFFFF', intensity: 1.0, phase: 'Daylight Spectrum' }; // bright white
//   } else if (hour >= 17 && hour < 20) {
//     return { color: '#FFA07A', intensity: 0.8, phase: 'Sunset Calm' }; // sunset orange
//   } else {
//     return { color: '#4B0082', intensity: 0.3, phase: 'Night Mode' }; // deep indigo
//   }
// };

// function App() {
//   const now = new Date();
//   const [hour, setHour] = useState(now.getHours());
//   const { color, intensity, phase } = getLightPhase(hour);

//   const handleSliderChange = (e) => {
//     setHour(parseInt(e.target.value));
//   };

//   const syncRealTime = () => {
//     const realHour = new Date().getHours();
//     setHour(realHour);
//   };

//   return (
//     <div className="App">
//       <h1 className="title">Circadian Luminaire</h1>

//       <div className="lamp-container">
//         <div
//           className="light-effect"
//           style={{
//             background: `radial-gradient(circle, ${color} ${intensity * 40}%, transparent 70%)`,
//             opacity: intensity,
//           }}
//         />
//         <div className="lamp">
//           <div className="lamp-shade" />
//           <div className="lamp-stand" />
//           <div className="table" />
//         </div>
//       </div>

//       <div className="controller">
//         <div className="time-display">{hour.toString().padStart(2, '0')}:00</div>
//         <input
//           type="range"
//           min="0"
//           max="23"
//           value={hour}
//           onChange={handleSliderChange}
//           className="slider"
//         />
//         <button onClick={syncRealTime} className="real-time-btn">
//           Use Real Time
//         </button>
//         <div className="light-phase">Current Light Phase: {phase}</div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import LampScene from './components/LampScene';
import './index.css'; // for tailwind

function App() {
  return (
    <div className="App">
      <LampScene />
    </div>
  );
}

export default App;

