import React from 'react';
import { Link } from 'react-router-dom';


export const Unika = (props) => {
 const {UnikaH1, UnikaTopStort, UTstortAlt, cirkelQuote, UnikaTopLille, UTlilleAlt, unikaTxt } = props;

  return (
    <div id='unikaTop'>
        <h1 className='mobil'>{UnikaH1}</h1>
        <div id='PicCirkelramme'>
            <img src={UnikaTopStort} id='UTStorImg' alt={UTstortAlt}/>
            <div id='unikaTopCirkel'>{cirkelQuote}</div>
        </div>
        <div id='unkaTxtPic'>
            <h1 className='laptop'>{UnikaH1}</h1>
            <div id='UnikaTxtBox'>
                <img src={UnikaTopLille} id='UTlilleImg' alt={UTlilleAlt}/>
                <div id='unikaTxtBtn'>
                    {unikaTxt}
                    <Link className='OvalKnap unikaBtn' to="/Kontakt">Kontakt</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Unika