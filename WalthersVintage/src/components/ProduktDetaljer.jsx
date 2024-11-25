import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import pilVenstre from '../assets/Images/pilV.png';
import pilHøjre from '../assets/Images/pilH.png';
import Bjaelke from './Bjaelke';
import DProduktkort from './DProduktkort';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Data/firebase';
import Footer from '../components/Footer.jsx';

const ProduktDetaljer = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Produktdata fra state
    const [anbefalinger, setAnbefalinger] = useState([null, null, null]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMål, setShowMål] = useState(false);
    const [showMaterialer, setShowMaterialer] = useState(false);

    // Hent data til anbefalede produkter
    useEffect(() => {
        const fetchAnbefalinger = async () => {
            if (!product) return; // Hvis der ikke er noget produkt, hent ikke anbefalinger

            try {
                const querySnapshot = await getDocs(collection(db, 'Vintage'));
                const products = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Find anbefalinger baseret på ID'er
                const anbefalingerData = [
                    product.anbefaling1,
                    product.anbefaling2,
                    product.anbefaling3,
                ].map(id => products.find(prod => prod.id === id) || null);

                setAnbefalinger(anbefalingerData);
            } catch (error) {
                console.error("Fejl ved hentning af anbefalinger:", error);
            }
        };

        fetchAnbefalinger();
    }, [product]);

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

    // Toggle-funktioner
    const toggleMål = () => {
        setShowMål(!showMål);
        if (!showMål) setShowMaterialer(false);
    };

    const toggleMaterialer = () => {
        setShowMaterialer(!showMaterialer);
        if (!showMaterialer) setShowMål(false);
    };

    if (!product) {
        return (
            <div>
                <p>Produktdata er ikke tilgængelig. Gå tilbage til <Link to="/vintage">Vintage-siden</Link>.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Top sektion */}
            <div id="produktdetaljerTop">
                {/* Venstre sektion med karrusel */}
                <div className="Detaljer-VH borderR">
                    <Link id="filterVenstre" to={`/vintage#${product.id}`}>
                        <img src={pilVenstre} alt="Pil til venstre" className="filterpil" />
                        <p>Tilbage</p>
                    </Link>

                    {/* Produkt karrusel */}
                    <div id="produktCarousel">
                        <div id="detaljeFlex">
                            <div id="detaljeImgRamme">
                                <div className="produkt-carousel-wrapper">
                                    <div className="produkt-carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                        {billeder.map((img, idx) => (
                                            <div key={idx} className="produkt-carousel-frame">
                                                <img src={img} alt={`Produkt Slide ${idx + 1}`} className="produkt-carousel-image" />
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
                            <img src={pilVenstre} alt="Previous" className="left Dpil" onClick={handlePrev} />
                            <div className="produkt-carousel-indicators">
                                {billeder.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`produkt-carousel-indicator ${idx === currentIndex ? "produkt-active" : ""}`}
                                        onClick={() => setCurrentIndex(idx)}
                                    ></div>
                                ))}
                            </div>
                            <img src={pilHøjre} alt="Next" className="right Dpil" onClick={handleNext} />
                        </div>
                    </div>

                    <div className="knapDiv3 detaljeKD">
                        <div className="OvalKnap Detaljeknap">Læg i kurv</div>
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
                        <p id='målP'>Du opnår det bedste fit ved at måle din egen krop ved bryst, talje og hofte. Se hvordan <span id='strLink'><Link to="/strguide">her</Link></span>.
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

            {/* Anbefalinger sektion */}
            <Bjaelke>
                <h2>MATCH MED:</h2>
            </Bjaelke>
            <div id="detaljeProduktkort">
                {anbefalinger.map((anbefaling, idx) =>
                    anbefaling ? (
                        <DProduktkort key={idx} product={anbefaling} />
                    ) : (
                        <p key={idx}>Loading anbefaling {idx + 1}...</p>
                    )
                )}
            </div>
            
        </div>
    );
};

export default ProduktDetaljer;