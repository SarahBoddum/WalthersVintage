import React, { useState } from 'react';
import faqImg from '../assets/Images/normal.svg';
import aform from '../assets/Images/aform.svg';
import box from '../assets/Images/box.svg';
import gulerod from '../assets/Images/gulerod.svg';
import herrebuks from '../assets/Images/herrebuks.svg';
import ligeben from '../assets/Images/ligeben.svg';
import loosefit from '../assets/Images/loosefit.svg';
import normal from '../assets/Images/normal.svg';
import normalovertoj from '../assets/Images/normalovertøj.svg';
import oversize from '../assets/Images/oversize.svg'; // Sørg for at importere korrekt

export const Fit = () => {
    const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null); // Holder styr på hvilket spørgsmål der er åbent
    const [currentImage, setCurrentImage] = useState(faqImg); // Holder styr på hvilket billede der vises

    const toggleAnswer = (index, image) => {
        // Hvis det samme spørgsmål klikkes igen, lukkes det. Ellers åbnes det.
        setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
        // Ændrer billedet, når et spørgsmål åbnes
        setCurrentImage(image);
    };

    const images = [
        normal,
        normalovertoj,
        box,
        loosefit,
        oversize,
        aform,
        herrebuks,
        ligeben,
        gulerod,
    ];

    const questions = [
        "STANDARD",
        "STANDARD - OVERTØJ",
        "BOX",
        "LOOSE FIT",
        "OVERSIZE",
        "A-FORM",
        "BUKS - HERREBUKS",
        "BUKS - LIGE BEN",
        "BUKS - GULEROD",
    ];

    const answers = [
        "Et standard fit er med 4 cm rørlig vidde ved bryst, 1 cm ved talje og 3 cm ved hofte. Det betyder at tøjet føjger din krops kurver naturligt, men stadig giver en god åndefrihed, når du har det på",
        "Et standard fit for overtøj er med 15 cm rørlig vidde ved bryst, 11,5 cm ved talje og 10 cm ved hofte. Det kan lyde af meget, men det er helt normalt, og giver plads til, at du kan have almindeligt tøj på indenunder.",
        "Box fit betyder at tøjet har en for størrelsen almindelig skulderbredde, men at der fx ikke er taljering i",
        "Loose fit er et mellemsted mellem oversize og standard fit. Der er lidt ekstra rørlig vidde, men ikke nok til, at det bliver rigtigt oversizet",
        "Oversize er når alle mål er foskubbet lidt - det er særligt skulderbredden på jakker, der bestemmer om et produkt er oversize eller loose fit. Hvis skuldrene er placeret længere ude end dine skuldre er naturligt, falder en jakke eller en skjorte på en anden måde på din krop og det er ofte det, der giver opfattelsen af 'oversize'",
        "A-form er en klassisk 60'er form, hvor kjolen, skjorten eller jakken sidder til omkring skuldre og bryst og derfra går skråt ud, så hvis produktet lå på gulvet ville silhuetten nærmest forme et A",
        "En klassisk herrebuks er hvor buksebenene går forholdsvist lige ned - evt med en lille indsnævring ved anklerne. De sidder til ved talje og hofte og har oftest skrå forlommer. HERREBUKS LOOSE FIT er hvis der fx er læg ved hoften, der giver ekstra vidde til hofte og numse.",
        "Lige ben er hvor buksebenene går lige ned fra lårene - det betyder at din forvidde vil blive lidt løsere, da de ikke følger dine bens naturlige indsnævring",
        "Gulerodsfittet er som formen på en gulerod - hvor bukserne er kurvede omkring hofterne, men kurver ind mod fodvidden, hvor de bliver strammere",
    ];

    return (
        <div>
            <div id='faqDivFit'>
                <div id='faqTxt'>
                    <div id='faqs'>
                        {questions.map((question, index) => (
                            <div key={index}>
                                <div className='questionFit' onClick={() => toggleAnswer(index, images[index])}>
                                    <div className='faqCirkelFit'>{index + 1}</div>
                                    <h2 className='betingleseh2'>{question}</h2>
                                </div>

                                <div className={`answer ${visibleAnswerIndex === index ? 'show' : ''}`}>
                                    {visibleAnswerIndex === index && <p>{answers[index]}</p>}
                                    <img src={currentImage} className='faqImgFit mobil' alt='Billede der relaterer til spørgsmål' loading="lazy"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id='fitImgDiv'>
                    <img src={currentImage} className='faqImgFit laptop' alt='Billede der relaterer til spørgsmål' loading="lazy"/>
                </div>
            </div>
        </div>
    );
};

export default Fit;
