import React from 'react';
import { Link } from 'react-router-dom';


export const SSUC2 = ({product}) => {

  return (
    <div className='BaggSand ssucramme'>
        <div className='beigeTxtPic ssucBTP'>
            <div className='txtLodVandret ssuucHeight'>
                <div className='Lodretvenstre ssucVertikal'>
                    <h2>{product.overskrift}</h2>
                </div>
                <div className='TextMidt ssuc2Text'>
                    <p>{product.text}</p>
                    <img src={product.billede1} alt={product.alt} id='MCImg' loading="lazy"/> 
                    <h2>{product.status}</h2>
                </div>
                <div className='Lodrethøjre ssucVertikal'>
                    <h2>{product.overskrift}</h2>
                </div>  
            </div>
            <div className='OvalPic ssuc1PicPris'>
                <img src={product.billede2} alt={product.alt} className='OvalImg' loading="lazy"/>
                <p>Pris<br />{product.pris}</p>
            </div>
        </div>

        <div className='knapDiv3 beige'>
            <Link className='OvalKnap' to="/kontakt">
                Kontakt
            </Link>
        </div>
    </div>
  )
}
export default SSUC2