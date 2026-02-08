import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskProvider } from "./TaskContext";
import { AuthProvider } from "./AuthContext"; //importamos el proveedor de autenticacion

createRoot(document.getElementById("root")).render( //Pintamos la aplicacion dentro del #root
  <StrictMode>
    <AuthProvider> 
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
); //envolvemos toda la app con el proveedor de tareas para que todas las partes de la app puedan acceder al contexto
