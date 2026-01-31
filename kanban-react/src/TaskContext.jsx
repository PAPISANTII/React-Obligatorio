import { createContext, useContext, useEffect, useState } from "react"; 

const TaskContext = createContext(); //Creamos el contexto

export function TaskProvider({ children }) { //componente que guarda las tareas y funciones
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      return JSON.parse(saved); //Si hay tareas guardadas en el navegador, las recuperamos
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); //cada vez que cambian las tareas las guardamos en el navegador

  function addTask({ title, description, priority }) {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status: "pendiente", // Pendiente
    };
    setTasks((prev) => [...prev, newTask]); //añadimos la nueva tarea al final del array de tareas
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id)); //eliminamos la tarea filtrando con el id
  }

  function moveTask(id, direction) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        const order = ["pendiente", "en-progreso", "completada"]; //orden en el que se mueven las columnas
        const currentIndex = order.indexOf(task.status);
        let newIndex = currentIndex;

        if (direction === "adelante" && currentIndex < order.length - 1) {
          newIndex = currentIndex + 1; //mover a la derecha, flecha derecha
        } else if (direction === "atras" && currentIndex > 0) {
          newIndex = currentIndex - 1;//mover a la izquierda, flecha izquierda
        }

        return { ...task, status: order[newIndex] }; //Devolvemos la tarea con el nuevo estado
      }) 
    );
  }

  const value = {
    tasks,
    addTask,
    deleteTask,
    moveTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}