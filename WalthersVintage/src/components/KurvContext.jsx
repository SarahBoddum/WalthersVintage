import React, { createContext, useContext, useState } from 'react';

// Opret Context
const KurvContext = createContext();

// Context Provider
export const KurvProvider = ({ children }) => {
    const [kurvData, setKurvData] = useState([]);

    // Tilføj produkt til kurven
    const addToKurv = (produkt) => {
        setKurvData((prevKurv) => [...prevKurv, produkt]);
    };

    // Fjern produkt fra kurven
    const removeFromKurv = (produktId) => {
        setKurvData((prevKurv) => prevKurv.filter((produkt) => produkt.id !== produktId));
    };

    return (
        <KurvContext.Provider value={{ kurvData, addToKurv, removeFromKurv }}>
            {children}
        </KurvContext.Provider>
    );
};

// Custom Hook
export const useKurv = () => useContext(KurvContext);
