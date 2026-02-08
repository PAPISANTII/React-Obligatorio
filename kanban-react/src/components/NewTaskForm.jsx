import { useForm } from "../useForm";
import { useTasks } from "../TaskContext";
import { useAuth } from "../AuthContext"; //usamos el contecto de usuario

export default function NewTaskForm() {
  const { addTask } = useTasks();
  const { user } = useAuth(); //obtenemos el usuario actual

  const { valores, manejarCambio, resetearFormulario } = useForm({
    title: "",
    description: "",
    priority: "medium",
  });

  function manejarEnvio(evento) {
    evento.preventDefault(); //prevenir que se recargue la pagina al enviar el formulario

    if (!valores.title.trim()) return; //si no hay titulo no hacemos nada   

    addTask({
      title: valores.title,
      description: valores.description,
      priority: valores.priority,
      autor: user ? user.name : "Desconocido", //guardamos el usuario que crea la tarea
    });

    resetearFormulario(); //limpiamos el formulario despues de enviar la tareaa 
  }

  const estiloFormulario = {
    marginBottom: "16px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
  };

  return (
    <form onSubmit={manejarEnvio} style={estiloFormulario}>
      <h2>Nueva tarea</h2>

      <div style={{ marginBottom: "8px" }}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={valores.title}
            onChange={manejarCambio}
            style={{ width: "100%", padding: "4px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label>
          Descripción:
          <textarea
            name="description"
            value={valores.description}
            onChange={manejarCambio}
            style={{ width: "100%", padding: "4px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label>
          Prioridad:
          <select
            name="priority"
            value={valores.priority}
            onChange={manejarCambio}
            style={{ width: "100%", padding: "4px" }}
          >
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </label>
      </div>

      <button type="submit">Añadir tarea</button>
    </form>
  );
}
