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
    "Hvorfor vælge genbrug?",
    "Kan jeg få broderier på mine egne styles",
    "Kan jeg sende et produkt retur?",
  ];

  const answers = [
    "Under Vintage kan du filtrere produkterne direkte ud fra dine egne kropsmål. På både Upcycled og Stitch_Stories kan du læse om de specifikke mål på produktet. Hvis du er i tvivl er du altdi velkomemn til at kontakte mig",
    "Ja! Du er altid velkommen til at kigge forbi mit lille studie i Ry, hvis du gerne vil prøve tøjet først",
    "Jeg kontakter dig og derfra snakker vi sammen om, hvad du ønsker ifht materialer og mål og derfra begynder min syproces. Leveringstiden afhænger af, hvor mange ordrer jeg har, men det vil jeg selvfølgelig holde dig opdateret på",
    "Danskernes tøjforbrug er 35 % højere end gennemsnittet af resten af jordens befolknings tøjforbrug. På baggrund af data fra perioden 2018-2020 viser en undersøgelse fra Forbrugerrådet Tænk, at cirka 677 tons nyt tøj hvert år bliver smidt ud i Danmark. Det er vi NØDT TIL at få stoppet eller i hvert fald at få nedbragt betydeligt. Ellers har vi ikke en jordklode at give videre til vores fremtidige generationer. Vi kan kun sammen ændre på modebranchens overproduktion, ved at sænke vores forbrug og efterspørgsel. Når efterspørgslen falder, falder udbuddet også. Så det er i høj grad jer forbrugere, og kunder der sætter dagsordenen. Ændringen starter hos jer. Walthers Vintage, vil gerne gøre det attraktivt at vælge mere bæredygtigt, uden at skulle gå på kompromis med kvalitet eller aktuelle trends og farver.",
    "Ja det kan du. Jeg laver små personlige broderier på dit eget tøj. Har du en slidt skjorte, en gammel jakke eller et par jeans, der enten har huller eller bare er blevet lidt kedelig, så reparere jeg med de fineste små håndbroderier. Det er nemlig også bæredygtigt, at reparere på dit tøj i stedet for at smide det ud og købe nyt. Vi tager en snak om hvad du kunne tænke dig og hvad der kan lade sig gøre, og så omsætter jeg det til små broderede motiver der fortæller en lille historie om hvem DU er. Prisen starter på 350 kr. for et broderi og du får typisk 5-7 små broderier for 800 kr.",
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
        <h1 className='faqDivH1 mobil'>faq</h1>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FAQ;