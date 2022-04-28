import React from "react";
import '../index.css';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from'../components/PopupWithForm'
import ImagePopup from '../components/ImagePopup'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
    isOpen: false
  });

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

  return (
    <>
      <Header />
      <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlacePopupOpen} onEditAvatar={handleEditAvatarPopupOpen}/>
      <Footer />
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="edit" title="Редактировать профиль" children={
        <>
          <div className="popup__input-container">
            <input
              type="text"
              defaultValue=""
              minLength="2"
              maxLength="40"
              required
              placeholder="Имя"
              name="popup__name"
              className="popup__text popup__text_type_name"/>
            <div className="popup__text-container">
              <span className="popup__text-error popup__name-error"></span>
            </div>
          </div>
          <div className="popup__input-container">
            <input
              type="text"
              defaultValue=""
              minLength="2"
              maxLength="200"
              required
              placeholder="Род деятельности"
              name="popup__occupation"
              className="popup__text popup__text_type_occupation"/>
            <div className="popup__text-container">
              <span className="popup__text-error popup__occupation-error"></span>
            </div>
          </div>
          <button className="popup__button" type="submit">
            Сохранить
          </button>
        </>}
      />
      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="image" title="Новое место" children={
        <>
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
          <button className="popup__button" type="submit">
            Сохранить
          </button>
        </>}
      />
      <PopupWithForm name="delete" title="Вы уверены?" children={
        <>
          <button className="popup__button" type="submit">
            Да
          </button>
        </>}
      />
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="avatar" title="Обновить аватар" children={
        <>
          <div className="popup__input-container">
            <input
              type="url"
              placeholder="Ссылка на аватар"
              defaultValue=""
              required
              name="popup__url"
              className="popup__text popup__text_type_url"/>
            <div className="popup__text-container">
              <span className="popup__text-error popup__url-error"></span>
            </div>
          </div>
          <button className="popup__button" type="submit">
            Сохранить
          </button>
        </>}
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
    </>
  );
}

export default App;
