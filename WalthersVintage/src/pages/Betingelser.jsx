import React, { useState } from 'react';
import faqImg from '../assets/Images/FAQwv.jpg';
import Footer from '../components/Footer';

export const Betingelser = () => {
  const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null); // Holder styr på hvilket spørgsmål der er åbent

  const toggleAnswer = (index) => {
    // Hvis det samme spørgsmål klikkes igen, lukkes det. Ellers åbnes det.
    setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
  };

  const questions = [
    "RETURRET VED VINTAGE OG UPCYCLEDE PRODUKTER",
    "RETURRET VED SPECIALSYEDE PRODUKTER",
    "FORSENDELSE VED RETURNERING",
    "KAN JEG PRØVE TØJET INDEN KØB",
    "HVOR SKAL RETURVARER SENDES TIL?",
  ];

  const answers = [
    "Jeg tilbyder naturligvis 14 dages retur på alle køb af kategorierne Vintage og Upcycled - er der tydeligt slid eller skader, der er sket efter afsendelse, vil dette dog modregnet i refunderingen",
    "Hvis du har bestilt et specialsyet produkt, gives der desværre ikke returret, da produktet som udgangspunkt er syet specifikt til din krop",
    "Hvis du ønsker at returnere et produkt, er det dig selv, der betaler forsendelsen. Når jeg har modtaget produktet sendes dine penge retur",
    "Ja, du er altid velkommen i mit værksted i Ry, hvor du kan prøve både vintage produkter og speciallavede produkter",
    "Når du kontakter mig, modtager du et autosvar inden den endelige ordrebkræftelse med alle kontaktinformtioner, du skal bruge",
  ];

  return (
    <div>
      <div id='faqDiv'>
        <div id='faqTxt'>
          <h1 className='F100b laptop'>betingelser</h1>
          <div id='faqs'>
            {questions.map((question, index) => (
              <div key={index}>
                <div className='question' onClick={() => toggleAnswer(index)}>
                  <div className='faqCirkel'>{index + 1}</div>
                  <h2 className='betingleseh2'>{question}</h2>
                </div>

                <div className={`answer ${visibleAnswerIndex === index ? 'show' : ''}`}>
                  {visibleAnswerIndex === index && <p>{answers[index]}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <img src={faqImg} id='faqImg' alt='Mig og mit tøj' />
        <h1 className='betingelsesH1 mobil'>betingelser</h1>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Betingelser;