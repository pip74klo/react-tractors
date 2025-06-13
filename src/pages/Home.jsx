import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import Card from "../componets/Card";

export const Home = () => {
  const {
    items,
    cartItems,
    addToCartItem,
    removeItemToCart,
    addToFavoriteItem,
    removeItemToFavorites,
    favorites,
    isLoading,
    setIdSingleProduct,
  } = useContext(AppContext);

  const [searchInputValue, setSearchInputValue] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  return (
    <div className="content p-40 clear">
      <div className="d-flex align-center mb-40 justify-between">
        {searchInputValue ? (
          <h1>Поиск по "{searchInputValue}"</h1>
        ) : (
          <h1>Тракторы</h1>
        )}
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            value={searchInputValue}
            type="text"
            placeholder="Поиск ..."
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : filteredItems).map((item, i) => {
          return (
            <Card
              key={i}
              {...item}
              cartItems={cartItems}
              onPlus={(obj) => addToCartItem(obj)}
              onDelete={removeItemToCart}
              onFavorite={(obj) => addToFavoriteItem(obj)}
              onRemoveFavorites={removeItemToFavorites}
              favorites={favorites}
              setIdSingleProduct={setIdSingleProduct}
              loading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
};
