import { useNavigate } from "react-router-dom";
import { useUsage } from "./usage-context"; // Import the custom hook

const usageOptionsList = [
  "Gaming",
  "Video Editing",
  "Streaming",
  "3D Rendering",
  "Programming",
  "General Use",
];

const resolutionOptions = ["1080p", "1440p", "4K"];

export default function Usage() {
  const {
    usageOptions,
    setUsageOptions,
    resolutionOption,
    setResolutionOption,
    softwareOrGames,
    setSoftwareOrGames,
  } = useUsage(); // Use the custom hook

  const navigate = useNavigate();

  const handleNext = () => {
    console.log("Usage Options:", usageOptions);
    console.log("Preferred Resolution:", resolutionOption);
    console.log("Software or Games:", softwareOrGames);
    navigate("/budget"); // Navigate to the budget component
  };

  const toggleOption = (option) => {
    setUsageOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <section className="flex items-center justify-center min-h-screen pt-16">
      <div className="relative items-center w-1/2 max-w-7xl mx-auto px-5 py-16 md:px-12 lg:px-16 bg-black bg-opacity-60 backdrop-blur rounded-3xl border-2">
        <h1 className="text-3xl font-bold mb-6 text-white">Step 1: Usage</h1>

        {/* Question 1 */}
        <h2 className="text-lg font-semibold mb-2 text-white">
          What will you use the PC for?
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {usageOptionsList.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 
                ${
                  usageOptions.includes(option)
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
            >
              {option}
            </div>
          ))}
        </div>

        {/* Question 2 */}
        <h2 className="text-lg font-semibold mb-2 text-white">
          What kind of games or software will you be using most often?
        </h2>
        <textarea
          className="w-full p-2 rounded-lg mb-6 bg-blue-950 text-white"
          rows="4"
          placeholder="Specify types of games or software..."
          value={softwareOrGames}
          onChange={(e) => setSoftwareOrGames(e.target.value)} // Update state on input change
        ></textarea>

        {/* Question 3 */}
        <h2 className="text-lg font-semibold mb-2 text-white">
          What is your preferred resolution for gaming?
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {resolutionOptions.map((option) => (
            <div
              key={option}
              onClick={() => setResolutionOption(option)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 
                ${
                  resolutionOption === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
            >
              {option}
            </div>
          ))}
        </div>

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
