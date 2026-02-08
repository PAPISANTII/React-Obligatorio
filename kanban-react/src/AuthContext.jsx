import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(); //contexto para el usuario

export function AuthProvider({ children }) { //componente que guarda los datos del usuario
  const [user, setUser] = useState(() => {
    const guardado = localStorage.getItem("user");
    if (guardado) {
      return JSON.parse(guardado); //si habia algun usuario guardado, lo recuperamos
    }
    return null; //sino empezamos sin usuario
  });

  useEffect(() => {     //cuando cambia el usuario lo guardamos o lo borramos del localStorage
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  function iniciarSesion(credencialToken) {
    //decodificamos el token de Google para sacar los datos del usuario
    const datosUsuario = jwtDecode(credencialToken);
    const usuarioInfo = {
      name: datosUsuario.name,
      email: datosUsuario.email,
      picture: datosUsuario.picture,
    };
    setUser(usuarioInfo); //guardamos el usuario en el estado
  }

  function cerrarSesion() {
    //cerramos sesión limpiando el usuario
    setUser(null);
  }

  const valor = {
    user,
    iniciarSesion,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
