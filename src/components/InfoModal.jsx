"use client"
import Modal from "react-modal"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

const InfoModal = ({ closeModal }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="bg-[#101827] text-white p-10 rounded-xl max-w-3xl mx-auto shadow-2xl outline-none font-sans"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
    >
      <Tabs>
<TabList className="flex gap-6 border-b border-gray-700 pb-2 mb-6 text-2xl font-bold">
  <Tab
    className="cursor-pointer text-gray-300 hover:text-yellow-400 focus:outline-none"
    selectedClassName="text-yellow-400 border-b-2 border-yellow-400"
  >
    About
  </Tab>
  <Tab
    className="cursor-pointer text-gray-300 hover:text-yellow-400 focus:outline-none"
    selectedClassName="text-yellow-400 border-b-2 border-yellow-400"
  >
    The Science
  </Tab>
  <Tab
    className="cursor-pointer text-gray-300 hover:text-yellow-400 focus:outline-none"
    selectedClassName="text-yellow-400 border-b-2 border-yellow-400"
  >
    The Feature
  </Tab>
</TabList>



        <TabPanel>
          <h2 className="text-3xl font-bold text-teal-400 mb-4">About the Lamp</h2>
          <p className="mb-4 text-lg leading-relaxed text-gray-200">
            This isn't just a lamp—it's your personal sunlight assistant. Designed to mimic the natural phases of daylight, this smart lamp enhances your mood, energy, and sleep quality by aligning your indoor lighting with the natural flow of the day.
          </p>
          <p className="mb-4 text-lg text-gray-200">
            Whether you're working through a foggy morning or winding down after sunset, this lamp creates an immersive, visually calming environment that helps your body stay in sync with time—no matter your schedule or location.
          </p>
        </TabPanel>

        <TabPanel>
          <h2 className="text-3xl font-bold text-teal-400 mb-4">The Science</h2>
          <p className="mb-4 text-lg leading-relaxed text-gray-200">
            Our circadian rhythm—the body’s internal 24-hour clock—relies on light cues to function optimally. Exposure to natural light patterns helps regulate hormones like melatonin and cortisol, directly impacting sleep, focus, and mood.
          </p>
          <p className="mb-4 text-lg text-gray-200">
            Bright blue-toned light in the morning boosts alertness. Stable daylight supports sustained productivity. Dim amber lighting in the evening promotes relaxation and prepares the body for rest.
          </p>
          <p className="mb-4 text-lg text-gray-200">
            The lamp replicates this rhythm with carefully tuned light intensities and temperatures, making it ideal for homes, workspaces, or anywhere natural light is limited.
          </p>
        </TabPanel>

        <TabPanel>
          <h2 className="text-3xl font-bold text-teal-400 mb-4">The Feature</h2>
          <ul className="space-y-4 text-lg text-gray-200">
            <li>
              <span style={{ color: "#EE6C45" }} className="font-bold">Dynamic Light Transitions:</span> From sunrise tones to twilight fades, the lamp shifts throughout the day to mirror the sun's natural progression.
            </li>
            <li>
              <span style={{ color: "#EE6C45" }} className="font-bold">Mandala Projections: </span>A calming visual feature that projects evolving mandala patterns on nearby surfaces, aiding focus and mindfulness.
            </li>
            <li>
            
              <span style={{ color: "#EE6C45" }} className="font-bold">Ambient Soundscapes: </span> Audio integration lets you play music, perfect for meditation, sleep, or creative flow.
            </li>
            <li>
              <span style={{ color: "#EE6C45" }} className="font-bold">Real-Time Sync:</span> The lamp adjusts based on your local time to maintain a truly natural rhythm. (The manual time feature is for the purpose of demonstation).
            </li>
          </ul>
         
        </TabPanel>
      </Tabs>

      <div className="text-right mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-500 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default InfoModal
