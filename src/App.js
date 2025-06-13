import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import { AppContext } from "./context/AppContext";

import axios from "axios";

import Header from "./componets/Header";
import Drawer from "./componets/Drawer/Drawer";

import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";
import SingleTractor from "./pages/SingleTractor";

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [openCart, setOpenCart] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [idSingleProduct, setIdSingleProduct] = useState('')
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const { data } = await axios.get(`https://a49719452acdd96f.mokky.dev/items`)
      const { data: cartItems } = await axios.get(`https://a49719452acdd96f.mokky.dev/cart`)
      const { data: favorites } = await axios.get(`https://a49719452acdd96f.mokky.dev/favorites`)
      setItems(data)
      setCartItems(cartItems)
      setFavorites(favorites)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const addToCartItem = async (obj) => {
    try {
      const { data } = await axios.post(`https://a49719452acdd96f.mokky.dev/cart`, obj)
      setCartItems(prev => [...prev, data])
    } catch (error) {
      console.error('Не удалось добавить в корзину', error)
      alert('Произошла ошибка при добавлении в корзину.')
    }
  }

  const removeItemToCart = async (id) => {
    try {
      setCartItems(cartItems.filter(item => item.id !== id))
      await axios.delete(`https://a49719452acdd96f.mokky.dev/cart/${id}`)
    } catch (error) {
      console.error('Не удалось удалить из корзину', error)
      alert('Произошла ошибка при удалении из корзины.')
    }
  }


  const addToFavoriteItem = async (obj) => {
    try {
      const { data } = await axios.post(`https://a49719452acdd96f.mokky.dev/favorites`, obj)
      setFavorites(prev => [...prev, data])
    } catch (error) {
      console.error('Не удалось добавить в избранное', error)
      alert('Произошла ошибка при добавлении в избранное.')
    }
  }

  const removeItemToFavorites = async (id) => {
    try {
      setFavorites(favorites.filter(item => item.id !== id))
      await axios.delete(`https://a49719452acdd96f.mokky.dev/favorites/${id}`)
    } catch (error) {
      console.error('Не удалось удалить из избранного', error)
      alert('Произошла ошибка при удалении из избранного.')
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some(item => item.customId === id)
  }

  const isFavoritesAdded = (id) => {
    return favorites.some(item => item.customId === id)
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      setCartItems,
      favorites,
      orders,
      setOrders,
      isItemAdded,
      isFavoritesAdded,
      idSingleProduct,
      setIdSingleProduct,
      addToCartItem,
      removeItemToCart,
      addToFavoriteItem,
      removeItemToFavorites,
      openCart,
      setOpenCart,
      isLoading,
    }}>
      <div className="wrapper clear">
        <Drawer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route exact path="/item/:id" element={<SingleTractor />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
