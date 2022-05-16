import {useContext, useState, useEffect} from "react";
import EditCard from '../images/EditCard.svg'
import Vector from '../images/Vector.svg'
import {api} from "../utils/api";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  // const [userName, setUserName] = React.useState('');
  // const [userDescription, setUserDescription] = React.useState('');
  // const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = useState([]);
  const { currentUser } = useContext(CurrentUserContext)

  // React.useEffect(() => {
  //   Promise.all([api.getProfile(), api.getInitialCards()])
  //     .then(([userdata, card]) => {
  //       setUserName(userdata.name)
  //       setUserDescription(userdata.about)
  //       setUserAvatar(userdata.avatar)
  //       setCards(card)
  //       })
  //     .catch(console.log)
  // }, [])

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

  useEffect(() => {
    api.getInitialCards()
      .then((card) => {
        setCards(card)
      })
      .catch(console.log)
  }, [])

  return (
    <>
      <main className="content">
        <section className="profile content__profile">
          <div className="profile__info">
            <div className="profile__wrapper">
              <img
                src={currentUser.avatar}
                alt="твой аватар"
                className="profile__avatar"/>
              <div className="profile__edit-overlay">
                <img src={EditCard} className="profile__edit-img" alt="Изменить аватар" onClick={props.onEditAvatar}/>
              </div>
            </div>
            <div className="profile__input">
              <div className="profile__cover-text">
                <h1 className="profile__input-name">{currentUser.name}</h1>
                <button
                  type="button"
                  className="profile__button"
                  onClick={props.onEditProfile}>
                </button>
              </div>
              <p className="profile__input-occupation">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}>
            <img
              className="profile__add-button-img"
              src={Vector}
              alt="кнопка добавить изоражение"/>
          </button>
        </section>
        <section className="elements content__elements">
        </section>
      </main>
      <section className="elements content__elements">
        {
        cards.map((card) => (
          <Card {...card} key={card._id} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
        ))
        }
      </section>
    </>
  );
}

export default Main;