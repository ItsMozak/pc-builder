import { useNavigate } from "react-router-dom";
import { useUsage } from "./usage-context";

const cpuOptions = ["Intel", "AMD", "No Preference"];
const gpuOptions = ["NVIDIA", "AMD", "No Preference"];
// const wifiOptions = ["Yes", "No", "Doesn't matter"];
// const rgbOptions = ["Yes", "No", "Doesn't matter"];

export default function BudgetAndPreferences() {
  const navigate = useNavigate();

  // Use context to manage state
  const {
    budget,
    setBudget,
    cpuPreference,
    setCpuPreference,
    gpuPreference,
    setGpuPreference,
    wifiNeeded,
    // setWifiNeeded,
    rgbLighting,
    // setRgbLighting,
  } = useUsage();

  const handleNext = () => {
    // Log the state values for debugging
    console.log("Budget:", budget);
    console.log("CPU Preference:", cpuPreference);
    console.log("GPU Preference:", gpuPreference);
    console.log("Wi-Fi Needed:", wifiNeeded);
    console.log("RGB Lighting:", rgbLighting);

    navigate("/performance"); // Navigate to the performance page
  };

  return (
    <section className="flex items-center justify-center min-h-screen pt-16">
      <div className="relative items-center sm:max-w-7xl mx-6 lg:mx-auto px-5 py-8 sm:py-16 md:px-12 lg:px-16 bg-black bg-opacity-60 backdrop-blur rounded-3xl border-2">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Step 2: Budget and Preferences
        </h1>

        {/* Budget Input */}
        <h2 className="text-lg font-semibold mb-2 text-white">
          What is your budget?
        </h2>
        <input
          type="text"
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
            console.log("Updated Budget:", e.target.value); // Log updated budget
          }}
          placeholder="e.g., $500-$1000"
          className="w-full p-3 mb-6 rounded-lg bg-blue-950 text-white"
        />

        {/* CPU Preference */}
        <h2 className="text-lg font-semibold mb-2 text-white">
          Do you prefer Intel or AMD for your CPU?
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {cpuOptions.map((option) => (
            <div
              key={option}
              onClick={() => {
                setCpuPreference(option);
                console.log("Selected CPU Preference:", option); // Log selected CPU preference
              }}
              className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-200
                ${
                  cpuPreference === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
            >
              {option}
            </div>
          ))}
        </div>

        {/* GPU Preference */}
        <h2 className="text-lg font-semibold mb-2 text-white">
          Do you prefer NVIDIA or AMD for your GPU?
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {gpuOptions.map((option) => (
            <div
              key={option}
              onClick={() => {
                setGpuPreference(option);
                console.log("Selected GPU Preference:", option); // Log selected GPU preference
              }}
              className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-200
                ${
                  gpuPreference === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
            >
              {option}
            </div>
          ))}
        </div>

        {/* Wi-Fi Connectivity */}
        {/* <h2 className="text-lg font-semibold mb-2 text-white">
          Do you need Wi-Fi connectivity built into the motherboard?
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {wifiOptions.map((option) => (
            <div
              key={option}
              onClick={() => {
                setWifiNeeded(option);
                console.log("Selected Wi-Fi Option:", option); // Log selected Wi-Fi option
              }}
              className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-200
                ${
                  wifiNeeded === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
            >
              {option}
            </div>
          ))}
        </div> */}

        {/* RGB Lighting */}
        {/* <h2 className="text-lg font-semibold mb-2 text-white">
          Do you want RGB lighting?
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {rgbOptions.map((option) => (
            <div
              key={option}
              onClick={() => {
                setRgbLighting(option);
                console.log("Selected RGB Lighting Option:", option); // Log selected RGB lighting option
              }}
              className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-200
                ${
                  rgbLighting === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
            >
              {option}
            </div>
          ))}
        </div> */}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-2 text-black bg-white rounded"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-10 py-2 text-black bg-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
