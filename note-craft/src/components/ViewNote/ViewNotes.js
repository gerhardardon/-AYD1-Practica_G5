import React, { useState, useEffect } from 'react';
import './ViewNotes.css';
import '../DeleteNote/DeleteNotes.css';
import { onEliminar } from '../DeleteNote/DeleteNote';



function VerNota() {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(true); 

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

    // Solo ejecuta fetchNotas cuando `refresh` cambie
    if (refresh) {
      fetchNotas();
      setRefresh(false); // Resetea `refresh` después de ejecutar el efecto
    }
  }, [refresh]);

  const handleFijar = async (id) => {
    console.log('Fijar nota con id:', id);
    try {
        const response = await fetch('http://localhost:4000/Fijar_Nota', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result.mensaje);
            const updatedNotas = notas.map(nota =>
              nota.Id === id ? { ...nota, Prioridad: 1 } : nota
            );
            setNotas(updatedNotas);
        } else {
            console.error(result.mensaje);
        }
    } catch (error) {
        console.error('Error al fijar la nota:', error);
    }
  };

  const handleDesFijar = async (id) => {
    console.log('Fijar nota con id:', id);
    try {
        const response = await fetch('http://localhost:4000/Desfijar_Nota', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result.mensaje);
            const updatedNotas = notas.map(nota =>
              nota.Id === id ? { ...nota, Prioridad: 0 } : nota
            );
            setNotas(updatedNotas);
        } else {
            console.error(result.mensaje);
        }
    } catch (error) {
        console.error('Error al fijar la nota:', error);
    }
  };

  

return (
  <div className="notes-container">
      <h2>Tus Notas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {notas.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ) : (
        <>
          <div className="fijadas-container">
            <h3>Fijado</h3>
            <ul className="notes-list">
              {notas.filter(nota => nota.Prioridad === 1).map((nota, index) => (
                <li key={index} className="note-item">
                  <h3>{nota.Titulo}</h3>
                  <p>{nota.Descripcion}</p>
                  <div className="note-tag-container">
                    <span className="note-tag">{nota.Etiqueta}</span>
                  </div>
                  <div className="fijar-button-container">
                    <button className="fijar-button" onClick={() => handleDesFijar(nota.Id)}>Desfijar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="no-fijadas-container">
            <h3>No Fijado</h3>
            <ul className="notes-list">
              {notas.filter(nota => nota.Prioridad === 0).map((nota, index) => (
                <li key={index} className="note-item">
                  <h3>{nota.Titulo}</h3>
                  <p>{nota.Descripcion}</p>
                  <div className="note-tag-container">
                    <span className="note-tag">{nota.Etiqueta}</span>
                  </div>
                  <div className="fijar-button-container">
                    <button className="fijar-button" onClick={() => handleFijar(nota.Id) }>Fijar</button>
                    <button className="eliminar-button" onClick={() => onEliminar(nota.Id) && setRefresh(true)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
);
}

export default VerNota;
