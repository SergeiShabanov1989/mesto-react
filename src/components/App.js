import React from "react";
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from'../components/PopupWithForm'
import ImagePopup from '../components/ImagePopup'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
    isOpen: false
  });
  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect(() => {
    api.getProfile()
      .then((userdata) => {
        setCurrentUser(userdata)
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
      })
      .catch(console.log)
    closeAllPopups()
  }

  function onUpdateAvatar(dataAvatarFromInput) {
    api.editAvatar(dataAvatarFromInput.avatar)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(console.log)
    closeAllPopups()
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <>
        <Header />
        <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlacePopupOpen} onEditAvatar={handleEditAvatarPopupOpen}/>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={onUpdateUser}/>
        <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} button="Сохранить" name="image" title="Новое место">
          <div className="popup__input-container">
            <input
              type="text"
              placeholder="Название"
              defaultValue=""
              minLength="2"
              maxLength="30"
              required
              name="popup__place"
              className="popup__text popup__text_type_place"/>
            <div className="popup__text-container">
              <span className="popup__text-error popup__place-error"></span>
            </div>
          </div>
          <div className="popup__input-container">
            <input
              type="url"
              placeholder="Ссылка на картинку"
              defaultValue=""
              required
              name="popup__url"
              className="popup__text popup__text_type_url"/>
            <div className="popup__text-container">
              <span className="popup__text-error popup__url-error"></span>
            </div>
          </div>
        </PopupWithForm>
        <PopupWithForm button="Да" name="delete" title="Вы уверены?"/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={onUpdateAvatar}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
