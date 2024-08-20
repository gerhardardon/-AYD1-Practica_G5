import React from 'react';

function EliminarNota({ onEliminar }) {
  return (
    <button onClick={onEliminar} className="btn eliminar">
      Eliminar
    </button>
  );
}

export default EliminarNota;