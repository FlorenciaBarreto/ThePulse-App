import React from 'react';
import '../../assets/styles/Home.css';
import HOME_0 from './Home_0';
import HOME_1 from './Home_1';
import HOME_2 from './Home_2';
import WhiteSpace from '../Whitespace';
import HOME_3 from './Home_3';
import HOME_4 from './Home_4';
import Footer from '../Footer';

const Home = () => {
  return (
    <div className="home-container">
      <HOME_0 />
      <WhiteSpace size="large" />
      <HOME_1 />
      <HOME_2/>
      <WhiteSpace size="large" />
      <HOME_3 />
      <WhiteSpace size="medium" />
      <HOME_4 />
      <WhiteSpace size="medium" />
      <Footer/>
    </div>
    
  );
};

export default Home;
