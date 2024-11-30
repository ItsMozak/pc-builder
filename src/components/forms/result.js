import { useUsage } from "./usage-context"; // Import the custom hook
import { useNavigate } from "react-router-dom";

export default function Result() {

    const {
        result,
    } = useUsage();

    const navigate = useNavigate();

    const handleNext = () => {
        navigate("/"); // Navigate to the budget component
        window.location.reload();
      };

    // Make a call to the server 
    console.log(result)
    return (
        <section className="flex items-center justify-center min-h-screen pt-16">
      <div className="relative items-center sm:max-w-7xl mx-6 lg:mx-auto px-5 py-8 sm:py-16 md:px-12 lg:px-16 bg-black bg-opacity-60 backdrop-blur rounded-3xl border-2">
      <h1 className="text-2xl font-semibold mb-6 text-white">
                    Your PC Build:
                </h1>
                <p className="text-white"> <span className="font-bold">CPU:</span> {result.cpu}</p>
                <p className="text-white"> <span className="font-bold">Motherboard:</span> {result.motherboard}</p>
                <p className="text-white"> <span className="font-bold">Graphics card:</span> {result.videocard}</p>
                <p className="text-white"> <span className="font-bold">Case:</span> {result.case}</p>
                <p className="text-white"> <span className="font-bold">Storage:</span> {result.storage}</p>
                <p className="text-white"> <span className="font-bold">Cooler:</span> {result['cpu-cooler']}</p>
                <p className="text-white"> <span className="font-bold">Power supply:</span> {result['power-supply']}</p>
                <p className="text-white"> <span className="font-bold">Pcpartpicker link:</span> <a className="underline text-blue-500" target="_blank" href={result.link}>{result.link}</a></p>
            {/* Navigation Buttons */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleNext}
            className="px-10 py-2 text-black bg-white rounded"
          >
            Start New Build
          </button>
        </div>
            </div>
        </section>);
}