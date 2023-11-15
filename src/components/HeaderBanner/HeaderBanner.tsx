import React from 'react';
import titleLogo from '../../assets/titleLogo.svg';
import cardsWaveLogo from '../../assets/cardsWaveLogo.svg';
import './HeaderBanner.css';

const HeaderBanner: React.FC = () => {
  return (
    <div className='banner'>
      <div className='title'>
        <img src={titleLogo} alt='logo' />
      </div>
      <div className='logo'>
        <img src={cardsWaveLogo} alt='logo' />
      </div>
    </div>
  );
};

export default HeaderBanner;
