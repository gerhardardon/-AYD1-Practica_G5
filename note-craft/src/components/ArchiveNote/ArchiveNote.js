import React from 'react';

function ArchivarNota({ onArchivar }) {
  return (
    <button onClick={onArchivar} className="btn archivar">
      Archivar
    </button>
  );
}

export default ArchivarNota;
