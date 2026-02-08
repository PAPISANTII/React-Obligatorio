import { useAuth } from "../AuthContext"; //usamos el contexto de autenticacion

// muestra la foto y el nombre del usuario cuando esta logueado
export default function UserProfile() {
  const { user, cerrarSesion } = useAuth();

  // si no hay usuario no pinto nada
  if (!user) return null;

  const estiloHeader = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#f3f3f3",
    borderRadius: "4px",
    marginBottom: "16px",
  };

  const estiloFoto = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  };

  return (
    <div style={estiloHeader}>
      <img src={user.picture} alt={user.name} style={estiloFoto} />
      <span>
        <strong>{user.name}</strong>
      </span>
      <button
        onClick={cerrarSesion}
        style={{ marginLeft: "auto", padding: "6px 12px" }}
      >
        Cerrar Sesion
      </button>
    </div>
  );
}
