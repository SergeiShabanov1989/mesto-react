import React from "react";
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from'../components/PopupWithForm'
import ImagePopup from '../components/ImagePopup'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
    isOpen: false
  });
  const [currentUser, setCurrentUser] = React.useState({});

  function handleCardLike(likes, id) {
    const isLiked = likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === id ? newCard : c));
      })
      .catch(console.log)
  }

  function handleCardDelete(owner, id) {
    const isOwn = owner._id === currentUser._id;

    if (isOwn) {
      api.deleteCard(id)
        .then(() => {
          let arr = [];
          arr = cards.filter(function(card) {
            return card._id !== id;
          })
          setCards(arr)
        })
        .catch(console.log)
    }
  }

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userdata, card]) => {
        setCurrentUser(userdata)
        setCards(card)
        })
      .catch(console.log)
  }, [])

  function handleCardClick (dataFromCard) {
    setSelectedCard({
      name: dataFromCard.cardName,
      link: dataFromCard.cardLink,
      isOpen: true
    })
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(true)
  }
  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditProfilePopupOpen(false)
    setSelectedCard({
      name: '',
      link: '',
      isOpen: false
    })
  }

  function onUpdateUser(dataProfileFromInput) {
    api.editProfile(dataProfileFromInput.name, dataProfileFromInput.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function onUpdateAvatar(dataAvatarFromInput) {
    api.editAvatar(dataAvatarFromInput.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleAddPlaceSubmit(dataCardFromInput) {
    api.addCard(dataCardFromInput.name, dataCardFromInput.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlacePopupOpen}
          onEditAvatar={handleEditAvatarPopupOpen}/>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}/>
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}/>
        <PopupWithForm
          button="Да"
          name="delete"
          title="Вы уверены?"/>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
