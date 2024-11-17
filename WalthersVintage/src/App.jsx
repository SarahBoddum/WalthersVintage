import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Helmet } from 'react-helmet';
import ForsidePage from './Pages/ForsidePage';
import KontaktPage from './Pages/KontaktPage';
import OmPage from './Pages/OmPage';
import BaredygtigPage from './Pages/BaredygtigPage';
import FaqPage from './Pages/Faq';
import Navigation from './Components/Navigation';
import StitchStoriesPage from './Pages/StitchStoriesPage';
import VintagePage from './Pages/VintagePage'
import UpcycledPage from './pages/UpcycledPage'
import StrGuidePage from './pages/StrGuidePage';
import KurvPage from './pages/KurvPage';
import VintageProdukt from './pages/VintageProdukt';

function App() {
  return (
    <>
    <ScrollToTop />
     <Navigation />
     <Helmet>
        <title>Walthers Vintage</title>
        <link rel="icon" type="image/png" href="/assets/Images/wvlogo.png" />
      </Helmet>
     <Routes>
        <Route path="/" element={<ForsidePage />} />
        <Route path="/kontakt" element={<KontaktPage/>} />
        <Route path="/faq" element={<FaqPage/>} />
        <Route path="/om" element={<OmPage/>} />
        <Route path="/stitchstories" element={<StitchStoriesPage/>} />
        <Route path="/vintage" element={<VintagePage/>} />
        <Route path="/upcycled" element={<UpcycledPage/>} />
        <Route path="/strguide" element={<StrGuidePage/>} />
        <Route path="/baredygtig" element={<BaredygtigPage/>} />
        <Route path="/kurv" element={<KurvPage/>} />
        <Route path="/VintageProdukt" element={<VintageProdukt/>} />
        <Route path="*" element={<Navigate to="/"/>} />
     </Routes>
    </>
  )
}

export default App;