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
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === 'true');
    };
    checkStorage();
  }, []);

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present('Logging in...');
    setTimeout(() => {
      dismiss();
      router.push('/app', 'root');
    }, 2000)
  };

  const finishIntro = async () => {
    console.log('FIN');
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: 'true' });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={'primary'}>
              <IonTitle>CardsWave </IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false}>
            <div className='ion-text-center ion-padding'>
              <img src={cardsWaveLogo} alt='logo' width={'70%'} />
            </div>
            <IonCard>
              <IonCardContent>
                <form onSubmit={doLogin}>
                  <IonInput
                    fill='outline'
                    labelPlacement='floating'
                    label='Email'
                    type='email'
                    placeholder='admin@gmail.com'
                  ></IonInput>
                  <IonInput
                    className='ion-margin-top'
                    fill='outline'
                    labelPlacement='floating'
                    label='Password'
                    type='password'
                  ></IonInput>
                  <IonButton
                    className='ion-margin-top'
                    type='submit'
                    expand='block'
                  >
                    Login
                    <IonIcon icon={logInOutline} slot='end' />
                  </IonButton>
                  <IonButton
                    routerLink='/register'
                    color={'tertiary'}
                    className='ion-margin-top'
                    type='submit'
                    expand='block'
                  >
                    Create account
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
