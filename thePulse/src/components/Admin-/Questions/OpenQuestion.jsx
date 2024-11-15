import React, { useState, useEffect } from 'react';
import useSpeechToText from '../../../hooks/useSpeechToText'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/styles/Survey.css';

const OpenQuestion = ({ questionData}) => {
  const [value, setValue] = useState('');
  const [isManualEdit, setIsManualEdit] = useState(false);
  const { transcript, startListening, stopListening, isListening } = useSpeechToText();

  useEffect(() => {
    if (!isManualEdit && transcript) {
      setValue(transcript);
    }
  }, [transcript, isManualEdit]);

  const handleChange = (e) => {
    setIsManualEdit(true);
    setValue(e.target.value);
  };

  const handleStartListening = () => {
    setIsManualEdit(false);
    startListening();
  };

  return (
    <div className='open-question-container'>
      <label className="open-question-label">{questionData.number}. {questionData.question}</label>
      <textarea
        className="open-question-textarea"
        value={value}
        onChange={handleChange}
        placeholder="Your answer"
      />
      <div className="open-question-buttons">
        <button type="button" onClick={handleStartListening} className="open-question-mic-button">
          <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
        </button>
        <button type="button" onClick={stopListening} className="open-question-mic-button">
          <FontAwesomeIcon icon={faMicrophoneSlash} />
        </button>
      </div>
    </div>
  );
};

export default OpenQuestion;


// const OpenQuestion = ({ questionData }) => {
//   const [value, setValue] = useState('');
//   const [isManualEdit, setIsManualEdit] = useState(false);
//   const { transcript, startListening, stopListening, isListening } = useSpeechToText();

//   useEffect(() => {
//     if (!isManualEdit && transcript) {
//       setValue(transcript);
//     }
//   }, [transcript, isManualEdit]);

//   const handleChange = (e) => {
//     setIsManualEdit(true);
//     setValue(e.target.value);
//   };

//   const handleStartListening = () => {
//     setIsManualEdit(false);
//     startListening();
//   };

//   return (
//     <div className='open-question-container'>
//       <label className="open-question-label">{`${questionData.number}. ${questionData.question}`}</label>
//       <textarea
//         className="open-question-textarea"
//         value={value}
//         onChange={handleChange}
//         placeholder="Tu respuesta"
//       />
//       <button type="button" onClick={isListening ? stopListening : handleStartListening}>
//         <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
//       </button>
//     </div>
//   );
// };
// export default OpenQuestion;