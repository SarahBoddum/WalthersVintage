import React from 'react';
import { Link } from 'react-router-dom';

export const SSUC1 = ({product}) => {
    

  return (
    <div className='ssuctop'>
      <div id='ssucV'>
        <h2 className='ssucTitel mobil'>{product.overskrift}</h2>
        <img src={product.billede1} alt={product.alt} id='SS1Img1'/>
        <h2 id='status'>{product.status}</h2>
        <div id='billedText'>
          <h2 className='laptop'>{product.overskrift}</h2>
          <img src={product.billede2} alt={product.alt} id='SSImg2'/>
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
  
              <Link to="/kontakt" className='OvalKnap'>Kontakt</Link>
            
          </div>
        </div>
      </div>

    </div>
  )
}
export default SSUC1