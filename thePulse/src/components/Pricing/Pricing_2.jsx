import React, { useState } from 'react';
import FaQImage from '../../assets/images/Pricing_0.svg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: '¿How does this work?',
      answer: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    },
    {
      question: '¿What are the benefits?',
      answer: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto.',
    },
    {
      question: '¿Is it difficult to use?',
      answer: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto.',
    },
    {
      question: '¿Can I have custom pricing?',
      answer: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto.',
    },
    {
      question: '¿Is there trial version available?',
      answer: 'Al contrario del pensamiento popular, Lorem Ipsum no es simplemente un texto aleatorio.',
    },
  ];

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <img src={FaQImage} alt="FAQ" />
      <h2>Frequently Asked Questions</h2>
      <div className="questions">
        {questions.map((q, index) => (
          <div key={index} className="question">
            <div className="question-box" onClick={() => toggleQuestion(index)}>

              <div className="question-title" onClick={() => toggleQuestion(index)}>
                {q.question}
              </div>
              <div className="icon-wrapper">
                <FontAwesomeIcon onClick={() => toggleQuestion(index)} icon={activeIndex === index ? faChevronUp : faChevronDown} />
              </div>
            </div>
            <div className={`answer ${activeIndex === index ? 'active' : ''}`}>
              {activeIndex === index && q.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
