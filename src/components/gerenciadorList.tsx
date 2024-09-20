"use client";
import { useState, useEffect } from "react";

import styles from "../styles/gerenciadorList.module.scss";
import TaskModal from "./gerenciadoModal";
import DeleteModal from "./deleteModal";
import { AiOutlineDelete } from "react-icons/ai";

const TaskList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const addTask = (task: string) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowModal(false);
  };

  const deleteTask = () => {
    const updatedTasks = tasks.filter((_, index) => index !== taskToDelete);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.taskList}>
          <h2 className={styles.text}>Suas tarefas de hoje</h2>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskItem}>
              <input type="checkbox" />
              <span>{task}</span>
              <button
                onClick={() => {
                  setTaskToDelete(index);
                  setShowDeleteModal(true);
                }}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}

          {showModal && (
            <TaskModal
              addTask={addTask}
              closeModal={() => setShowModal(false)}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              confirmDelete={deleteTask}
              closeModal={() => setShowDeleteModal(false)}
            />
          )}
          <h2 className={styles.text}>Tarefas finalizadas</h2>
        </div>
        <button className={styles.button} onClick={() => setShowModal(true)}>
          Adicionar nova tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskList;
