function Card({link, name, likes, onCardClick}) {

  function handleClick() {
    const cardData = {
      cardName: name,
      cardLink: link
    }
    onCardClick(cardData)
  }

  return (
    <div className="elements__element">
      <img onClick={handleClick} src={link} className="elements__image"/>
      <button
        className="elements__trash"
        type="button">
      </button>
      <div className="elements__discription">
        <h2 className="elements__text">{name}</h2>
        <div className="elements__discription-wrapper">
          <button
            className="elements__heart"
            type="button">
          </button>
          <span className="elements__heart-count">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;