import Column from "./components/Column";
import NewTaskForm from "./components/NewTaskForm";

function App() { //componente principal de la aplicacion
  const estiloTablero = {
    display: "flex",
    gap: "8px",
  };

  //formulario de nueva tarea y las tres columnas
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
      <h1>Gestor de Tareas (Kanban)</h1>
      <NewTaskForm /> 
      <div style={estiloTablero}> 
        <Column title="Pendientes" status="pendiente" />
        <Column title="En Progreso" status="en-progreso" />
        <Column title="Completadas" status="completada" />
      </div>
    </div>
  );
}

export default App;
