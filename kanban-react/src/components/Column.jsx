import TaskCard from "./TaskCard";
import { useTasks } from "../TaskContext";

export default function Column({ title, status }) {
  const { tasks } = useTasks(); //tareas del contexto

  const tareasFiltradas = tasks.filter((task) => task.status === status); //tareas de la columna    

  const estiloColumna = {
    flex: 1,
    padding: "8px",
    backgroundColor: "#f3f3f3",
    borderRadius: "4px",
    minHeight: "200px",
  };

  return (
    <div style={estiloColumna}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      {tareasFiltradas.map((task) => ( //pinta las tareas de la columna
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
