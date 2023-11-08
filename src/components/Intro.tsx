import { IonButton, IonText } from '@ionic/react';
import './Intro.css';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import cardIntro from '../assets/cardIntro.svg';
import cellIntro from '../assets/cellIntro.svg';
import coffeeIntro from '../assets/coffeeIntro.svg';

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src={cardIntro} alt='intro 1' />
        <IonText>
          <h3>
            Faça diversos FlashCards com o <b>CardsWave!</b>
          </h3>
        </IonText>
        <SwiperButtonNext>Próximo</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <img src={cellIntro} alt='intro 2' />
        <IonText>
          <h3>
            Salve diretamente no seu <b>Smartphone!</b>
          </h3>
        </IonText>
        <SwiperButtonNext>Próximo</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <img src={coffeeIntro} alt='intro 3' />
        <IonText>
          <h3>
            Aproveite o <b>CardsWave!</b>
          </h3>
        </IonText>
        <IonButton onClick={() => onFinish()}>Finalizar</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;
