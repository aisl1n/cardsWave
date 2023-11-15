import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import './Card.css';
import { chevronForwardOutline } from 'ionicons/icons';

interface CardProps {
  id: string;
  color: string;
  title: string;
  subtitle: string;
  onCardClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, color, title, subtitle, onCardClick }) => {
  return (
    <IonCard color={color} onClick={() => onCardClick(id)}>
      <IonCardHeader>
        <IonCardTitle className='cardTitle'>
          <p>{title}</p>
          <IonIcon icon={chevronForwardOutline} color={'light'} />
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default Card;
