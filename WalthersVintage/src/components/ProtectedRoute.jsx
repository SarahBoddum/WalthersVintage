import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importér useAuth, så vi kan få fat i currentUser

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth(); // Henter currentUser fra konteksten

    // Hvis brugeren ikke er logget ind, sendes de til login-siden
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children; // Hvis brugeren er logget ind, vises det ønskede indhold
};

export default ProtectedRoute;
