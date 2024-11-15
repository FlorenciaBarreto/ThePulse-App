 import '../../../assets/styles/Survey.css';


// const ClosedQuestion = ({ questionData }) => {
//   if (!questionData || !questionData.question || !Array.isArray(questionData.question.options)) {
//     console.error('Invalid questionData', questionData);
//     return <div>Invalid question data.</div>;
//   }

//   const { question, options } = questionData.question;

//   return (
//     <div className="single-choice-question">
//       <label className="question-label">{question}</label>
//       {options.map((option, index) => (
//         <div key={index} className="option-container">
//           <input 
//             type="radio" 
//             id={option} 
//             name="question" 
//             value={option} 
//             className="radio-input" 
//           />
//           <label htmlFor={option} className="radio-label">{option}</label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ClosedQuestion;

const ClosedQuestion = ({ questionData }) => {
  if (!questionData || typeof questionData.question !== 'string' || !Array.isArray(questionData.options)) {
    console.error('Invalid questionData', questionData);
    return <div>Invalid question data.</div>;
  }

  const { question, options, number } = questionData;

  return (
    <div className="single-choice-question">
      <label className="question-label">{`${number}. ${question}`}</label>
      {options.map((option, index) => (
        <div key={`${number}-${index}`} className="option-container">
          <input 
            type="radio" 
            id={`${number}-${option}`} 
            name={`question-${number}`}
            value={option}
            className="radio-input" 
          />
          <label htmlFor={`${number}-${option}`} className="radio-label">{option}</label>
        </div>
      ))}
    </div>
  );
};
export default ClosedQuestion;