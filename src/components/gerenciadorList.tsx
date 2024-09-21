"use client";
import { useState, useEffect } from "react";
import trash from "../../public/trash.png";

import styles from "../styles/gerenciadorList.module.scss";
import TaskModal from "./gerenciadoModal";
import DeleteModal from "./deleteModal";
import Image from "next/image";

const TaskList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [isDeletingCompletedTask, setIsDeletingCompletedTask] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const storedCompletedTasks = JSON.parse(
      localStorage.getItem("completedTasks") || "[]"
    );
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  const addTask = (task: string) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowModal(false);
  };

  const deleteTask = () => {
    if (isDeletingCompletedTask) {
      const updatedCompletedTasks = completedTasks.filter(
        (_, index) => index !== taskToDelete
      );
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      );
    } else {
      const updatedTasks = tasks.filter((_, index) => index !== taskToDelete);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    setShowDeleteModal(false);
  };

  const completeTask = (taskIndex: number) => {
    const task = tasks[taskIndex];
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    const updatedCompletedTasks = [...completedTasks, task];

    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
  };

  const openDeleteModal = (index: number, isCompleted: boolean) => {
    setTaskToDelete(index);
    setIsDeletingCompletedTask(isCompleted);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <div className={styles.box}>
        <div className={styles.container}>
          <div className={styles.taskList}>
            <h2 className={styles.text}>Suas tarefas de hoje</h2>
            {tasks.map((task, index) => (
              <div key={index} className={styles.taskItem}>
                <div className={styles.boxText}>
                  <input
                    type="checkbox"
                    className={styles.checkboxCustom}
                    onChange={() => completeTask(index)}
                  />
                  <label>{task}</label>
                </div>
                <button
                  className={styles.buttonIcon}
                  onClick={() => openDeleteModal(index, false)}
                >
                  <Image
                    className={styles.icon}
                    src={trash}
                    alt="trash"
                    width={20}
                    height={20}
                  />
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
            {completedTasks.map((task, index) => (
              <div key={index} className={styles.taskItem}>
                <div className={styles.boxText}>
                  <input
                    type="checkbox"
                    className={styles.checkboxCustom}
                    onChange={() => completeTask(index)}
                    checked
                    disabled
                  />
                  <label>{task}</label>
                </div>
                <button
                  className={styles.buttonIcon}
                  onClick={() => openDeleteModal(index, true)}
                >
                  <Image
                    className={styles.icon}
                    src={trash}
                    alt="trash"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            ))}
          </div>
          <button className={styles.button} onClick={() => setShowModal(true)}>
          Adicionar nova tarefa
        </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
