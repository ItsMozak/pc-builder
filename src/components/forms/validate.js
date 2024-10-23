import { useUsage } from "./usage-context"; // Import the useUsage hook
import { useNavigate } from "react-router-dom";
import sendPromptToGpt from "../../services/ai-service";
import generatePCBuildPrompt from "../prompt/prompt";
import axios from 'axios';
import { json } from "react-router-dom";
export default function Validate() {
  const navigate = useNavigate();

  const {
    usageOptions, // array of usage options selected
    resolutionOption, // chosen resolution
    softwareOrGames, // text entered for games or software
    budget, // chosen budget
    cpuPreference, // CPU preference (e.g., Intel or AMD)
    gpuPreference, // GPU preference (e.g., NVIDIA or AMD)
    wifiNeeded, // Whether WiFi is needed
    rgbLighting, // Whether RGB lighting is wanted
    priorities, // What the user prioritizes (e.g., performance, aesthetics, etc.)
    storageType, // Type of storage (e.g., SSD, HDD)
    storageCapacity, // Storage capacity (e.g., 1TB, 2TB, etc.)
    caseSize, // Preferred case size (e.g., Full Tower, Mid Tower)
    ram,
    setResult // Amount of RAM (e.g., 16GB, 32GB)
  } = useUsage();

  const postData = async (payload) => {
    const jsonContent = payload.replace(/^```(?:json)?\n/, '').replace(/\n```$/, '');
    let data = JSON.stringify(jsonContent);
    try {
      const response = await axios.post('http://localhost:5000/api/data/getLink', data, {
        headers: {
          'Content-Type': 'application/json' // Set the correct header
        }
      });
      setResult(response.data); // Store the response data in state
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleConfirm = async () => {

    const prompt = generatePCBuildPrompt({
      usageOptions,
      resolutionOption,
      softwareOrGames,
      budget,
      cpuPreference,
      gpuPreference,
      wifiNeeded,
      rgbLighting,
      priorities,
      storageType,
      storageCapacity,
      caseSize,
      ram
    });
    try {
      console.log(prompt)
      const response = await sendPromptToGpt(prompt);
      // console.log(response)
      await postData(response);
      // navigate("/result");
      // console.log(response);
    } catch (error) {
      console.error("Failed to get response from GPT:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen pt-16">
      <div className="relative items-center w-1/2 max-w-7xl mx-auto px-5 py-16 md:px-12 lg:px-16 bg-black bg-opacity-60 backdrop-blur rounded-3xl border-2 border-white">
        <h1 className="text-3xl font-bold mb-6 text-white">Summary</h1>

        <div className="space-y-6 text-white">
          {/* Usage Section */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Usage</h2>

            {/* Usage Options */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Chosen Usage</h3>
              <p>
                {usageOptions?.length > 0
                  ? usageOptions.join(", ")
                  : "No usage selected"}
              </p>
            </div>

            {/* Games or Software */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Games or Software</h3>
              <p>{softwareOrGames || "No games or software specified"}</p>
            </div>

            {/* Resolution */}
            <div>
              <h3 className="text-lg font-semibold">Preferred Resolution</h3>
              <p>{resolutionOption || "No resolution selected"}</p>
            </div>
          </div>

          {/* Budget Section */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Budget</h2>

            {/* Budget */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Chosen Budget</h3>
              <p>{budget ? `$${budget}` : "No budget specified"}</p>
            </div>

            {/* CPU Preference */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">CPU Preference</h3>
              <p>{cpuPreference || "No CPU preference specified"}</p>
            </div>

            {/* GPU Preference */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">GPU Preference</h3>
              <p>{gpuPreference || "No GPU preference specified"}</p>
            </div>

            {/* WiFi */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">WiFi Needed?</h3>
              <p>{wifiNeeded ? "Yes" : "No"}</p>
            </div>

            {/* RGB Lighting */}
            <div>
              <h3 className="text-lg font-semibold">RGB Lighting</h3>
              <p>{rgbLighting ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Performance Section */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Performance</h2>

            {/* Performance Priorities */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Priorities</h3>
              <p>
                {priorities?.length > 0
                  ? priorities.join(", ")
                  : "No priorities specified"}
              </p>
            </div>

            {/* Storage Type */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Storage Type</h3>
              <p>{storageType || "No storage type selected"}</p>
            </div>

            {/* Storage Capacity */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Storage Capacity</h3>
              <p>{storageCapacity || "No storage capacity specified"}</p>
            </div>

            {/* Case Size */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Case Size</h3>
              <p>{caseSize || "No case size preference specified"}</p>
            </div>

            {/* RAM */}
            <div>
              <h3 className="text-lg font-semibold">RAM</h3>
              <p>{ram || "No RAM preference specified"}</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500"
          >
            Confirm & Proceed
          </button>
        </div>
      </div>
    </section>
  );
}
