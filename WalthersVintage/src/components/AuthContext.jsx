// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect } from "react";
import { auth } from "../Data/firebase"; // Importér din auth fra Firebase
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe(); // Ryd observer, når komponent afmonteres
    }, []);

    // Log bruger ud efter 1 times inaktivitet
    useEffect(() => {
        if (currentUser) {
            const timeout = setTimeout(() => {
                auth.signOut();
                alert("Du er blevet logget ud på grund af inaktivitet.");
            }, 60 * 60 * 1000); // 1 time
            return () => clearTimeout(timeout); // Ryd timeout, hvis bruger logger ud manuelt
        }
    }, [currentUser]);

    const handleLogout = () => {
        auth.signOut()
            .then(() => alert("Du er nu logget ud."))
            .catch((error) => console.error("Fejl ved logud:", error));
    };

    return (
        <AuthContext.Provider value={{ currentUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
