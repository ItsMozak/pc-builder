import { useUsage } from "./usage-context"; // Import the custom hook

export default function Result() {

    const {
        result,
    } = useUsage();

    // Make a call to the server 
    console.log(result)
    return (
        <section className="flex items-center justify-center min-h-screen pt-16">
            <div className="relative items-center w-1/2 px-5 py-16 mx-auto md:px-12 lg:px-16 max-w-7xl bg-black bg-opacity-60 backdrop-blur rounded-3xl border-2">
                <h2 className="text-lg font-semibold mb-2 text-white">
                    Your PC Build:
                </h2>
                <p className="text-white"> <span className="font-bold">CPU:</span> {result.cpu}</p>
                <p className="text-white"> <span className="font-bold">Motherboard:</span> {result.motherboard}</p>
                <p className="text-white"> <span className="font-bold">Graphics card:</span> {result.videocard}</p>
                <p className="text-white"> <span className="font-bold">Case:</span> {result.case}</p>
                <p className="text-white"> <span className="font-bold">Storage:</span> {result.storage}</p>
                <p className="text-white"> <span className="font-bold">Cooler:</span> {result['cpu-cooler']}</p>
                <p className="text-white"> <span className="font-bold">Power supply:</span> {result['power-supply']}</p>
                <p className="text-white"> <span className="font-bold">Pcpartpicker link:</span> {result.link}</p>
            </div>
        </section>);
}