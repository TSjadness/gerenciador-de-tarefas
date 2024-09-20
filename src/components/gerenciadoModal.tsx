import { useState } from "react";
import styles from "../styles/modal.module.scss";

interface TaskModalProps {
  addTask: (title: string) => void;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ addTask, closeModal }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(title);
    setTitle("");
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Nova tarefa</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="task-title">Título</label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite"
            required
          />
          <div className={styles.buttonBox}>
            <button
              type="button"
              className={styles.buttonCancel}
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.buttonAdd}>
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
