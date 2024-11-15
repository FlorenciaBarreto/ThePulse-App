import React from 'react';
import '../../assets/styles/Pricing.css';
import WhiteSpace from '../Whitespace';
import Footer from '../Footer';
import StartLando from '../AboutUs/StartLando';
import Pricing0 from '../Pricing/Pricing_0';

import Pricing1 from '../Pricing/Pricing_1';
import Pricing2 from '../Pricing/Pricing_2';



const Pricing = () => {
  return (
    <div className="home-container">
      <Pricing0/>
      <Pricing1/>
      <Pricing2/>
      <WhiteSpace size="large" />
      <StartLando/>
      <WhiteSpace size="medium" />
      <Footer/>

      

    </div>
    
  );
};

export default Pricing;