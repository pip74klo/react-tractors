import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

import { Info } from "../../Info";

import styles from './Drawer.module.scss';

function Drawer() {
  const { cartItems,
    setCartItems,
    setOrders,
    removeItemToCart,
    openCart,
    setOpenCart
  } = useContext(AppContext)

  const [orderCompleted, setOrderCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const price = cartItems.reduce((acc, item) => acc + item.price, 0)
  const priceTax = price * 0.05

  useEffect(() => {
    if (openCart) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [openCart])


  const clickRemoveItem = (id) => {
    removeItemToCart(id)
  }

  const clickCloseCart = () => {
    setOpenCart(false)
    setOrderCompleted(false)
  }

  const clickBtnOrder = async () => {
    try {
      setOrderCompleted(true)
      setIsLoading(true)

      const { data } = await axios.post(`https://a49719452acdd96f.mokky.dev/orders`, { items: cartItems })

      setOrderId(data.id)
      setCartItems([])
      setOrders(prev => [...prev, data])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(`https://a49719452acdd96f.mokky.dev/cart/${item.id}`)
      }

    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error)
      alert('Произошла ошибка при оформлении заказа. Попробуйте позже.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`${styles.overlay} ${openCart && styles.overlayVisible}`} >
      <div className={styles.drawer}>
        <h2 className={styles.cartTitle}>Корзина
          <img
            className="cu-p"
            width={32}
            height={32}
            src="/img/btn-remove.svg"
            alt="Remove"
            onClick={clickCloseCart} />
        </h2>
        {cartItems.length === 0 ?
          <div className={styles.emptyCart}>
            <Info
              image={orderCompleted ? "/img/complete-order.jpeg" : "/img/empty-cart.jpeg"}
              classGreenText={orderCompleted ? "greenText" : null}
              title={orderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
              description={orderCompleted ? (
                <>
                  Ваш заказ <b>#{orderId}</b> скоро будет передан курьерской доставке
                </>
              ) :
                (
                  'Добавьте хотя бы один товар, чтобы сделать заказ.'
                )}
              clickCloseCart={clickCloseCart}
            />
          </div> :
          <>
            <div className={styles.items}>
              {cartItems.map(({ id, name, price, imageUrl }, i) => {
                return (
                  <div key={i} className={styles.cartItem}>
                    <img className="mr-20" width={100} height={75} src={imageUrl} alt="" />
                    <div className="mr-20">
                      <p className="mb-5">{name}</p>
                      <b>{price?.toLocaleString('Ru-ru')} руб.</b>
                    </div>
                    <img onClick={() => clickRemoveItem(id)} className={styles.removeBtn} width={20} height={20} src="/img/delete.svg" alt="Remove" />
                  </div>
                )
              })}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>{price.toLocaleString("ru-RU")} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{priceTax.toLocaleString("ru-RU")} руб.</b>
                </li>
              </ul>
              <button
                className={styles.greenButton}
                onClick={clickBtnOrder}
                disabled={isLoading}>
                Оформить заказ
                <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        }
      </div>
    </div >
  )
}

export default Drawer;