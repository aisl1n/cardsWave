import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import cardsWave from '../../assets/cardsWave.svg';
import cardsWaveLogo from '../../assets/cardsWaveLogo.svg';
import './CardWaveBanner.css';

const CardWaveBanner: React.FC = () => {

  return (
   <>
   <div className='card-wave-banner'>
      <div className='card-wave-title'>
        <img src={cardsWave} alt='logo' />
      </div>
      <div className='card-wave-logo'>
        <img src={cardsWaveLogo} alt='logo' />
      </div>
    </div>
   </>
  );
};

export default CardWaveBanner;