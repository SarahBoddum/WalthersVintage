import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useKurv } from '../components/KurvContext';


export const SSUC1 = ({product}) => {
  const location = useLocation();
    const { addToKurv } = useKurv();

  const handleVidere = () => {
    // Brug addToKurv fra useKurv
    addToKurv({
        billede: product.billede1,
        overskrift: product.overskrift,
        pris: product.pris,
        id: product.id, // Sørg for at inkludere id, hvis du skal fjerne produktet senere
    });
};
if (!product) {
  return (
      <div>
          <p>Produktdata er ikke tilgængelig. Gå tilbage til <Link to="/vintage">Vintage-siden</Link>.</p>
      </div>
  );
}
    

  return (
    <div className='ssuctop'>
      <div id='ssucV'>
        <h2 className='ssucTitel mobil'>{product.overskrift}</h2>
        <img src={product.billede1} alt={product.alt} id='SS1Img1' loading="lazy"/>
        <h2 id='status'>{product.status}</h2>
        <div id='billedText'>
          <h2 className='laptop'>{product.overskrift}</h2>
          <img src={product.billede2} alt={product.alt} id='SSImg2' loading="lazy"/>
          <p>Pris<br />1200</p>
        </div>
      </div>
      <div id='ssucH'>
        <div id='vertikalP'>
          <p className='Lodretvenstre'>Produktinformation</p>
        </div>
        <div id='texBtn'>
          <p>{product.text}</p>
          <div className='knapDiv3'>
  
              <Link to="/kontakt" className='OvalKnap' onClick={handleVidere}>Kontakt</Link>
            
          </div>
        </div>
      </div>

    </div>
  )
}
export default SSUC1