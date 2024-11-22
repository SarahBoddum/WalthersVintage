import React, { useState } from 'react';
import faqImg from '../assets/Images/FAQwv.jpg';

export const FAQ = () => {
  const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null); // Holder styr på hvilket spørgsmål der er åbent

  const toggleAnswer = (index) => {
    // Hvis det samme spørgsmål klikkes igen, lukkes det. Ellers åbnes det.
    setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
  };

  const questions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  ];

  const answers = [
    "Answer for question 1",
    "Answer for question 2",
    "Answer for question 3",
    "Answer for question 4",
    "Answer for question 5",
    "Answer for question 6",
  ];

  return (
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
  );
};

export default FAQ;