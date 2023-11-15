import { IonButton, IonIcon, useIonRouter } from '@ionic/react';
import React from 'react';
// @ts-ignore
import { UserAuth } from '../../context/AuthContext';
import { logOutOutline } from 'ionicons/icons';

const LogoutButton: React.FC = () => {
  const { logout } = UserAuth();
  const router = useIonRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/', 'forward');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <IonButton
        slot='end'
        onClick={handleLogout}
        color={'danger'}
        className='ion-margin'
        size='small'
      >
        <IonIcon icon={logOutOutline} slot='end' />
      </IonButton>
    </>
  );
};

export default LogoutButton;
