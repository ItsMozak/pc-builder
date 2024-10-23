import { useNavigate } from "react-router-dom";
import { useUsage } from "./usage-context"; // Import the custom hook
import { useEffect, useState } from "react";

export default function Result() {

    const {
        result,
    } = useUsage();

    // Make a call to the server 

    return (
        <section className="flex items-center justify-center min-h-screen pt-16">
            <div className="relative items-center w-1/2 px-5 py-16 mx-auto md:px-12 lg:px-16 max-w-7xl bg-black bg-opacity-60 backdrop-blur rounded-3xl border-2">
                <h2 className="text-lg font-semibold mb-2 text-white">
                    Your pcpartpicker link: <pre>{JSON.stringify(result, null, 2)}</pre>
                </h2>
            </div>
        </section>);
}