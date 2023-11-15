import React from 'react';
import { IonContent, IonHeader, IonToolbar } from '@ionic/react';
import HeaderBanner from '../components/HeaderBanner/HeaderBanner';
import LogoutButton from '../components/LogoutButton/LogoutButton';

const ProfilePage = () => (
  <>
    <IonHeader>
      <IonToolbar color={'primary'}>
        <HeaderBanner />
        <LogoutButton />
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        Library content
      </div>
    </IonContent>
  </>
);

export default ProfilePage;
