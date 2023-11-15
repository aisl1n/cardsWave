import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonTextarea,
  IonToolbar,
} from '@ionic/react';
import HeaderBanner from '../components/HeaderBanner/HeaderBanner';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const FlashCardPage: React.FC = () => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardSubTitle, setCardSubTitle] = useState('');
  const [cardMain, setCardMain] = useState('');

  const cardCollection = collection(db, 'cards');

  const handleInput = (event: CustomEvent, state: Function) => {
    state(event.detail.value);
    console.log('titulo: '+cardTitle);
    console.log('subtitulo: '+cardSubTitle);
    console.log('texto: '+cardMain);
  };

  const onSubmitCard = async () => {
    try {
      await addDoc(cardCollection, {
      title: cardTitle,
      subtitle: cardSubTitle,
      main: cardMain,
    });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <HeaderBanner />
          <LogoutButton />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonInput
                type='text'
                placeholder='Tema/Título'
                onIonInput={(event: CustomEvent) => {
                  handleInput(event, setCardTitle);
                }}
              ></IonInput>
            </IonCardTitle>
            <IonCardSubtitle>
              <IonInput
                type='text'
                placeholder='#Subtema'
                onIonInput={(event: CustomEvent) => {
                  handleInput(event, setCardSubTitle);
                }}
              ></IonInput>
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonTextarea
              placeholder='Descreva através tópicos ou até mesmo através de perguntas e respostas!'
              autoGrow={true}
              onIonInput={(event: CustomEvent) => {
                handleInput(event, setCardMain);
              }}
            ></IonTextarea>
          </IonCardContent>

          <IonButton fill='clear'>Foto</IonButton>
          <IonButton fill='clear'>Audio</IonButton>
        </IonCard>
        <IonButton onClick={onSubmitCard} expand='block'>Salvar</IonButton>
      </IonContent>
    </>
  );
};
export default FlashCardPage;
