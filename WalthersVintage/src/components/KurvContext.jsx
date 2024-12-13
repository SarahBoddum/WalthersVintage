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

    // Tjek om produkt er i kurv
    const isProductInKurv = (productId) => {
        return kurvData.some((item) => item.id === productId); // Brug `kurvData` korrekt
    };

    return (
        <KurvContext.Provider value={{ kurvData, addToKurv, removeFromKurv, isProductInKurv }}>
            {children}
        </KurvContext.Provider>
    );
};

// Custom Hook
export const useKurv = () => useContext(KurvContext);
