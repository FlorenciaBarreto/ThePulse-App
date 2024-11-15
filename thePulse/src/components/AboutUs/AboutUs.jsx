import React from 'react';
import '../../assets/styles/AboutUs.css';

import AboutUs0 from './AboutUs_0';
import AboutUs1 from './AboutUs_1';
import AboutUs2 from './AboutUs_2';
import StartLando from './StartLando';
import Footer from '../Footer';
import WhiteSpace from '../Whitespace';

const AboutUs = () => {
  return (
    <div className="home-container">
      
      <AboutUs0 />
   
      <AboutUs1 />
      <WhiteSpace size="large" />
      <AboutUs2 />

      <StartLando />
  
      <Footer />
    </div>
    
  );
};

export default AboutUs;
