import React from 'react';
import nål from '../assets/Images/WVnål.svg';
import insta from '../assets/Images/insta.svg';
import face from '../assets/Images/facebook.svg';

export const Footer = () => {

  return (
    <div id='footer'>
        <div id='FooterInfo'>
            <h2>kontakt :</h2>
            <a href="mailto:walthersvintage@outlook.com" id='mailA'>walthersvintage@outlook.com</a>
            <h2>adresse :</h2>
            <p>Gadenavn 1, postnummer Ry</p>
            <h2>åbningstider :</h2>
            <p>Efter aftale</p>
            <div id='SoMebox'>
                <a href="https://www.instagram.com/walthersvintage/" target='blank'><img src={insta} alt='instagram ikon'/></a> 
                <a href="https://www.facebook.com/profile.php?id=100091951780258" target='blank'><img src={face} alt='facebook ikon'/></a> 
            </div>
        </div>
        <img id='nål' src={nål} alt='synål og broderihjerte illustration'/>
    </div>
  )
}
export default Footer;