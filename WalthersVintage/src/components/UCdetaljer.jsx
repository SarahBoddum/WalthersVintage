import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import pilVenstre from '../assets/Images/pilV.png';
import pilHøjre from '../assets/Images/pilH.png';
import Footer from './Footer.jsx';
import { useKurv } from '../components/KurvContext';
import Bjaelke from './Bjaelke';

const UCdetaljer = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Produktdata fra state
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToKurv, removeFromKurv, isProductInKurv  } = useKurv();
    const [showMål, setShowMål] = useState(false);
    const [showMaterialer, setShowMaterialer] = useState(false);


    // Konstrukt billed-array
    const billeder = [
        product?.billede,
        product?.karrusel1,
        product?.karrusel2,
        product?.karrusel3,
    ].filter(Boolean);

    // Funktioner til karrusellen
    const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % billeder.length);
    const handlePrev = () => setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? billeder.length - 1 : prevIndex - 1
    );

    // Swipe-håndtering
    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        preventScrollOnSwipe: true,
        trackMouse: true, // Tillad museswipe til desktop
    });
 // Håndter "Læg i kurv" og "Fjern fra kurv"
 const toggleKurv = () => {
    if (isProductInKurv(product.id)) {
        removeFromKurv(product.id);
    } else {
        addToKurv({
            billede: product.billede,
            overskrift: product.overskrift,
            pris: product.pris,
            id: product.id,
        });
    }
};

if (!product) {
    return (
        <div>
            <p>Produktdata er ikke tilgængelig. Gå tilbage til <Link to="/vintage">Vintage-siden</Link>.</p>
        </div>
    );
}

    if (!product) {
        return (
            <div>
                <p>Produktdata er ikke tilgængelig. Gå tilbage til <Link to="/vintage">Vintage-siden</Link>.</p>
            </div>
        );
    }
    const toggleMål = () => {
        setShowMål(!showMål);
        if (!showMål) setShowMaterialer(false);
    };

    const toggleMaterialer = () => {
        setShowMaterialer(!showMaterialer);
        if (!showMaterialer) setShowMål(false);
    };

    return (
        <div>
            <div id="produktdetaljerTop">
                <div className="Detaljer-VH borderR">
                    <Link id="filterVenstre" to={`/upcycled#${product.id}`}>
                        <img src={pilVenstre} alt="Pil til venstre" className="filterpil" loading="lazy" />
                        <p>Tilbage</p>
                    </Link>

                    {/* Karrusel med swipe */}
                    <div id="produktCarousel" {...swipeHandlers}>
                        <div id="detaljeFlex">
                            <div id="detaljeImgRamme">
                                <div className="produkt-carousel-wrapper">
                                    <div
                                        className="produkt-carousel-content"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {billeder.map((img, idx) => (
                                            <div key={idx} className="produkt-carousel-frame">
                                                <img src={img} alt={`Produkt Slide ${idx + 1}`} className="produkt-carousel-image" loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div id="detaljerCirkel">
                                <p>Pris: <br /> {product.pris} kr</p>
                            </div>
                        </div>

                        <div className="produkt-carousel-navigation">
                            <img src={pilVenstre} alt="Previous" className="left Dpil" onClick={handlePrev} loading="lazy" />
                            <div className="produkt-carousel-indicators">
                                {billeder.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`produkt-carousel-indicator ${idx === currentIndex ? "produkt-active" : ""}`}
                                        onClick={() => setCurrentIndex(idx)}
                                    ></div>
                                ))}
                            </div>
                            <img src={pilHøjre} alt="Next" className="right Dpil" onClick={handleNext} loading="lazy" />
                        </div>
                    </div>

                    <div className="knapDiv3 detaljeKD">
                        <div className="OvalKnap Detaljeknap" onClick={toggleKurv}>
                            {isProductInKurv(product.id) ? "Fjern" : "Læg i kurv"}
                        </div>
                        <Link className="OvalKnap Detaljeknap" to="/kurv">Gå til kurv</Link>
                    </div>
                </div>

                {/* Højre sektion med tekst */}
                <div className="Detaljer-VH mobilVH">
                    <p id="detaljeTxt">{product.text}</p>
                    <div className="knapDiv3 detaljeKD">
                        <div className={`OvalKnap Detaljeknap ${showMål ? 'active' : ''}`} onClick={toggleMål}>
                            Mål
                        </div>
                        <div className={`OvalKnap Detaljeknap ${showMaterialer ? 'active' : ''}`} onClick={toggleMaterialer}>
                            Materialer
                        </div>
                    </div>
                </div>
            </div>
             {/* Toggle sektioner */}
             {showMål && (
                <div className="toggleSection">
                    <div className='Detaljer-VH borderR'>
                        <h2 id='målh2'>relevante mål :</h2>
                        <div id='ekstramålRamme'>
                            <div className='ekstramål borderR'>
                                <p>{product.mål1}</p>
                                <p>{product.mål3}</p>
                                <p>{product.mål5}</p>
                            </div>
                            <div className='ekstramål'>
                                <p>{product.mål2}</p>
                                <p>{product.mål4}</p>
                                <p>{product.mål6}</p>
                            </div>
                        </div>
                        <div id='EstStr'><h2>estimeret størrelse: {product.størrelse}</h2></div>
                    </div>
                    <div className='Detaljer-VH'>
                        <p id='målP'>OBS!<br /> Alle produktets mål er fratrukket rørlig vidde - de mål, der står oplyst er altså de mål, DIN krop skal have for at passe produktet. Hvis du vil vide mere så læs <span id='strLink'><Link to="/strguide">her</Link></span>.
                            <br />Alle størrelser er vejledende.
                            <br /><br />
                            Er du i tvivl, må du altid skrive til mig, så hjælper jeg dig gerne
                        </p>
                    </div>
                </div>
            )}

            {showMaterialer && (
                <div className="toggleSection">
                    <div id='materialer'>
                        <h2>Materialer :</h2>
                        <p>{product.materialer}</p>
                        <p>{product.care}</p>
                        <p>Handle with love <br />Treat delicately<br />Reuse when worn</p>
                    </div>
                </div>
            )}


            <Bjaelke><h2>it comes from the heart</h2></Bjaelke>
            <Footer></Footer>
        </div>
    );
};

export default UCdetaljer;
