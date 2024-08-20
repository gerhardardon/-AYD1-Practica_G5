import React, { useState, useEffect } from 'react';
import './ViewNotes.css';

function VerNota() {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch('http://localhost:4000/Recuperar_Notas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al recuperar las notas');
        }

        const data = await response.json();
        console.log(data); // Verifica la estructura de los datos
        setNotas(Array.isArray(data.notas) ? data.notas : []);
      } catch (error) {
        setError('Hubo un problema al recuperar las notas');
        console.error(error);
      }
    };

    fetchNotas();
  }, []);

  return (
    <div className="notes-container">
      <h2>Tus Notas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {notas.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ) : (
        <ul className="notes-list">
          {notas.map((nota, index) => (
            <li key={index} className="note-item">
              <h3>{nota.Titulo}</h3>
              <p>{nota.Descripcion}</p>
              <span className="note-tag">{nota.Etiqueta}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VerNota;
