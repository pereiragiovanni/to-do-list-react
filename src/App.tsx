import { PlusCircle } from 'phosphor-react';

import { Header } from './components/Header'
import { Input } from './components/Input'
import { Button } from './components/Button'

import { Header as ListHeader } from './components/List/Header'

import { ChangeEvent, useState } from 'react';

import { Item } from './components/List/Item';

import './global.css'
import styles from './App.module.css'
import { Empty } from './components/List/Empty';

export interface PropsTask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<PropsTask[]>([])
  const [inputTask, setInputTask] = useState('')

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>) {
    setInputTask(event.target.value);
  }

  function handleAddTask() {
    if (!inputTask) {
      return
    }

    const newTask: PropsTask = {
      id: new Date().getTime(),
      text: inputTask,
      isChecked: false
    }

    setTasks((state) => [...state, newTask])
    setInputTask('')
  }

  function deleteTask(id: number) {
    const filterdTasks = tasks.filter((task) => task.id !== id)

    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return
    }

    setTasks(filterdTasks)
  }

  function handleToogleTask({ id, value }: { id: number, value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isChecked: value
        }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <>
      <Header />
      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={handleChangeNewTask}
            value={inputTask}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>
        <div className={styles.tasksList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />
          {tasks.length  > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  onDeleteTask={deleteTask}
                  onToggleTaskStatus={handleToogleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </>
  )
}

