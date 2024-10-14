import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Usage from "./components/forms/usage";
import Budget from "./components/forms/budget";
import Performance from "./components/forms/performance";
import Validate from "./components/forms/validate";
import { UsageProvider } from "./components/forms/usage-context";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UsageProvider>
        <Main />
      </UsageProvider>
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start the animation
    setAnimate(true);
    
    // Reset the animation after it has completed
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 600); // This should match the duration of your animation

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <div className={animate ? "animate-fade" : ""}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/usage" element={<Usage />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/validate" element={<Validate />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
