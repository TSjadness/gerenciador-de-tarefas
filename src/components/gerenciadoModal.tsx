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
    <div className={styles.modal}>
      <h2>Nova tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite"
          required
        />
        <button type="submit">Adicionar</button>
        <button type="button" onClick={closeModal}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default TaskModal;
