import React from 'react';
import KurvKontakt from '../components/Kurvkontakt';
import kontaktimg from '../assets/Images/Kurvimg.jpg';
import Footer from '../components/Footer';


export const Kurv = () => {

  return (
    <div>
      <KurvKontakt
      LisbethKontakt={kontaktimg}
      laptopLisbeth={kontaktimg}
      kontakth1={<h1>kurv</h1>}
      kontakth1nr2={<h1>kurv</h1>}
      content={<p>Når du har fundet de produkter, du drømmer om og sendt mig en mail, skriver jeg hurtigst muligt tilbage til dig med et betalingslink og så pakker jeg tøjet til dig med det samme.</p>}>  
      </KurvKontakt>
      
      <Footer></Footer>
    </div>
  )
}
export default Kurv;