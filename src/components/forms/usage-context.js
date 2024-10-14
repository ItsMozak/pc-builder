import { createContext, useContext, useState } from 'react';

const UsageContext = createContext();

export const UsageProvider = ({ children }) => {
  const [usageOptions, setUsageOptions] = useState([]);
  const [resolutionOption, setResolutionOption] = useState("");
  const [softwareOrGames, setSoftwareOrGames] = useState("");

  const [budget, setBudget] = useState("");
  const [cpuPreference, setCpuPreference] = useState("");
  const [gpuPreference, setGpuPreference] = useState("");
  const [wifiNeeded, setWifiNeeded] = useState("");
  const [rgbLighting, setRgbLighting] = useState("");

  const [priorities, setPriorities] = useState([]);
  const [storageType, setStorageType] = useState("");
  const [storageCapacity, setStorageCapacity] = useState("");
  const [caseSize, setCaseSize] = useState("");
  const [ram, setRam] = useState("");

  return (
    <UsageContext.Provider
      value={{
        usageOptions,
        setUsageOptions,
        resolutionOption,
        setResolutionOption,
        softwareOrGames,
        setSoftwareOrGames,
        budget,
        setBudget,
        cpuPreference,
        setCpuPreference,
        gpuPreference,
        setGpuPreference,
        wifiNeeded,
        setWifiNeeded,
        rgbLighting,
        setRgbLighting,
        priorities,
        setPriorities,
        storageType,
        setStorageType,
        storageCapacity,
        setStorageCapacity,
        caseSize,
        setCaseSize,
        ram,
        setRam,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  return useContext(UsageContext);
};
