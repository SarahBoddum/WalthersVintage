import React, { useState } from 'react';
import faqImg from '../assets/Images/FAQwv.jpg';
import Footer from '../components/Footer';

export const FAQ = () => {
  const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null); // Holder styr på hvilket spørgsmål der er åbent

  const toggleAnswer = (index) => {
    // Hvis det samme spørgsmål klikkes igen, lukkes det. Ellers åbnes det.
    setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
  };

  const questions = [
    "Hvordan finder jeg nemmest den rigtige størrelse til min krop?",
    "Er det muligt at prøve tøjet på inden jeg køber det?",
    "Hvad sker der, når jeg har lavet en bestilling på et made to order produkt?",
    "Gør det en forskel at købe vintage frem for nyt?",
    "Hvordan vedligeholder jeg bedst det produkt, jeg har købt?",
    "Kan jeg sende et produkt retur?",
  ];

  const answers = [
    "Under Vintage kan du filtrere produkterne direkte ud fra dine egne kropsmål. På både Upcycled og Stitch_Stories kan du læse om de specifikke mål på produktet. Hvis du er i tvivl er du altdi velkomemn til at kontakte mig",
    "Ja! Du er altid velkommen til at kigge forbi mit lille studie i Ry, hvis du gerne vil prøve tøjet først",
    "Jeg kontakter dig og derfra snakker vi sammen om, hvad du ønsker ifht materialer og mål og derfra begynder min syproces. Leveringstiden afhænger af, hvor mange ordrer jeg har, men det vil jeg selvfølgelig holde dig opdateret på",
    "Ja! Tøjindustrien er verdens 3. mest forurenende industri, derfor er det vigtigt at vi respekterer det tøj, der allerede er produceret",
    "Kig vaskeanvisningen, der findes under punktet Materialer, når du har valgt det produkt, du er interesseret i eller læs nakkemærket, når du har modtaget produktet",
    "Ja, det kan du. Læs gerne punktet Betingelser, som du finder under Om. Her står alle rettigheder, forbehold og information om egenbetaling",
  ];

  return (
    <div>
      <div id='faqDiv'>
        <div id='faqTxt'>
          <h1 className='F100 laptop'>faq</h1>
          <div id='faqs'>
            {questions.map((question, index) => (
              <div key={index}>
                <div className='question' onClick={() => toggleAnswer(index)}>
                  <div className='faqCirkel'>{index + 1}</div>
                  <p>{question}</p>
                </div>

                <div className={`answer ${visibleAnswerIndex === index ? 'show' : ''}`}>
                  {visibleAnswerIndex === index && <p>{answers[index]}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <img src={faqImg} id='faqImg' alt='Mig og mit tøj' />
        <h1 className='mobil'>faq</h1>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FAQ;