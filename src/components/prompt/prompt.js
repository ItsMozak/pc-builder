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
    return `
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
    `;
  }
  