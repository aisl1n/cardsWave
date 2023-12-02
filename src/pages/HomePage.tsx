import { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonToolbar,
} from '@ionic/react';
import HeaderBanner from '../components/HeaderBanner/HeaderBanner';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Card from '../components/Card/Card';
import CardModal from '../components/CardModal/CardModal';

const HomePage = () => {
  const [cardsList, setCardsList] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    id: '',
    color: '',
    title: '',
    subtitle: '',
    main: '',
    imageURL: '',
  });

  const cardsCollectionRef = collection(db, 'cards');
  const getCardsList = async () => {
    try {
      const data = await getDocs(cardsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCardsList(filteredData as any);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCardsList();
  }, [modalState]);

  const openModal = (
    id: string,
    color: string,
    title: string,
    subtitle: string,
    main: string,
    imageURL: string
  ) => {
    setModalState({ isOpen: true, color, id, title, subtitle, main, imageURL });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      id: '',
      color: '',
      title: '',
      subtitle: '',
      main: '',
      imageURL: '',
    });
  };

  const selectCardColor = (index: number) => {
    const cardColors: { [key: string]: string } = {
      secondary: 'secondary',
      tertiary: 'tertiary',
      success: 'success',
    };
    const colorKeys = Object.keys(cardColors);
    const colorIndex = index % colorKeys.length;
    const color = cardColors[colorKeys[colorIndex]];
    return color;
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <HeaderBanner />
          <LogoutButton />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <IonList lines='none'style={{ marginBottom: '20rem' }}>
          {cardsList.map((card: any, index: number) => {
            const color = selectCardColor(index);
            return (
              <Card
                key={card.id}
                id={card.id}
                color={color}
                title={card.title}
                subtitle={card.subtitle}
                onCardClick={(id: string) =>
                  openModal(
                    id,
                    color,
                    card.title,
                    card.subtitle,
                    card.main,
                    card.imageURL
                  )
                }
              />
            );
          })}
        </IonList>
      </IonContent>
      <CardModal
        isOpen={modalState.isOpen}
        color={modalState.color}
        onClose={closeModal}
        id={modalState.id}
        title={modalState.title}
        subtitle={modalState.subtitle}
        main={modalState.main}
        imageURL={modalState.imageURL}
      />
    </>
  );
};
export default HomePage;
