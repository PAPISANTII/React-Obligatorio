import { useTasks } from "../TaskContext";

export default function TaskCard({ task }) {
  const { deleteTask, moveTask } = useTasks();

  const estiloTarjeta = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    marginBottom: "8px",
    backgroundColor: "#fff",
  };

  if (task.priority === "high") {
    estiloTarjeta.border = "2px solid red"; //si la tarjeta es importante, borde rojo
  }

  return (
    <div style={estiloTarjeta}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>
        <strong>Prioridad:</strong> {task.priority}
      </p>
      <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
        <button onClick={() => moveTask(task.id, "atras")}>←</button>
        <button onClick={() => moveTask(task.id, "adelante")}>→</button>
        <button
          onClick={() => deleteTask(task.id)}
          style={{ marginLeft: "auto", color: "white", backgroundColor: "red" }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}
