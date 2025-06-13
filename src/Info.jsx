export const Info = ({
  image,
  classGreenText,
  title,
  description,
  clickCloseCart,
}) => {
  return (
    <>
      <img width={70} src={image} alt="" />
      <h2 className={classGreenText}>{title}</h2>
      <p>{description}</p>
      <button className="greenButton" onClick={clickCloseCart}>
        Вернуться назад
        <img src="/img/arrow.svg" alt="" />
      </button>
    </>
  );
};
