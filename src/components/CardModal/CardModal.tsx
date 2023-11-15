import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import React from 'react';
import './CardModal.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

interface ModalProps {
  isOpen: boolean;
  color: string;
  onClose: () => void;
  id: string;
  title: string;
  subtitle: string;
  main: string;
}

const CardModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  id,
  color,
  title,
  subtitle,
  main,
}) => {
  const router = useIonRouter();

  const wrapText = (text: string) => {
    const paragraphs = text.split('\n').map((paragraph) => {
      const parts = paragraph.split('-').join('\n-');
      return parts;
    });
    return paragraphs.map((paragraph, index) => {
      return <p key={index}>{paragraph}</p>;
    });
  };

  const deleteCard = async (id: any) => {
    const cardDoc = doc(db, 'cards', id);
    await deleteDoc(cardDoc);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>{subtitle}</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={onClose}>Fechar</IonButton>
          </IonButtons>
          <IonButtons slot='start'>
            <IonButton onClick={() => deleteCard(id)}>Excluir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonCard color={color} key={id} className='cardModal'>
          <IonCardHeader>
            <IonCardTitle className='cardModalTitle ion-align-self-center'>
              {title}
            </IonCardTitle>
            <IonCardSubtitle className='cardModalSubtitle'>
              {subtitle}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div className='cardModalMain'>
              <IonText>
                {wrapText(main)}
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default CardModal;
