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
import { checkmarkOutline, logInOutline, personCircleOutline } from 'ionicons/icons';
import cardsWaveLogo from '../assets/cardsWaveLogo.svg';
import React from 'react';

const Register: React.FC = () => {
  const router = useIonRouter();

  const doRegister = (event: any) => {
    event.preventDefault();
    console.log('doRegister');
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
            </IonButtons>
          <IonTitle>Create account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <div className='ion-text-center ion-padding'>
          <img src={cardsWaveLogo} alt='logo' width={'70%'} />
        </div>
        <IonCard>
          <IonCardContent>
            <form onSubmit={doRegister}>
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
