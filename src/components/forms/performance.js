import { useNavigate } from "react-router-dom";
import { useUsage } from "./usage-context";

// Define the option arrays as constants
// const priorityOptions = [
//   "CPU",
//   "GPU",
//   "Storage",
//   "RAM",
//   "Motherboard",
//   "Cooling",
//   "Power Supply",
//   "No Preference",
// ];
const storageTypeOptions = ["SSD (Faster)", "HDD (More capacity)"];
const storageCapacityOptions = ["256GB", "512GB", "1TB", "2TB"];
const caseSizeOptions = ["Full Tower", "Mid Tower", "Mini Tower", "ITX"];
const ramOptions = ["8GB", "16GB", "32GB", "64GB"];

export default function Performance() {
  const navigate = useNavigate();
  const {
    // priorities,
    // setPriorities,
    storageType,
    setStorageType,
    storageCapacity,
    setStorageCapacity,
    caseSize,
    setCaseSize,
    ram,
    setRam,
  } = useUsage(); // Use the context

  // Handle selecting priorities (multi-select using chips)
  // const handlePriorityClick = (priority) => {
  //   setPriorities((prev) =>
  //     prev.includes(priority)
  //       ? prev.filter((item) => item !== priority)
  //       : [...prev, priority]
  //   );
  // };

  const handleNext = () => {
    navigate("/validate"); // Navigate to the summary page
  };

  return (
    <section className="flex items-center justify-center min-h-screen pt-16">
      <div className="relative items-center sm:max-w-7xl mx-6 lg:mx-auto px-5 py-8 sm:py-16 md:px-12 lg:px-16 bg-black bg-opacity-60 backdrop-blur rounded-3xl border-2">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Step 3: Performance and Components
        </h1>

        {/* Question 1: Prioritize Components */}
        {/* <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Which component would you like to prioritize the most?
          </h2>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((priority) => (
              <div
                key={priority}
                onClick={() => handlePriorityClick(priority)}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  priorities.includes(priority)
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
              >
                {priority}
              </div>
            ))}
          </div>
        </div> */}

        {/* Question 2: Storage Type */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-white">
            What storage type do you prefer?
          </h2>
          <div className="flex gap-2">
            {storageTypeOptions.map((option) => (
              <div
                key={option}
                onClick={() => setStorageType(option)}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  storageType === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Question 3: Storage Capacity */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-white">
            How much storage capacity do you need?
          </h2>
          <div className="flex gap-2">
            {storageCapacityOptions.map((capacity) => (
              <div
                key={capacity}
                onClick={() => setStorageCapacity(capacity)}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  storageCapacity === capacity
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
              >
                {capacity}
              </div>
            ))}
          </div>
        </div>

        {/* Question 4: Case Size */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-white">
            What size of case do you prefer?
          </h2>
          <div className="flex gap-2">
            {caseSizeOptions.map((option) => (
              <div
                key={option}
                onClick={() => setCaseSize(option)}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  caseSize === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Question 5: RAM */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-white">
            How much RAM do you need?
          </h2>
          <div className="flex gap-2">
            {ramOptions.map((option) => (
              <div
                key={option}
                onClick={() => setRam(option)}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  ram === option
                    ? "bg-blue-600 text-white"
                    : "bg-blue-950 text-white"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
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
