import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faMoon } from '@fortawesome/free-solid-svg-icons';
import { CiCirclePlus } from 'react-icons/ci';
import styles from './homeStyle.module.css';

function Home() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const inputRef = useRef(null);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (title.trim() !== '') {
      const newTask = {
        id: new Date().getTime(),
        title: title.trim(),
        completed: false,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setTitle('');
    }
  };
  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleEditChange = (e, taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: e.target.value } : task
      )
    );
  };

  const handleEditBlur = () => {
    setEditingTaskId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <div className={styles.title}>MY TASKS</div>
        <div className={styles.theme}>
          <FontAwesomeIcon icon={faMoon} className={styles.iconMoon} />
        </div>
        <div className={styles.add}>
          <CiCirclePlus size={25} className={styles.addIcon} />
          <input
            ref={inputRef}
            className={styles.inputField}
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.submitButton} type="button" onClick={handleAddTask}>
            ADD
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.formhead}>
            <div className={styles.taskleft}>
              <div className={styles.count}>
                {tasks.filter((task) => !task.completed).length}
              </div>
              <div className={styles.textTaskLeft}>tasks left</div>
            </div>
            <div className={styles.taskright}>
              <div className={styles.clearText} onClick={() => setTasks([])}>
                Clear all tasks
              </div>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.taskList}>
            {tasks.length === 0 ? (
              <div className={styles.emptyTask}>Empty task</div>
            ) : (
              tasks.map((task) => (
                <React.Fragment key={task.id}>
                  <div className={styles.tasks}>
                    <div className={styles.taskItem}>
                      {editingTaskId === task.id ? (
                        <>
                          <div className={styles.tastName}>
                            <input
                              type="text"
                              value={task.title}
                              onChange={(e) => handleEditChange(e, task.id)}
                              onBlur={handleEditBlur}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            onChange={() => handleCheckboxChange(task.id)}
                            checked={task.completed || false}
                          />
                          <div
                            className={`${styles.tastName} ${
                              task.completed ? styles.completedTask : ''
                            }`}
                          >
                            {task.title}
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.taskIcons}>
                      {editingTaskId === task.id ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.iconCheck}
                          onClick={() => handleEditBlur()}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEdit}
                          className={styles.iconEdit}
                          onClick={() => handleEditClick(task.id)}
                        />
                      )}
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className={styles.iconDelete}
                        onClick={() => deleteTask(task.id)}
                      />
                    </div>
                  </div>
                  {tasks.length >= 1 && <hr className={styles.divider} />}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

