import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from '@ionic/react';

import { eyeOutline, logInOutline, personCircleOutline } from 'ionicons/icons';
import cardsWaveLogo from '../assets/cardsWaveLogo.svg';
import React, { useEffect, useState } from 'react';
import Intro from '../components/Intro/Intro';
import { Preferences } from '@capacitor/preferences';

// @ts-ignore
import { UserAuth } from '../context/AuthContext';
import CardWaveBanner from '../components/CardWaveBanner/CardWaveBanner';

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
  const { signIn } = UserAuth();
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === 'true');
    };
    checkStorage();
  }, []);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    await present('Logging in...');
    try {
      await signIn(loginEmail, loginPassword);
      dismiss();
      setLoginEmail('');
      setLoginPassword('');
      router.push('/menu', 'root');
    } catch (e: any) {
      dismiss();
      console.log(e.message);
    }
  };

  const finishIntro = async () => {
    console.log('finish the intro');
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: 'true' });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  const handleEmailChange = (event: CustomEvent) => {
    console.log('Email: ' + event.detail.value);
    setLoginEmail(event.detail.value);
  };

  const handlePasswordChange = (event: CustomEvent) => {
    console.log('Senha: ' + event.detail.value);
    setLoginPassword(event.detail.value);
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : ( 
        <IonPage>
          <IonHeader>
            <IonToolbar color={'primary'}>
              <CardWaveBanner />
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false}>
            <h1 className='ion-text-lg'>
              Login
            </h1>
            <IonCard>
              <IonCardContent>
                <form onSubmit={handleLogin}>
                  <IonInput
                    fill='outline'
                    labelPlacement='floating'
                    label='Email'
                    type='email'
                    placeholder='admin@gmail.com'
                    value={loginEmail}
                    onIonInput={handleEmailChange}
                  ></IonInput>
                  <IonInput
                    className='ion-margin-top'
                    fill='outline'
                    labelPlacement='floating'
                    label='Senha'
                    type='password'
                    value={loginPassword}
                    onIonInput={handlePasswordChange}
                  ></IonInput>
                  <IonButton
                    className='ion-margin-top'
                    type='submit'
                    expand='block'
                  >
                    Entrar
                    <IonIcon icon={logInOutline} slot='end' />
                  </IonButton>
                  <IonButton
                    routerLink='/register'
                    color={'tertiary'}
                    className='ion-margin-top'
                    expand='block'
                  >
                    Criar conta
                    <IonIcon icon={personCircleOutline} slot='end' />
                  </IonButton>
                  <IonButton
                    onClick={seeIntroAgain}
                    fill='clear'
                    size='small'
                    color={'medium'}
                    type='button'
                    expand='block'
                    className='ion-margin-top'
                  >
                    Ver a introdução novamente
                    <IonIcon icon={eyeOutline} slot='end' />
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
