import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import React from 'react';
import {
  addCircleOutline,
  homeOutline,
  personCircleOutline,
} from 'ionicons/icons';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

import HomePage from './pages/HomePage';
import FlashCardPage from './pages/FlashCardPage';
import ProfilePage from './pages/ProfilePage';

const Menu: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path='/menu' to='/home' />
          <Route path='/home' render={() => <HomePage />} exact={true} />
          <Route
            path='/flashcard'
            render={() => <FlashCardPage />}
            exact={true}
          />
          <Route path='/profile' render={() => <ProfilePage />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='flashcard' href='/flashcard'>
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Flash Card</IonLabel>
          </IonTabButton>
          <IonTabButton tab='profile' href='/profile'>
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Menu;
