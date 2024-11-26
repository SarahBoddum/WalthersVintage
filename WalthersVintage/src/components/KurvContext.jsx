import React, { createContext, useState, useContext } from 'react';

// Opret Context
const KurvContext = createContext();

// Provider-komponent, der holder global state
export const KurvProvider = ({ children }) => {
  const [kurvData, setKurvData] = useState(null);

  return (
    <KurvContext.Provider value={{ kurvData, setKurvData }}>
      {children}
    </KurvContext.Provider>
  );
};

// Custom hook til nem adgang til Context
export const useKurv = () => useContext(KurvContext);