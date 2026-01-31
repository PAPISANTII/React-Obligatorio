import { useState } from "react";

export function useForm(valoresIniciales) { //hook para llevar el control de los formularios
  const [valores, setValores] = useState(valoresIniciales);

  function manejarCambio(evento) {
    const { name, value } = evento.target; //Cuando escribo en un input actualizo el valor correspondiente
    setValores((anteriores) => ({
      ...anteriores,
      [name]: value,
    }));
  }

  function resetearFormulario() {
    setValores(valoresIniciales); //deja el formulario como al principio
  }

  return {
    valores,
    manejarCambio,
    resetearFormulario,
  };
}
