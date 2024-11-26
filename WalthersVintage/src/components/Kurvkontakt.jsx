import React from 'react';
import { useKurv } from '../components/KurvContext'; 

export const KurvKontakt = (props) => {
    const { LisbethKontakt, laptopLisbeth, kontakth1, content } = props;
    const { kurvData, removeFromKurv } = useKurv();

    const handleFjernProdukt = (produktId) => {
        removeFromKurv(produktId);
    };

    return (
        <div id='KurvKontakt'>
            <div id='KKtop'>
                <img src={LisbethKontakt} className='KKimg mobil' alt='Lisbeth' />
                <div id='KKtext'>
                    <h1>{kontakth1}</h1>
                    <p>{content}</p>
                </div>
            </div>
            <div id='formularImg'>
                <img src={laptopLisbeth} className='KKimgStor laptop' alt='Lisbeth' />
                <div id='kontaktformular'>
                    <div className='inputKontakt'>
                        <div className='mailEmne'>
                            <div className='labelKontakt'>
                                <label>Mail :</label>
                            </div>
                            <input className='inputKontakt' placeholder='din-mail@email.com' />
                        </div>
                        <div className='mailEmne'>
                            <div className='labelKontakt'>
                                <label>Emne :</label>
                            </div>
                            <input className='inputKontakt' placeholder='______________' />
                        </div>  
                    </div>
                    {/* Liste over produkter i kurv */}
                    <div className='kontaktBeskedFlex'>
                        <div className='inputdiv'>
                            <input id='inputbesked' placeholder='Din besked...' />
                        </div>
                        <div className='inputdiv'>
                            {kurvData && kurvData.length > 0 ? (
                                kurvData.map((produkt, index) => (
                                    <div key={index} className="kurv-produkt">
                                        <img src={produkt.billede} alt={`Produkt ${index + 1}`} />
                                        <div className='produkttekstBestilling'>
                                            <h2>{produkt.overskrift}</h2>
                                            <p>Pris: {produkt.pris} DKK</p>
                                            <button
                                                className="OvalKnap fjern-knap"
                                                onClick={() => handleFjernProdukt(produkt.id)}
                                            >
                                                Fjern
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Ingen produktdata tilgængelig.</p>
                            )}
                        </div>
                    </div>
                    <div className='knapDiv3 KKknap'>
                        <div className='OvalKnap'>Send</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KurvKontakt;
