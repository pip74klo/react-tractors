import styles from './Modal.module.scss'


const Modal = ({ setShowModal, handleClickConfirm }) => {

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWindow}>
        <div className={styles.modalTitle}>Вы уверены что хотите удалить все заказы?</div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.button}
            onClick={handleClickConfirm}>ДА</button>
          <button
            className={styles.button}
            onClick={() => setShowModal(false)}>НЕТ</button>
        </div>
        <button
          className={styles.close}
          onClick={() => setShowModal(false)}
        >X</button>
      </div>
    </div>
  )
}

export default Modal