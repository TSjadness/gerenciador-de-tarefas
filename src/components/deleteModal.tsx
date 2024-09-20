import styles from "../styles/modal.module.scss";

interface DeleteModalProps {
  confirmDelete: () => void;
  closeModal: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  confirmDelete,
  closeModal,
}) => {
  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>
        <h2>Deletar tarefa</h2>
        <p>Tem certeza que você deseja deletar essa tarefa?</p>
        <div className={styles.buttonBox}>
          <button onClick={closeModal} className={styles.buttonCancel}>
            Cancelar
          </button>

          <button onClick={confirmDelete} className={styles.buttonDelete}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
