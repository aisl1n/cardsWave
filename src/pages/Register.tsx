import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';
import React, { useState } from 'react';

// @ts-ignore
import { UserAuth } from '../context/AuthContext';
import CardWaveBanner from '../components/CardWaveBanner/CardWaveBanner';

const Register: React.FC = () => {
  const router = useIonRouter();
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser } = UserAuth();

  const register = async (event: any) => {
    console.log('Email: ' + registerEmail);
    console.log('Senha: ' + registerPassword);
    event.preventDefault();
    setError('');
    try {
      await createUser(registerEmail, registerPassword);
      router.goBack();
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleEmailChange = (event: CustomEvent) => {
    console.log('Email: ' + event.detail.value);
    setRegisterEmail(event.detail.value);
  };

  const handlePasswordChange = (event: CustomEvent) => {
    console.log('Senha: ' + event.detail.value);
    setRegisterPassword(event.detail.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot='start'>
            <IonBackButton text='Voltar' defaultHref='/' />
          </IonButtons>
          <CardWaveBanner />
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <h1 className='ion-text-lg'>Registrar</h1>
        <IonCard>
          <IonCardContent>
            <form onSubmit={register}>
              <IonInput
                fill='outline'
                labelPlacement='floating'
                label='Email'
                type='email'
                placeholder='admin@gmail.com'
                onIonInput={handleEmailChange}
              ></IonInput>
              <IonInput
                className='ion-margin-top'
                fill='outline'
                labelPlacement='floating'
                label='Senha'
                type='password'
                onIonInput={handlePasswordChange}
              ></IonInput>
              <IonButton
                className='ion-margin-top'
                type='submit'
                expand='block'
              >
                Criar minha conta
                <IonIcon icon={checkmarkOutline} slot='end' />
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
