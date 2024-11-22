import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import pilVenstre from '../assets/Images/pilV.png';
import Bjaelke from './Bjaelke';
import DProduktkort from './DProduktkort';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../Data/firebase';
import pilHøjre from '../assets/Images/pilH.png';

export const ProduktDetaljer = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Hent produktdata fra state
    const [anbefaling1Data, setAnbefaling1Data] = useState(null);
    const [anbefaling2Data, setAnbefaling2Data] = useState(null);
    const [anbefaling3Data, setAnbefaling3Data] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // State for karrusellen

    // Hent data for anbefalede produkter baseret på ID'erne
    useEffect(() => {
        const fetchAlleAnbefalinger = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Vintage'));
                const products = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                // Hent anbefalinger dynamisk
                [product?.anbefaling1, product?.anbefaling2, product?.anbefaling3].forEach((anbefalingId, index) => {
                    const anbefaling = products.find(item => item.id === anbefalingId);
                    if (index === 0) setAnbefaling1Data(anbefaling);
                    if (index === 1) setAnbefaling2Data(anbefaling);
                    if (index === 2) setAnbefaling3Data(anbefaling);
                });
            } catch (error) {
                console.error("Error fetching anbefalinger:", error);
            }
        };
    
        fetchAlleAnbefalinger();
    }, [product]);

    // Konstrukt billed-array
    const billeder = [
        product?.billede,      // Hovedbillede
        product?.karrusel1,    // Ekstra billede 1
        product?.karrusel2,    // Ekstra billede 2
        product?.karrusel3,    // Ekstra billede 3
    ].filter(Boolean); // Filtrer null eller undefined fra

    // Funktioner til karrusellen
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % billeder.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? billeder.length - 1 : prevIndex - 1
        );
    };

    // Hvis produktdata ikke findes
    if (!product) {
        return (
            <div>
                <p>Produktdata er ikke tilgængelig. Gå tilbage til <Link to="/vintage">Vintage-siden</Link>.</p>
            </div>
        );
    }

    return (
        <div>
            <div id="produktdetaljerTop">
                <div className="Detaljer-VH borderR">
                    <Link id="filterVenstre" to={`/vintage#${product.id}`}>
                        <img src={pilVenstre} alt="Pil til venstre ikon" className="filterpil" />
                        <p>Tilbage</p>
                    </Link>

                    {/* Karrusel */}
                    <div id="produktCarousel">
                        <div id='detaljeFlex'>
                            <div id='detaljeImgRamme'>
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
                            <img
                                src={pilVenstre}
                                alt="Previous"
                                className="left Dpil"
                                onClick={handlePrev}
                                />
                            <div className="produkt-carousel-indicators">
                                {billeder.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`produkt-carousel-indicator ${
                                            idx === currentIndex ? "produkt-active" : ""
                                        }`}
                                        onClick={() => setCurrentIndex(idx)}
                                    ></div>
                                ))}
                            </div>
                            <img
                                src={pilHøjre}
                                alt="Next"
                                className="right Dpil"
                                onClick={handleNext}
                            />
                        </div>
                    </div>

                    <div className="knapDiv3 detaljeKD">
                        <div className="OvalKnap Detaljeknap">Læg i kurv</div>
                        <Link className="OvalKnap Detaljeknap" to="/kurv">Gå til kurv</Link>
                    </div>
                </div>

                <div className="Detaljer-VH mobilVH">
                    <p id="detaljeTxt">{product.text}</p>
                    <div className="knapDiv3 detaljeKD">
                        <div className="OvalKnap Detaljeknap">Mål</div>
                        <div className="OvalKnap Detaljeknap">Materialer</div>
                    </div>
                </div>
            </div>

            <Bjaelke>
                <h2>MATCH MED:</h2>
            </Bjaelke>
            <div id="detaljeProduktkort">
                {anbefaling1Data ? (
                    <DProduktkort product={anbefaling1Data} />
                ) : (
                    <p>Loading anbefaling 1...</p>
                )}
                {anbefaling2Data ? (
                    <DProduktkort product={anbefaling2Data} />
                ) : (
                    <p>Loading anbefaling 2...</p>
                )}
                {anbefaling3Data ? (
                    <DProduktkort product={anbefaling3Data} />
                ) : (
                    <p>Loading anbefaling 3...</p>
                )}
            </div>
        </div>
    );
};

export default ProduktDetaljer;