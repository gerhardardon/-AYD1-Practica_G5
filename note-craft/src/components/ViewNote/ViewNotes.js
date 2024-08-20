import React from 'react';
import './ViewNotes.css';

function VerNota({ notas }) {
  return (
    <div className="notes-container">
      <h2>Tus Notas</h2>
      {notas.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ) : (
        <ul className="notes-list">
          {notas.map((nota, index) => (
            <li key={index} className="note-item">
              <h3>{nota.titulo}</h3>
              <p>{nota.descripcion}</p>
              <span className="note-tag">{nota.etiqueta}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VerNota;
