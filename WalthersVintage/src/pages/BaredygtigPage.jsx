import React from 'react';
import VOBtop from '../components/VOBTop';
import syning from '../assets/Images/syning2.jpg';
import Bjaelke from '../components/Bjaelke';
import BeigeTxtPic from '../components/BeigeTxtPic';
import jakkeprojekt from '../assets/Images/jakkeprojekt.jpg';
import OBssuc3 from '../components/OBssuc3';
import håndDug from '../assets/Images/duge.jpg';
import dug from '../assets/Images/dug2.jpg';
import OB1 from '../components/OB1';
import LisSyr from '../assets/Images/syning1.jpg';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';

export const Baredygtig = () => {

  return (
    <div>
      <VOBtop
      VOBlaptopH1={<h1>Mit håndværk</h1>}
      VOBh1Class="H2mindre"
      VOBmobilH1={<h1>Mit håndværk</h1>}
      VOBimg={syning}
      VOBalt={'håndarbejde'}
      content={<p>En af de vigtigste grunde til, at jeg elsker vintage så højt, er at det er med til at reducere den overproduktion, der lige nu kendetegner modebranchen.
          <br /> <br />
        Derfor er alle de materialer, jeg bruger til mine egene styles også genbrugte.</p>}>
      </VOBtop>

      <Bjaelke>
        <h2>SLOW FASHION IS NOT A TREND -
          IT’S A RESPONSIBILITY</h2>
      </Bjaelke>

      <BeigeTxtPic
      MidtContent={<p>For mig er kvalitet afgørende, fordi det sikrer, at tøjet kan holde i generationer, hvis vi passer ordentligt på det. I dag er hurtig og billig produktion ofte synonymt med lav kvalitet og kort holdbarhed. De collected items, du finder i shoppen, er nøje udvalgt for deres høje standarder. 
          <br /> <br />
        Når tøjet holder længere, mindsker vi behovet for konstant forbrug og affald, hvilket bidrager til en mere ansvarlig tilgang til mode.</p>}
        OvalImg={jakkeprojekt}
        altTag={'Quiltet jakke syprojekt'}
        KnapLink={<p>Læs mere</p>}>
          {<p>Redesign, recycle</p>}
        </BeigeTxtPic>

        <OBssuc3
        OBstortbillede={håndDug}
        OBlillebillede={dug}
        OBh2={<h2>GAMLE TEKSTILER <br />- NYT LIV</h2>}
        content={<p>Genbrug er den mest skånsomme måde at forhandle mode på, da man ikke hverken bruger af jordens ressourcer eller tilføjer yderligere forurening i form af CO2. 
            <br /> <br />
          Det reducerer behovet for nye ressourcer, som ofte kræver store mængder energi og vand. Både det vintage, jeg forhandler og det tøj, jeg selv syr, har en historie og et levet liv med sig og hvis vi fortsat passer på det, er det noget af det bedste vi kan gøre for vores garderobe og for klimaet.
          </p>}>
        </OBssuc3>
        
        <OB1
        OBh2={<h2>GAMLE TEKSTILER - NYT LIV</h2>}
        OBp={<p>At gøre fashion bæredygtigt er umuligt, for al produktion har en pris. Men jeg gør hver dag mit bedste for at skabe mine styles så hensynsfuldt som muligt - både via mine upcyclede produkter og det du finder fra Stitch_Stories. Jeg bruger udelukkende genbrugsmaterialer, hvilket gør hver style unik, da der ofte kun er materialer nok til ét produkt ligesom alt det garn, jeg bruger til mine broderier er fundet brugt.</p>}
        obImg={LisSyr}
        obImgAlt={'Jeg er i gang med at sy en jakke i mit værksted'}>
        </OB1>

        <Testimonial
            solgtNone="solgtNone"
            buePic={LisSyr}
            TopContent={<h2>WALTHERS WEBSHOP</h2>}
            TestiContent={<p>Den måde min tilstedeværelse som designer påvirker verden omkring mig, ligger mig meget på sinde. Jeg er vant til at tænke over de fysike ressource, jeg bruger, men det at skulle drive en webshop i stedet for en konkret butik er nyt for mig. Derfor har jeg fået hjælp til at lave et site, hvor billeder, tekst og opsætning er lavet, så sitet udleder mindst muligt CO2. På den måde kan mit digitale håndværk få lov til at afspejle mit fysiske håndværk.</p>}>
        </Testimonial>

        <Footer></Footer>
    </div>
  )
}
export default Baredygtig;