import React from "react";
import EditCard from '../images/EditCard.svg'
import Vector from '../images/Vector.svg'
import {api} from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userdata, card]) => {
        setUserName(userdata.name)
        setUserDescription(userdata.about)
        setUserAvatar(userdata.avatar)
        setCards(card)
        })
      .catch(console.log)
  }, [userName, userDescription, userAvatar, cards])

  return (
    <>
      <main className="content">
        <section className="profile content__profile">
          <div className="profile__info">
            <div className="profile__wrapper">
              <img
                src={userAvatar}
                alt="твой аватар"
                className="profile__avatar"/>
              <div className="profile__edit-overlay">
                <img src={EditCard} className="profile__edit-img" alt="Изменить аватар" onClick={props.onEditAvatar}/>
              </div>
            </div>
            <div className="profile__input">
              <div className="profile__cover-text">
                <h1 className="profile__input-name">{userName}</h1>
                <button
                  type="button"
                  className="profile__button"
                  onClick={props.onEditProfile}>
                </button>
              </div>
              <p className="profile__input-occupation">{userDescription}</p>
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
          <Card {...card} key={card._id} onCardClick={props.onCardClick}/>
        ))
        }
      </section>
    </>
  );
}

export default Main;