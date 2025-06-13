import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, Link } from "react-router";

import { ReactComponent as FavoritesIcon } from '../img/svg/favorites.svg';
import { ReactComponent as CartIcon } from '../img/svg/cart.svg';
import { ReactComponent as UserIcon } from '../img/svg/user.svg';

const Header = () => {
  const { cartItems, setOpenCart } = useContext(AppContext)

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to='/' className="d-flex align-center">
        <img width={120} height={80} src="/img/logo.svg" alt="Logo" />
        <div className="ml-15">
          <div className="d-flex">
            <h3 className="text-uppercase">React</h3>
            <h3 className="text-uppercase color-logo">Tractor</h3>
          </div>
          <p className="opacity-8">Магазин реактивной техники</p>
        </div>
      </Link>
      <div>
        <ul className="d-flex">
          <li className="favoritesListItem">
            <NavLink to="/favorites">
              {({ isActive }) => (
                <>
                  <span className={isActive ? "active" : ""}>Закладки</span>
                  <FavoritesIcon />
                </>
              )}
            </NavLink>
          </li>
          <li onClick={() => setOpenCart(true)}>
            <CartIcon />
            <div className={`countCart ${cartItems.length === 0 ? 'countCartEmpty' : ''}`}>
              <span >{cartItems.length === 0 ? null : cartItems.length}</span>
            </div>
          </li>
          <li className="ordersListItem">
            <NavLink to='/orders'>
              {({ isActive }) => (
                <>
                  <UserIcon />
                  <span className={isActive ? "active" : ""}>Покупки</span>
                </>

              )}

            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;