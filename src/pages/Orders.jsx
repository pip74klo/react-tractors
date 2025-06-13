import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

import axios from "axios";

import Card from "../componets/Card";
import { Info } from "../Info";
import Modal from "../componets/Modal/Modal";

export const Orders = () => {
  const { setIdSingleProduct, orders, setOrders } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://a49719452acdd96f.mokky.dev/orders").then(({ data }) => {
      setOrders(data);
      setIsLoading(false);
    });
  }, []);

  const onDeleteClick = () => {
    setShowModal(true);
  };

  const handleClickConfirm = async () => {
    if (orders.length) {
      try {
        for (let i = 0; i < orders.length; i++) {
          const item = orders[i];
          await axios.delete(
            `https://a49719452acdd96f.mokky.dev/orders/${item.id}`
          );
        }
        setOrders([]);
      } catch (error) {
        console.error("Ошибка удалении заказов", error);
      }
    }
    setShowModal(false);
  };

  return (
    <div className="content p-40 clear">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
        <button className="button btnBack" onClick={onDeleteClick}>
          Удалить все заказы
        </button>
      </div>
      {isLoading ? (
        <div
          className="d-flex justify-center align-center"
          style={{ height: "200px" }}
        >
          <p>Загрузка заказов...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="favoritesEmpty">
          <Info
            image={"/img/empty-orders.jpeg"}
            title={"У вас нет заказов"}
            description={`Вы нищеброд?\n Оформите хотя бы один заказ.`}
            clickCloseCart={() => window.history.back()}
          />
        </div>
      ) : (
        <div>
          {orders?.map(({ id, items }) => {
            return (
              <div key={id}>
                <div className="orderTitle">
                  <h3>Заказ # {id}</h3>
                </div>
                <div className="d-flex flex-wrap">
                  {items.map((product) => {
                    return (
                      <Card
                        key={product.id}
                        {...product}
                        setIdSingleProduct={setIdSingleProduct}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleClickConfirm={handleClickConfirm}
        />
      )}
    </div>
  );
};
