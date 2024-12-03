import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Data/Firebase'; // Justér stien til din Firebase-konfiguration
import ScrollToTop from './components/ScrollToTop';
import { Helmet } from 'react-helmet';
import ForsidePage from './Pages/ForsidePage';
import KontaktPage from './Pages/KontaktPage';
import OmPage from './Pages/OmPage';
import BaredygtigPage from './Pages/BaredygtigPage';
import FaqPage from './Pages/Faq';
import Navigation from './Components/Navigation';
import StitchStoriesPage from './Pages/StitchStoriesPage';
import VintagePage from './Pages/VintagePage';
import UpcycledPage from './pages/UpcycledPage';
import StrGuidePage from './pages/StrGuidePage';
import KurvPage from './pages/KurvPage';
import VintageProdukt from './pages/VintageProdukt';
import ProduktDetaljer from './Components/ProduktDetaljer';
import UCdetaljer from './components/UCdetaljer';
import { KurvProvider } from './components/KurvContext';
import Login from './components/Login';
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from './components/ProtectedRoute'; // Importer ProtectedRoute korrekt
import MinSide from './pages/Minside';
import Betingelser from './pages/Betingelser';

function App() {
  const [currentUser, setCurrentUser] = useState(null); // Holder auth-status

  // Overvåg loginstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Helmet>
        <title>Walthers Vintage</title>
        <link rel="icon" type="image/png" href="HeadWV.svg" />
      </Helmet>
      <AuthProvider>
      <KurvProvider>
        <Routes>
          {/* Offentlige ruter */}
          <Route path="/" element={<ForsidePage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/om" element={<OmPage />} />
          <Route path="/stitchstories" element={<StitchStoriesPage />} />
          <Route path="/vintage" element={<VintagePage />} />
          <Route path="/upcycled" element={<UpcycledPage />} />
          <Route path="/strguide" element={<StrGuidePage />} />
          <Route path="/baredygtig" element={<BaredygtigPage />} />
          <Route path="/kurv" element={<KurvPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/betingelser" element={<Betingelser />} />
          <Route path="/VintageProdukt" element={<VintageProdukt />} />
          
          {/* Beskyttede ruter */}
          <Route
            path="/min-side"
            element={
              <ProtectedRoute>
                <MinSide /> {/* MinSide er den beskyttede komponent */}
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/produkt/uc/:id" element={<UCdetaljer />} />
          <Route path="/produkt/:id" element={<ProduktDetaljer />} />
        </Routes>
      </KurvProvider>
      </AuthProvider>
    </>
  );
}

export default App;
