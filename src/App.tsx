import { Route } from 'react-router-dom';
import './App.css';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Register from './pages/Register';
import 'swiper/swiper-bundle.min.css';
import Menu from './Menu';

// @ts-ignore
import { AuthContextProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthContextProvider>
          <Route path='/'>
            <Login />
          </Route>
          <Route component={Register} path='/register' exact />
          <ProtectedRoute>
            <Route component={Menu} path='/menu' exact />
          </ProtectedRoute>
        </AuthContextProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
