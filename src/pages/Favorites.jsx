import { useContext } from "react";

import { AppContext } from "../context/AppContext";

import Card from "../componets/Card";
import { Info } from "../Info";

export const Favorites = () => {
  const {
    cartItems,
    favorites,
    setIdSingleProduct,
    isLoading,
    addToCartItem,
    removeItemToCart,
    addToFavoriteItem,
    removeItemToFavorites,
  } = useContext(AppContext);

  return (
    <div className="content p-40 clear">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-center align-center"
          style={{ height: "200px" }}
        >
          <p>Загрузка закладок...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="favoritesEmpty">
          <Info
            image={"/img/empty-favorites.jpeg"}
            title={"Закладок нет :("}
            description={"Вы ничего не добавляли в закладки"}
            clickCloseCart={() => window.history.back()}
          />
        </div>
      ) : (
        <div className="d-flex  flex-wrap">
          {favorites.map((item, i) => {
            return (
              <Card
                key={i}
                {...item}
                id={item.customId}
                cartItems={cartItems}
                onPlus={(obj) => addToCartItem(obj)}
                onDelete={removeItemToCart}
                onFavorite={(obj) => addToFavoriteItem(obj)}
                onRemoveFavorites={removeItemToFavorites}
                favorites={favorites}
                setIdSingleProduct={setIdSingleProduct}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
