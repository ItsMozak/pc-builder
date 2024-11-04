export default function generatePCBuildPrompt({
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
  ram,
}) {

  const prompt1 = `
      I need help building the best possible PC according to the following preferences and constraints:
  
      1. **Usage**: The PC will be used for ${usageOptions?.length > 0 ? usageOptions.join(", ") : "general purposes"}.
      2. **Resolution**: The preferred resolution for this build is ${resolutionOption ? resolutionOption : "not specified"}.
      3. **Software or Games**: The following software or games are intended for use: ${softwareOrGames ? softwareOrGames : "none specified"}.
      4. **Budget**: The budget for this build is $${budget || "not specified"}.
      5. **CPU Preference**: I prefer a ${cpuPreference || "no specific preference"} processor.
      6. **GPU Preference**: I prefer a ${gpuPreference || "no specific preference"} graphics card.
      7. **WiFi Requirement**: ${wifiNeeded ? "WiFi is required" : "WiFi is not required"} in the build.
      8. **RGB Lighting**: ${rgbLighting ? "RGB lighting is preferred" : "RGB lighting is not needed"}.
      9. **Priorities**: The build should prioritize ${priorities?.length > 0 ? priorities.join(", ") : "balanced performance"}.
      10. **Storage**: The build should have ${storageCapacity || "unspecified storage capacity"} of ${storageType || "not specified"}.
      11. **Case Size**: The preferred case size is ${caseSize || "not specified"}.
      12. **RAM**: The build should include ${ram || "unspecified RAM"}.
  
      Based on these details, please suggest the best possible PC build configuration that optimizes performance and stays within the given budget. Make sure that all the parts are compatible with eachother and that the power supply you choose delivers enough power for the whole pc. Consider overall balance, reliability, and future-proofing the system where applicable.
      Make sure to search online to see it the part name you provided exists.

      It is crucial to ONLY return a JSON and nothing else that respect this kind of format: 
      {
        "cpu": "",
        "motherboard": "",
        "memory": "",
        "videocard": "",
        "storage": "",
        "power-supply": "",
        "cpu-cooler": "",
        "case": ""
      }

      Here are some example data. Pay attention to the format and the spacing of each component. IT IS VERY IMPORTANT.
      Notice: 
      Do not put the string NVMe in the power-supply payload.
      Do not put the string Liquid Cooler in the cpu-cooler payload. 
      Make sure to always add a space between the format of the RAM, ex: 32 GB, 16 GB.
      Make sure to always add a space between the format Watt for the power supply, ex: 750 W, 850 W.
      Make sure to ONLY add the WIFI keyword in the format for the motherbord, if the actual name has WIFI in it
      {
        "cpu": "AMD Ryzen 5 7600X",
        "motherboard": "MSI B650 GAMING PLUS WIFI",
        "memory": "G.Skill Flare X5 32 GB 2 x 16 GB DDR5-6000",
        "videocard": "MSI GeForce RTX 3060 Ventus 2X 12G",
        "storage": "Kingston NV2 1 TB M.2 PCIe 4.0 SSD",
        "power-supply": "Corsair RM750e (2023) 750 W 80+ Gold",
        "cpu-cooler": "Thermalright Peerless Assassin 120 SE",
        "case": "NZXT H5 Flow (2022)"
      }

      {
        "cpu": "AMD Ryzen 7 7800X3D",
        "motherboard": "Asus ROG STRIX B650-A GAMING WIFI",
        "memory": "Corsair Vengeance RGB 32 GB 2 x 16 GB DDR5-6000",
        "videocard": "Gigabyte GAMING OC Radeon RX 7800 XT 16GB",
        "storage": "Samsung 990 Pro 2 TB M.2 PCIe 4.0 SSD",
        "power-supply": "Corsair RM850x (2021) 850 W 80+ Gold",
        "cpu-cooler": "Corsair iCUE H100x RGB ELITE",
        "case": "Corsair 4000D Airflow ATX Mid Tower"
      }

      {
        "cpu": "AMD Ryzen 9 7950X",
        "motherboard": "Asus ROG CROSSHAIR X670E HERO",
        "memory": "G.Skill Trident Z5 Neo RGB 64 GB 2 x 32 GB DDR5-6000",
        "videocard": "Gigabyte GAMING OC RX 7900 XTX 24 GB",
        "storage": "Samsung 990 Pro 2 TB M.2 PCIe 4.0 SSD",
        "power-supply": "Corsair HX1000i 1000 W 80+ Platinum",
        "cpu-cooler": "Corsair iCUE H150i ELITE CAPELLIX XT 360 mm",
        "case": "Lian Li O11 Dynamic Mini Snow Edition"
      }
    `

  const prompt2 = `I need help building the best possible PC according to the following preferences and constraints:
  
  1. **Usage**: The PC will be used for ${usageOptions?.length > 0 ? usageOptions.join(", ") : "general purposes"}.
  2. **Resolution**: The preferred resolution for this build is ${resolutionOption ? resolutionOption : "not specified"}.
  3. **Software or Games**: The following software or games are intended for use: ${softwareOrGames ? softwareOrGames : "none specified"}.
  4. **Budget**: The budget for this build is $${budget || "not specified"}.
  5. **CPU Preference**: I prefer a ${cpuPreference || "no specific preference"} processor.
  6. **GPU Preference**: I prefer a ${gpuPreference || "no specific preference"} graphics card.
  7. **WiFi Requirement**: ${wifiNeeded ? "WiFi is required" : "WiFi is not required"} in the build.
  8. **RGB Lighting**: ${rgbLighting ? "RGB lighting is preferred" : "RGB lighting is not needed"}.
  9. **Priorities**: The build should prioritize ${priorities?.length > 0 ? priorities.join(", ") : "balanced performance"}.
  10. **Storage**: The build should have ${storageCapacity || "unspecified storage capacity"} of ${storageType || "not specified"}.
  11. **Case Size**: The preferred case size is ${caseSize || "not specified"}.
  12. **RAM**: The build should include ${ram || "unspecified RAM"}.
 
  Choose the best PC from this dataset and only return that JSON data and nothing else.
  You can only return a JSON data featuring the link and do not format it as markdown. For example:
  {
      "cpu": "",
      "motherboard": "",
      "memory": "",
      "videocard": "",
      "storage": "",
      "power-supply": "",
      "cpu-cooler": "",
      "case": "",
      "link": "",
      "price": ""
  }

  [
    {
      "cpu": "AMD Ryzen 5 5600G",
      "motherboard": "Gigabyte B550M K Micro ATX AM4 Motherboard",
      "memory": "G.Skill Ripjaws V 16 GB (2 x 8 GB) DDR4-3600 CL18 Memory",
      "videocard": "",
      "storage": "Patriot P400 Lite 1 TB M.2-2280 PCIe 4.0 X4 NVME Solid State Drive",
      "power-supply": "Thermaltake Toughpower GX2 600 W 80+ Gold Certified ATX Power Supply",
      "cpu-cooler": "",
      "case": "Fractal Design Core 1000 USB 3.0 MicroATX Mid Tower Case",
      "link": "https://ca.pcpartpicker.com/list/C6DJ74",
      "price": "$633.40"
    },
    {
      "cpu": "Intel Core i3-12100F",
      "motherboard": "ASRock B660M Pro RS Micro ATX",
      "memory": "TEAMGROUP T-Force Vulcan Z 16 GB (2 x 8 GB) DDR4-3200",
      "videocard": "Asus DUAL V2 Radeon RX 6600 8 GB Video Card",
      "storage": "Patriot P400 Lite 1 TB M.2-2280 ",
      "power-supply": "MSI MAG A550BN 550 W 80+ Bronze",
      "cpu-cooler": "",
      "case": "Fractal Design Pop Mini Air MicroATX Mid Tower Case",
      "link": "https://ca.pcpartpicker.com/list/LBV32x",
      "price": "$796.69"
    },
    {
      "cpu": "Intel Core i5-12400F",
      "motherboard": "ASRock B760M-HDV/M.2 Micro ATX",
      "memory": "Corsair Vengeance 16 GB",
      "videocard": "Gigabyte EAGLE Radeon RX 6600 8 GB",
      "storage": "Kingston NV2 1 TB",
      "power-supply": "Thermaltake Smart 500 W",
      "cpu-cooler": "",
      "case": "Cooler Master MasterBox Q300L",
      "link": "https://ca.pcpartpicker.com/list/gFPKHW",
      "price": "$946.96"
    },
    {
      "cpu": "AMD Ryzen 5 5500",
      "motherboard": "Asus PRIME B550M-A WIFI II",
      "memory": "Corsair Vengeance LPX 16 GB",
      "videocard": "Gigabyte Radeon RX 6600",
      "storage": "Crucial P3 Plus 1 TB",
      "power-supply": "MSI MAG A550BN",
      "cpu-cooler": "",
      "case": "NZXT H5 Flow",
      "link": "https://ca.pcpartpicker.com/list/2GQdnp",
      "price": "$953.55"
    },
    {
      "cpu": "AMD Ryzen 5 5600X",
      "motherboard": "MSI B550 GAMING GEN3",
      "memory": "G.Skill Ripjaws V 32 GB",
      "videocard": "MSI GeForce RTX 3060 Ventus 2X 12G",
      "storage": "Crucial P3 Plus 1 TB",
      "power-supply": "Gigabyte UD750GM",
      "cpu-cooler": "be quiet! Dark Rock Pro 5",
      "case": "Fractal Design Pop Air",
      "link": "https://ca.pcpartpicker.com/list/xG9CmC",
      "price": "$1291.12"
    },
    {
      "cpu": "AMD Ryzen 7 5700X3D",
      "motherboard": "Gigabyte B550M K Micro ATX AM4 Motherboard",
      "memory": "Corsair Vengeance RGB Pro 32 GB",
      "videocard": "MSI GeForce RTX 3060 Ventus 2X 12G",
      "storage": "Kingston NV2 1 TB M.2-2280",
      "power-supply": "Corsair RM650 (2023)",
      "cpu-cooler": "Cooler Master MASTERLIQUID ML240L RGB V2",
      "case": "Montech AIR 903 MAX",
      "link": "https://ca.pcpartpicker.com/list/dxXRsp",
      "price": "$1328.30"
    },
    {
      "cpu": "AMD Ryzen 5 7600",
      "motherboard": "ASRock B650M Pro RS WiFi",
      "memory": "G.Skill Flare X5 32 GB (2 x 16 GB) DDR5-6000 ",
      "videocard": "MSI VENTUS 2X BLACK OC GeForce RTX 4060 8 GB",
      "storage": "Samsung 980 Pro 1 TB",
      "power-supply": "Corsair RM750e (2023)",
      "cpu-cooler": "",
      "case": "Fractal Design Pop Air",
      "link": "https://ca.pcpartpicker.com/list/Zhm32x",
      "price": "$1407.56"
    },
    {
      "cpu": "AMD Ryzen 5 7600X",
      "motherboard": "ASRock B650M Pro RS WiFi",
      "memory": "G.Skill Flare X5 32 GB (2 x 16 GB) DDR5-6000 ",
      "videocard": "MSI VENTUS 2X BLACK OC GeForce RTX 4060 8 GB",
      "storage": "Samsung 980 Pro 1 TB",
      "power-supply": "Corsair RM750e (2023)",
      "cpu-cooler": "Thermalright Peerless Assassin 120 SE",
      "case": "Fractal Design Pop Air",
      "link": "https://ca.pcpartpicker.com/list/nrzPxg",
      "price": "$1499.50"
    },
    {
      "cpu": "Intel Core i7-12700K",
      "motherboard": "MSI B760 GAMING PLUS WIFI ATX",
      "memory": "Corsair Vengeance RGB 32 GB (2 x 16 GB) DDR5-6000",
      "videocard": "Gigabyte GAMING OC Radeon RX 7700 XT ",
      "storage": "Samsung 980 Pro 1 TB M.2-2280 PCIe 4.0",
      "power-supply": "Corsair RM750e (2023) 750 W 80+ Gold ",
      "cpu-cooler": "Thermalright Phantom Spirit 120 SE",
      "case": "Corsair 4000D Airflow",
      "link":"https://ca.pcpartpicker.com/list/mJprxg",
      "price": "$1818.67"
    },
    {
      "cpu": "Intel Core i7-12700K",
      "motherboard": "MSI PRO Z790-A MAX WIFI",
      "memory": "Corsair Vengeance RGB 32 GB",
      "videocard": "Gigabyte WINDFORCE OC GeForce RTX 4070",
      "storage": "Samsung 980 Pro 1 TB",
      "power-supply": "Corsair RM750e (2023)",
      "cpu-cooler": "Cooler Master MASTERLIQUID ML240L RGB V2",
      "case": "Corsair 4000D Airflow",
      "link":"https://ca.pcpartpicker.com/list/xcMwrM",
      "price": "$2109.58"
    },
    {
      "cpu": "AMD Ryzen 7 7700X",
      "motherboard": "Gigabyte B650 AORUS ELITE AX",
      "memory": "Corsair Vengeance RGB 32 GB (2 x 16 GB)",
      "videocard": "Gigabyte GAMING OC Radeon RX 7800 XT",
      "storage": "Samsung 990 Pro 2 TB",
      "power-supply": "Corsair RM750e (2023)",
      "cpu-cooler": "Corsair iCUE H150i ELITE CAPELLIX XT",
      "case": "Corsair 4000D Airflow",
      "link": "https://ca.pcpartpicker.com/list/XvdxFZ",
      "price": "$2133.45"
    },
    {
      "cpu": "AMD Ryzen 9 7900X",
      "motherboard": "MSI MAG B650 TOMAHAWK WIFI",
      "memory": "Corsair Vengeance RGB 32 GB (2 x 16 GB) DDR5-6000",
      "videocard": "Gigabyte GAMING OC Radeon RX 7800 XT",
      "storage": "Western Digital WD_Black SN850X 2 TB",
      "power-supply": "Corsair RM850e (2023)",
      "cpu-cooler": "NZXT Kraken Elite 360 RGB",
      "case": "Lian Li O11 Vision",
      "link": "https://ca.pcpartpicker.com/list/wRWrxg",
      "price": "$2556.90"
    },
    {
      "cpu": "Intel Core i7-14700K",
      "motherboard": "MSI PRO Z790-A MAX WIFI",
      "memory": "TEAMGROUP T-Force Delta RGB 32 GB",
      "videocard": "Gigabyte WINDFORCE OC GeForce RTX 4070",
      "storage": "Samsung 990 Pro 2 TB",
      "power-supply": "Corsair RM850e (2023)",
      "cpu-cooler": "Noctua NH-D15",
      "case": "Phanteks XT PRO ULTRA",
      "link": "https://ca.pcpartpicker.com/list/g3Trxg",
      "price": "$2628.46"
    },
    {
      "cpu": "AMD Ryzen 9 7950X3D",
      "motherboard": "Gigabyte B650 AORUS ELITE AX",
      "memory": "Corsair Vengeance RGB 32 GB (2 x 16 GB) DDR5-6000",
      "videocard": "Gigabyte WINDFORCE OC GeForce RTX 4070 SUPER",
      "storage": "Samsung 990 Pro 4 TB",
      "power-supply": "Corsair RM1000x (2021)",
      "cpu-cooler": "NZXT Kraken Elite 360 RGB",
      "case": "Lian Li O11 Vision",
      "link": "https://ca.pcpartpicker.com/list/dQGxFZ",
      "price": "$2939.38"
    },
    {
      "cpu": "Intel Core i9-14900K",
      "motherboard": "MSI PRO Z790-A MAX WIFI",
      "memory": "G.Skill Trident Z5 RGB 64 GB",
      "videocard": "Asus TUF GAMING GeForce RTX 4080 SUPER",
      "storage": "Samsung 990 Pro 4 TB",
      "power-supply": "Corsair RM1000x (2021)",
      "cpu-cooler": "NZXT Kraken Elite 360 RGB",
      "case": "Fractal Design North",
      "link": "https://ca.pcpartpicker.com/list/rp648Q",
      "price": "$3818.96"
    },
    {
      "cpu": "AMD Ryzen 9 7950X3D",
      "motherboard": "MSI MAG X670E TOMAHAWK WIFI",
      "memory": "G.Skill Trident Z5 RGB 64 GB",
      "videocard": "Asus TUF GAMING GeForce RTX 4080 SUPER",
      "storage": "Samsung 990 Pro 4 TB",
      "power-supply": "Corsair RM1000x (2021)",
      "cpu-cooler": "NZXT Kraken Elite 360 RGB",
      "case": "Lian Li O11 Vision",
      "link": "https://ca.pcpartpicker.com/list/XGLgGP",
      "price": "$4039.44"
    },
    {
      "cpu": "AMD Ryzen 9 7950X3D",
      "motherboard": "Gigabyte B650 AORUS ELITE AX",
      "memory": "G.Skill Trident Z5 RGB 64 GB",
      "videocard": "Asus ROG STRIX GAMING OC GeForce RTX 4090",
      "storage": "Samsung 990 Pro 4 TB",
      "power-supply": "Corsair RM1000x (2021)",
      "cpu-cooler": "NZXT Kraken Elite 360 RGB",
      "case": "NZXT H9 Flow",
      "link": "https://ca.pcpartpicker.com/list/3GWrxg",
      "price": "$5822.01"
    },
    {
      "cpu": "Intel Core i9-14900K",
      "motherboard": "Asus ROG STRIX Z790-A GAMING WIFI",
      "memory": "G.Skill Trident Z5 RGB 64 GB (2 x 32 GB)",
      "videocard": "Asus ROG STRIX GAMING OC GeForce RTX 4090",
      "storage": "Samsung 990 Pro 4 TB",
      "power-supply": "Corsair HX1500i (2023) 1500 W 80+ Platinum",
      "cpu-cooler": "NZXT Kraken Elite 360 RGB",
      "case": "Montech XR ATX Mid Tower Case",
      "link": "https://ca.pcpartpicker.com/list/YxL7Yd",
      "price": "$6199.18"
    }
  ]
  `;


  return prompt2;
}
