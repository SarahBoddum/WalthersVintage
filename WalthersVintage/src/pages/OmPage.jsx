import React from 'react';
import VOBtop from '../components/VOBTop';
import omImg from '../assets/Images/Walther1.jpg';
import Bjaelke from '../components/Bjaelke';
import OBssuc3 from '../components/OBssuc3';
import Lis1 from '../assets/Images/portræ1.jpg';
import walther from '../assets/Images/OmWaltherogfus.jpg';
import OB1 from '../components/OB1';
import symaskine from '../assets/Images/symaskine.jpg';
import Testimonial from '../components/Testimonial';
import hanger from '../assets/Images/Omhanger.jpg';
import Footer from '../components/Footer';


export const Baredygtig = () => {

  return (
    <div>
        <VOBtop
        VOBmobilH1={<h1>om <br />walthers vintage</h1>}
        VOBlaptopH1={<h1>om walthers vintage</h1>}
        VOBimg={omImg}
        content={<p>Velkommen til Walthers Vintage - Walther er min skønne hund, som  jeg altid har omkring fødderne, når jeg syr i mit værksted, derhjemme. 
                <br /><br />
            I butikken finder du de fineste vintage fund, mit eget brand Stitch_Stories og upcyclede vintage styles</p>}>
        </VOBtop>

        <Bjaelke>
            <h2>a brand with purpose</h2>
        </Bjaelke>

        <OBssuc3
        OBstortbillede={Lis1}
        OBlillebillede={walther}
        OBh2={<h2>HØJ KVALITET OG UNIKKE FUND</h2>}
        content={<p>Walthers Vintage er en lille, passioneret vintage shop, hvor hver style er nøje udvalgt. Jeg rejser selv rundt i verden efter unikke fund, så du altid kan få noget, du ikke lige kan finde next door. Mit fokus er på god kvalitet, tidens trends og farveaktualitet, og mine kollektioner er sammensat, så de fungerer som en helhed.
                <br /><br />
            Selvom mine kollektioner bygger på vintage og upcyclede materialer, har jeg altid et skarpt øje for de kommende sæsoners trends og farver. I dag bruger jeg den viden, når jeg styler og udvælger alt det, du kan finde i shoppen. 
            </p>}>
        </OBssuc3>

        <OB1
        OBh2={<h2>ET ALTERNATIV TIL FASTFASHION</h2>}
        OBp={<p>Jeg startede Walthers Vintage, fordi jeg gennem min lange karriere i modebranchen blev opmærksom på de enorme udfordringer med overproduktion og forurening. Det overgår flybranchen..! Det ønsker jeg at gøre noget ved.
            Walthers Vintage giver dig en mulighed for at vælge en mere hensynsfuld tilgang til mode, hvor kvalitet, genbrug og ansvar går hånd i hånd. 
            </p>}
        obImg={symaskine}>
        </OB1>

        <Testimonial
            solgtNone="solgtNone"
            buePic={hanger}
            TopContent={<h2>HÅNDVÆRK FRA HELE VERDEN</h2>}
            TestiContent={<p>Min rejse som designer har ført mig rundt i hele verden, hvor vintage shopping altid har været en kilde til inspiration. Håndværk fra en tid, hvor kvalitet og holdbarhed var i fokus, har altid fascineret mig.
                    <br /><br />
                Strikketeknikker, vævninger og unikke detaljer, der fortæller historier fra fortiden, er elementer, jeg værdsætter og bringer videre i Walthers Vintages kollektioner. Disse “Collected Items” afspejler en tidløs æstetik og er skabt til at holde.
                </p>}
            buetilOval="buetilOval">
        </Testimonial>

        <Footer></Footer>
    </div>
  )
}
export default Baredygtig;