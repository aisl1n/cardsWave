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
  useIonAlert,
  useIonRouter,
} from '@ionic/react';
import HeaderBanner from '../components/HeaderBanner/HeaderBanner';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Camera, CameraResultType } from '@capacitor/camera';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const FlashCardPage: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();
  const [cardTitle, setCardTitle] = useState('');
  const [cardSubTitle, setCardSubTitle] = useState('');
  const [cardMain, setCardMain] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const createCardWithImage = async () => {
    try {
      const cardData = {
        title: cardTitle,
        subtitle: cardSubTitle,
        main: cardMain,
        imageURL: imageUrl,
      };

      const cardsCollection = collection(db, 'cards');
      await addDoc(cardsCollection, cardData);

      router.push('/home', 'forward');
    } catch (error) {
      console.error('Erro ao criar o card:', error);
    }
  };

  const uploadImageAndGetURL = async () => {
    if (!imageUrl) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });

      const imageUrl = await uploadImageToStorage(image.webPath);
      presentAlert({
        header: 'Sucesso!',
        message: 'Sua imagem foi salva com sucesso!',
        buttons: ['OK'],
      });
      setImageUrl(imageUrl);
      return imageUrl;
    }
    return presentAlert({
      header: 'Alerta!',
      message: 'Imagem já enviada!',
      buttons: ['OK'],
    });
  };

  const uploadImageToStorage = async (webPath: any) => {
    const response = await fetch(webPath);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${Date.now()}.jpg`);
    await uploadBytes(storageRef, blob);

    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const handleInput = (event: CustomEvent, state: Function) => {
    state(event.detail.value);
  };

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

          <IonButton fill='clear' onClick={() => uploadImageAndGetURL()}>
            Foto
          </IonButton>
          <IonButton fill='clear'>Audio</IonButton>
        </IonCard>
        <IonButton onClick={createCardWithImage} expand='block'>
          Salvar
        </IonButton>
      </IonContent>
    </>
  );
};
export default FlashCardPage;
