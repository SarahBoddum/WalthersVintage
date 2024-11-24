import React from 'react';
import KurvKontakt from '../components/Kurvkontakt';
import kontaktimg from '../assets/Images/Kontaktlisbeth.jpg';


export const Kontakt = () => {

  return (
    <div>
      <KurvKontakt
      LisbethKontakt={kontaktimg}
      laptopLisbeth={kontaktimg}
      kontakth1={<h1>kontakt mig</h1>}
      content={<p>Hvis du har et spørgsmål - det kan være hvad som helst, om min proces, et produkt eller hjælp til størrelse, så holde dig ikke tilbage. Jeg læser alt og svarer så hurtigt jeg kan.</p>}>  
      </KurvKontakt>
    </div>
  )
}
export default Kontakt;