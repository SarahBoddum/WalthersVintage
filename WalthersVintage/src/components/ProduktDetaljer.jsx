import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import pilVenstre from '../assets/Images/pilV.png';
import Bjaelke from './Bjaelke';
import VProduktkort from './VProduktkort'; // Importér VProduktkort
import data from '../Data/ProduktKort.json'; 




export const ProduktDateljer = () => {
    const location = useLocation();
    const { product } = location.state; // Hent produktdata fra state

    // Find anbefalede produkter baseret på IDs i "anbefalinger" feltet
    const anbefalinger = product.anbefalinger?.map((anbefId) =>
        data.produktkort.find((item) => item.id === anbefId)
    ) || []; // Hvis "anbefalinger" er tomt eller undefined, brug en tom liste

  
    return (
        <div>
            <div id="produktdetaljerTop">
                <div  className='Detaljer-VH borderR'>
                <Link id='filterVenstre' to="/vintage">
                    <img src={pilVenstre} alt='pil til venstre ikon' className='filterpil'/>
                    <p>Tilbage</p>
                </Link>
                    <div id='detaljeFlex'>
                        <div id='detaljeImgRamme'>
                            <img src={product.billede} alt={product.alt} className="detaljebillede" />
                        </div>
                        <div id='detaljerCirkel'>
                            <p>Pris: <br /> {product.pris}</p>
                        </div>
                    </div>

                    <div className='knapDiv3 detaljeKD'>
                        <div className='OvalKnap Detaljeknap'>Læg i kurv</div>
                        <div className='OvalKnap Detaljeknap'>Gå til kurv</div>
                    </div>
                   
                </div>
                
                <div className='Detaljer-VH'>
                    <p id='detaljeTxt'>{product.text}</p>
                    
                    <div className='knapDiv3 detaljeKD'>
                        <div className='OvalKnap Detaljeknap'>Mål</div>
                        <div className='OvalKnap Detaljeknap'>Materialer</div>
                    </div>
                </div>
            </div>

            <Bjaelke>
                {<h2>MATCH MED :</h2>}
            </Bjaelke>
                <div id='detaljeProduktkort'>
                    {anbefalinger.map((anbefaling) => (
                    <VProduktkort key={anbefaling.id} product={anbefaling} />
                    ))}
                </div>
        </div>
    );
  };
export default ProduktDateljer