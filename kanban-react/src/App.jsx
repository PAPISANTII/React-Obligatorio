import { useEffect } from "react";
import Column from "./components/Column";
import NewTaskForm from "./components/NewTaskForm";
import UserProfile from "./components/UserProfile"; //muestra datos del usuario
import { useAuth } from "./AuthContext"; //usamos el contexto de auth


function App() { //componente principal de la aplicacion
  const estiloTablero = {
    display: "flex",
    gap: "8px",
  };

  const { user, iniciarSesion } = useAuth(); //usuario y función para iniciar sesión

useEffect(() => {
  if (user) return; //si ya hay usuario, no mostramos One Tap

  //si el script de Google ya existe, no lo volvemos a crear
  if (document.getElementById("google-identity")) return;

  const script = document.createElement("script");
  script.id = "google-identity";             //id para identificarlo
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: manejarCredencial,
    });

    window.google.accounts.id.prompt();
  };

  function manejarCredencial(respuesta) {
    iniciarSesion(respuesta.credential);
  }

  return () => {
    //limpiamos el script al desmontar el componente para evitar problemas si el usuario cierra sesión y vuelve a abrirla
  };
}, [user, iniciarSesion]);


  //formulario de nueva tarea y las tres columnas
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
      <h1>Gestor de Tareas (Kanban)</h1>

      <UserProfile /> {/*muestra nombre, foto y boton de cerrar sesion */}

      {!user ? (
        //si no hay usuario escondemos el tablero y pedimos iniciar sesion
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f3f3f3",
            borderRadius: "4px",
          }}
        >
          <p>Por favor, inicia sesión con Google para usar el tablero.</p>
        </div>
      ) : (
        //si hay usuario mostramos el formulario y las columnas
        <>
          <NewTaskForm /> 
          <div style={estiloTablero}> 
            <Column title="Pendientes" status="pendiente" />
            <Column title="En Progreso" status="en-progreso" />
            <Column title="Completadas" status="completada" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
