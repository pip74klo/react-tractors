import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SingleTractor = ({ id }) => {
  const { items, idSingleProduct, setIdSingleProduct } = useContext(AppContext);

  const [singleProduct, setSingleProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedId = id || localStorage.getItem("id");

    if (storedId) {
      setIdSingleProduct(storedId);
    }
  }, [id]);

  useEffect(() => {
    const data = items.filter((item) => item.id === idSingleProduct);
    if (data.length) {
      setSingleProduct(...data);
      setIsLoading(false);
    }
  }, [idSingleProduct, items]);

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-center align-center"
          style={{ height: "200px" }}
        >
          <p>Загрузка товара...</p>
        </div>
      ) : (
        singleProduct && !isLoading && <View data={singleProduct} />
      )}
    </>
  );
};

export default SingleTractor;

const View = ({ data }) => {
  const {
    isItemAdded,
    isFavoritesAdded,
    addToCartItem,
    removeItemToCart,
    cartItems,
    addToFavoriteItem,
    removeItemToFavorites,
    favorites,
  } = useContext(AppContext);

  const specification = [
    { dimensions: "Габаритные размеры, мм" },
    { fuelTank: "Объем топливного бака, л" },
    { frontWheelSize: "Размер передних колес" },
    { rearWheelSize: "Размер задних колес" },
    { wheelFormula: "Колесная формула" },
  ];

  const onClickAdd = () => {
    const { id, name, price, imageUrl } = data;
    const obj = { customId: id, name, price, imageUrl };
    const findItem = cartItems.find((item) => item.customId === id);

    if (findItem) {
      removeItemToCart(findItem.id);
    } else {
      addToCartItem(obj);
    }
  };

  const onClickFavorite = () => {
    const { id, name, price, imageUrl } = data;
    const obj = { customId: id, name, price, imageUrl };
    const findItem = favorites.find((item) => item.customId === id);

    if (findItem) {
      removeItemToFavorites(findItem.id);
    } else {
      addToFavoriteItem(obj);
    }
  };

  const renderSpecification = () => {
    return (
      <div className="detailSpecification">
        {specification.map((item, i) => {
          const key = Object.keys(item);
          return (
            <div key={i} className="detailSpecificationRow d-flex">
              <div className="detailSpecificationKey">{item[key]}</div>
              <div className="detailSpecificationValue">{data[key]}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="detailBlock">
        <div className="detailBlockTop">
          <div className="detailImg">
            <img width={200} height={180} src={data.imageUrl} alt="Tractor" />
            <h3>{data.name}</h3>
          </div>
          <div className="detailInfo">
            <div className="detailInfoSubtitle orangeText">
              Основные характеристики:
            </div>
            {renderSpecification()}
          </div>
          <div>
            <div className="detailPrice">
              <div className="detailPriceSubtitle orangeText">Стоимость:</div>
              <div className="detailPriceInfo">
                <p>{data.price && data.price.toLocaleString("ru-RU")} р.</p>
              </div>
            </div>
            <div className="detailBtn">
              <div className="detailBtnGroup">
                <button className="button added">
                  {/* Купить */}
                  <img
                    onClick={onClickAdd}
                    src={
                      isItemAdded(data.id)
                        ? "/img/btn-cheked.svg"
                        : "/img/btn-plus.svg"
                    }
                    alt="Plus"
                  />
                </button>
                <button className="button favorite">
                  <img
                    onClick={onClickFavorite}
                    src={
                      isFavoritesAdded(data.id)
                        ? "/img/heart-liked.svg"
                        : "/img/heart-unliked.svg"
                    }
                    alt="Unliked"
                  />
                </button>
              </div>
              <button
                className="button btnBack"
                onClick={() => window.history.back()}
              >
                Вернуться назад
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="detailIDescriptionSubtitle orangeText">
            Краткое описание:
          </div>
          <p className="detailIDescription">{data.description}</p>
        </div>
      </div>
    </>
  );
};
