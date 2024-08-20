import React from 'react';

function EditarNota({ onEditar }) {
  return (
    <button onClick={onEditar} className="btn editar">
      Editar
    </button>
  );
}

export default EditarNota;
