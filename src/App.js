import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Usage from "./components/forms/usage";
import Budget from "./components/forms/budget";
import Performance from "./components/forms/performance";
import Validate from "./components/forms/validate";
import SpinnerOverlay from "./components/spinner/spinnerOverlay";
import {LoadingProvider, useLoading} from "./interceptor/loadingContext";
import { UsageProvider } from "./components/forms/usage-context";
import "./App.css";
import Result from "./components/forms/result";
import { setupAxiosInterceptors } from "./interceptor/axiosConfig"; // Import Axios config

function App() {
  return (
    <BrowserRouter basename="/pc-builder">
      <UsageProvider>
        <LoadingProvider>
          <Main/>
        </LoadingProvider>
      </UsageProvider>
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();

  const [animate, setAnimate] = useState(false);
  const { isLoading, setIsLoading } = useLoading(); // Access loading state from context

  useEffect(() => {
    // Start the animation
    setAnimate(true);

    // Reset the animation after it has completed
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 600); // This should match the duration of your animation

    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    // Set up Axios Interceptors
    setupAxiosInterceptors(setIsLoading);
  }, [setIsLoading]);

  return (
    <div className="App">
      <SpinnerOverlay isLoading={isLoading} />
      <Navbar />
      <div className={animate ? "animate-fade" : ""}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/usage" element={<Usage />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/validate" element={<Validate />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
