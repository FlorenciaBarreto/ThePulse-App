import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

const RatingQuestion = ({ questionData }) => {
  // Establece los valores iniciales a partir de questionData
  const { number, question } = questionData;
  const minValue = Number(questionData.minValue) || 0;
  const maxValue = Number(questionData.maxValue) || 10;
  const [value, setValue] = useState((minValue + maxValue) / 2); // O el valor por defecto que necesites

  if (!questionData || typeof question !== 'string') {
    console.error('Invalid questionData', questionData);
    return <div>Invalid question data.</div>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Generar las marcas con los números del rango de min a max
  const marks = Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue).map(num => ({
      value: num,
      label: num.toString(),
  }));

  return (
    <div className="range-question">
      <label className="open-question-label">{`${number}.${question}`}</label>
      <div className="range-slider-container">
        <Slider
          step={1}
          marks={marks}
          min={minValue}
          max={maxValue}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
                    sx={{
                        width: 450,
                        color: '#7160D2',
                        '& .MuiSlider-thumb': {
                            height: 20,
                            width: 20,
                            backgroundColor: '#7160D2',
                            border: '2px solid currentColor',
                            '&:focus, &:hover, &.Mui-active': {
                                boxShadow: 'inherit',
                            },
                        },
                        '& .MuiSlider-track': {
                            height: 4,
                            borderRadius: 4,
                        },
                        '& .MuiSlider-rail': {
                            height: 4,
                            borderRadius: 4,
                        },
                        '& .MuiSlider-mark': {
                            backgroundColor: '#bfbfbf',
                            height: 0,
                            '&.MuiSlider-markActive': {
                                backgroundColor: 'currentColor',
                            },
                        },
                        '& .MuiSlider-markLabel': {
                            fontFamily: '"Poppins", sans-serif',
                            fontSize: '1.25rem',
                            color: 'black',
                            fontWeight: '600',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default RatingQuestion;
