import React, { useState } from 'react';
import cn from 'classnames';
import { Trash2 } from 'lucide-react';
import styles from './TasksWidget.module.scss';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const TasksWidget: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Завершити Етап 4 розробки', completed: true },
    { id: '2', text: 'Додати тестування Vitest', completed: false },
  ]);
  const [inputText, setInputText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: inputText.trim(), completed: false },
    ]);
    setInputText('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.tasksContainer}>
      <form className={styles.taskForm} onSubmit={handleAddTask}>
        <input
          type="text"
          className={styles.taskInput}
          placeholder="Нове завдання..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className={styles.addBtn}>
          +
        </button>
      </form>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(styles.taskItem, { [styles.taskItemCompleted]: task.completed })}
          >
            <label className={styles.taskCheckbox}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={styles.taskText}>{task.text}</span>
            </label>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};