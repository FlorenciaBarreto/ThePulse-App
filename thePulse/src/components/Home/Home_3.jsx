import React from 'react';
import '../../assets/styles/Home.css';
import WhiteSpace from '../Whitespace';


import HowItWork from '../../assets/images/homepage_1.png';
import HowWeDo from '../../assets/images/homepage_2.svg';
import Logo from '../../assets/images/logo.svg';



const HowItWorks = () => {
  return (
    <div id="funcion" className="resolvemos-container">
        <h2>¿Cómo funciona?</h2>
        <img src={HowItWork}  className="homepage_1" alt="HomePage"></img>
    </div>
  );
};

const HowWeDoIt = () => {
    return (
    <div className="how-we-do-it">
        <div className="how-we-do-it-container">
            <img src={HowWeDo}  className="homepage_2" alt="HomePage"></img>
        </div>
        <div className="background-logo">
            <img src={Logo}  className="logo" alt="HomePage"></img>
        </div>
    </div>

    );
  };

const MainComponent = () => {
   return (
        <div className="main-component">
        <HowItWorks />
        <WhiteSpace size="medium" />
        <HowWeDoIt />
        </div>
    );
};
  
export default MainComponent;
  