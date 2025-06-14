import { useContext } from 'react'
import { Link } from 'react-router'
import { AppContext } from '../../context/AppContext'
import ContentLoader from "react-content-loader"

import styles from './Card.module.scss'

const Card = ({
  id,
  name,
  price,
  imageUrl,
  onFavorite,
  onRemoveFavorites,
  favorites,
  onPlus,
  onDelete,
  cartItems,
  setIdSingleProduct,
  loading
}) => {

  const { isItemAdded, isFavoritesAdded } = useContext(AppContext)

  const onClickAdd = () => {
    const obj = { customId: id, name, price, imageUrl }
    const findItem = cartItems.find(item => item.customId === id)

    if (findItem) {
      onDelete(findItem.id)
    } else {
      onPlus(obj)
    }
  }

  const onClickFavorites = () => {
    const obj = { customId: id, name, price, imageUrl }
    const findItem = favorites.find(item => item.customId === id)

    if (findItem) {
      onRemoveFavorites(findItem.id)
    } else {
      onFavorite(obj)
    }
  }
  return (
    <div className={styles.card}>
      {loading ?
        <ContentLoader
          speed={2}
          width={150}
          height={200}
          viewBox="0 0 150 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="105" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="125" rx="3" ry="3" width="93" height="15" />
          <rect x="64" y="159" rx="0" ry="0" width="1" height="0" />
          <rect x="0" y="162" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="154" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
        :
        <>
          <div
            className={styles.favorite}
            onClick={onClickFavorites} >
            {onFavorite && <img width={36} height={36} src={isFavoritesAdded(id) ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />}
          </div>
          <Link to={`/item/${id}`}>
            <img
              onClick={() => {
                setIdSingleProduct(id)
                localStorage.setItem('id', id);
              }}
              width={150}
              height={120}
              src={imageUrl}
              alt="Tractors" />
            <h5
              onClick={() => {
                setIdSingleProduct(id)
                localStorage.setItem('id', id);
              }}>
              {name}
            </h5></Link>
          <div className={styles.cartBtn}>
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price.toLocaleString("ru-RU")} руб.</b>
            </div>
            <div
              className={styles.added}
              onClick={onClickAdd}>
              {onPlus && <img width={50} height={32} src={isItemAdded(id) ? "/img/btn-cart-checked.svg" : "/img/btn-cart.svg"} alt="Plus" />}

            </div>
          </div></>
      }

    </div>


  )
}

export default Card;

