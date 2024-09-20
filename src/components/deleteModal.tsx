import styles from "../styles/modal.module.scss";

interface DeleteModalProps {
  confirmDelete: () => void;
  closeModal: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ confirmDelete, closeModal }) => {
  return (
    <div className={styles.modal}>
      <h2>Deletar tarefa</h2>
      <p>Tem certeza que você deseja deletar essa tarefa?</p>
      <button onClick={confirmDelete}>Deletar</button>
      <button onClick={closeModal}>Cancelar</button>
    </div>
  );
};

export default DeleteModal;
