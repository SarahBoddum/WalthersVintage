import React, { useState } from 'react';
import faqimg from '../assets/Images/størresler.webp';
import dukke from '../assets/Images/måledukke3.svg';
import Footer from '../components/Footer';
import måledukke2 from '../assets/Images/måledukke2.svg';
import Fit from '../components/Fit';

export const Størrelsesguide = () => {
  const [openSection, setOpenSection] = useState(null); // Holder styr på den aktive sektion

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section); // Toggler synlighed
  };

  return (
    <div className='Størrelsesguide'>
      <div className='StrTxtPic'>
        <div className='StrTxt'>
          <h1>Størrelses<span className='mobil'><br /></span>guide</h1>
          <img className='strImg mobil' src={faqimg} alt='Mig med mine konstruktionsredskaber' />
          <p>
            Hvis du ofte synes, det er svært at finde og vurdere den rigtige størrelse - særligt på nettet - så forstår jeg det godt.
            Det ER ikke så lige til, særligt ikke når det kommer til vintagetøj. Derfor gør jeg det på en lidt anden måde.
            <br /><br />
            For at du bedst kan tjekke om tøjet passer netop DIN krop, har jeg målt alt op, så det eneste, du skal gøre er, at måle dig selv ved brystet, taljen og hoften.
            <br /><br />
            Her kan du læse om målene for mine grundstørrelser, ekstra mål og fit guide.
          </p>
        </div>
        <img className='strImg laptop' src={faqimg} alt='Mig med mine konstruktionsredskaber' />
      </div>

      <div className='knapDiv3'>
        <div className='knapKasse'>
          <button type='button' className="OvalKnap MarginBtn" onClick={() => toggleSection('målskema')}>Grundmål</button>
        </div>
        <div className='knapKasse KnapMidt'>
          <button type='button' className="OvalKnap MarginBtn" onClick={() => toggleSection('ekstraMålDiv')}>Ekstra mål</button>
        </div>
        <div className='knapKasse'>
          <button type='button' className="OvalKnap MarginBtn" onClick={() => toggleSection('fitDiv')}>Fit guide</button>
        </div>
      </div>

      {/* Målskema */}
      {openSection === 'målskema' && (
        <div id='målskema'>
          <div id='størrelser'>
            <div id='målsteder'>
              <h2>bryst</h2>
              <h2>talje</h2>
              <h2>hofte</h2>
            </div>
            <div id='måleflex'>
              <div id='sizes'>
                <div className='cirkelholder'><div className='cirkelmål'><h2>34</h2></div></div>
                <div className='cirkelholder'><div className='cirkelmål'><h2>36</h2></div></div>
                <div className='cirkelholder'><div className='cirkelmål'><h2>38</h2></div></div>
                <div className='cirkelholder'><div className='cirkelmål'><h2>40</h2></div></div>
                <div className='cirkelholder'><div className='cirkelmål'><h2>42</h2></div></div>
                <div className='cirkelholder'><div className='cirkelmål'><h2>44</h2></div></div>
                <div className='cirkelholder borderB'><div className='cirkelmål'><h2>46</h2></div></div>
              </div>
              <div className='brystmål'>
                <div className='mål'><p>80-84 cm</p></div>
                <div className='mål'><p>84-88 cm</p></div>
                <div className='mål'><p>88-92 cm</p></div>
                <div className='mål'><p>92-96 cm</p></div>
                <div className='mål'><p>96-100 cm</p></div>
                <div className='mål'><p>100-104 cm</p></div>
                <div className='mål borderB'><p>104-108 cm</p></div>
              </div>
              <div className='brystmål'>
                <div className='mål talje'><p>64-68 cm</p></div>
                <div className='mål talje'><p>68-72 cm</p></div>
                <div className='mål talje'><p>72-76 cm</p></div>
                <div className='mål talje'><p>76-80 cm</p></div>
                <div className='mål talje'><p>80-84 cm</p></div>
                <div className='mål talje'><p>84-88 cm</p></div>
                <div className='mål talje borderB'><p>88-92 cm</p></div>
              </div>
              <div className='brystmål'>
                <div className='mål hofte'><p>88-92 cm</p></div>
                <div className='mål hofte'><p>92-96 cm</p></div>
                <div className='mål hofte'><p>96-100 cm</p></div>
                <div className='mål hofte'><p>100-104 cm</p></div>
                <div className='mål hofte'><p>104-108 cm</p></div>
                <div className='mål hofte'><p>108-112 cm</p></div>
                <div className='mål hofte borderB'><p>112-116 cm</p></div>
              </div>
            </div>
          </div>
          <div id='måleBaggrund'>
            <img id='måledukke' src={dukke} alt='Illustration af hvor på kroppen du skal tage mål' loading="lazy"/>
          </div>
        </div>
      )}

      {/* Ekstra mål */}
      {openSection === 'ekstraMålDiv' && (
        <div id='ekstraMålDiv'>
          <h2 className='centerH2'>ekstra mål :</h2>
          <div id='ekstraMålflex'>
            <div id='EMdukkeBox' className='laptop'>
              <div className='EMDbaggrund laptop'>
                <img id='ekstraMåldukke'  className='laptop' src={måledukke2} alt='måledukke med optegning af flere målsteder' loading="lazy"/>
              </div>
            </div>
            <div id='EMtext'>
              <p id='EMtextp'>Udover de mål, jeg bruger til at vurdere en størrelse, er der flere andre relevante mål, du skal kende, så du bedst muligt kan vurdere om det passer dig. 
                  <br /><br />
                  Her er dem, jeg bruger til mine produkter 
              </p>
              <div id='EMdukkeBox' className='mobil'>
                <div className='EMDbaggrundmobil'>
                  <img id='ekstraMåldukke'  className='mobil' src={måledukke2} alt='måledukke med optegning af flere målsteder' loading="lazy"/>
                </div>              
              </div>
              <div>
                <div className='EMtextFlex'>
                    <h2 className='EMmålh2'>SKULDERBREDDE</h2>
                    <p className='EMmålp'>Måles fra skulderspids til skulderspids på ryggen. Målet bruges både til at bestemme fittet  og størrelsen</p>
                </div>

                <div className='EMtextFlex'>
                    <h2 className='EMmålh2'>SKRIDT TIL ANKEL</h2>
                    <p className='EMmålp'>Måles fra skridtet til ankel og bruges til at bestemme om længden på bukserne passer til din krop</p>
                </div>

                <div className='EMtextFlex'>
                    <h2 className='EMmålh2'>HØJDE</h2>
                    <p className='EMmålp'>Din fulde højde i cm. Den skal jeg bruge, når du bestiller et specialsyet produkt for at udregne dine øvrigt mål</p>
                </div>

                <div className='EMtextFlex'>
                    <h2 className='EMmålh2'>LÆNGDE</h2>
                    <p className='EMmålp'>Den relevante længde på en style - fx længden på nederdelen, jakken fra skuldrens højeste punkt til sømkanten</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fit guide */}
      {openSection === 'fitDiv' && (
        <div id='fitDiv'>
          <h2 className='centerH2'>fitguide :</h2>
          <Fit></Fit>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Størrelsesguide;
