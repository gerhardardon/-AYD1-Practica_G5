import React, { useState, useEffect } from 'react';
import './ViewNotes.css';
import '../DeleteNote/DeleteNotes.css';
import { onEliminar } from '../DeleteNote/DeleteNote';

function VerNota() {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(true); 
  const [filtroEtiqueta, setFiltroEtiqueta] = useState(''); // Estado para el filtro de etiqueta

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
        setNotas(Array.isArray(data.notas) ? data.notas : []);
      } catch (error) {
        setError('Hubo un problema al recuperar las notas');
        console.error(error);
      }
    };

    if (refresh) {
      fetchNotas();
      setRefresh(false); 
    }
  }, [refresh]);

  const handleFijar = async (id) => {
    try {
        const response = await fetch('http://localhost:4000/Fijar_Nota', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (response.ok) {
            const updatedNotas = notas.map(nota =>
              nota.Id === id ? { ...nota, Prioridad: 1 } : nota
            );
            setNotas(updatedNotas);
        } else {
            const result = await response.json();
            console.error(result.mensaje);
        }
    } catch (error) {
        console.error('Error al fijar la nota:', error);
    }
  };

  const handleDesFijar = async (id) => {
    try {
        const response = await fetch('http://localhost:4000/Desfijar_Nota', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (response.ok) {
            const updatedNotas = notas.map(nota =>
              nota.Id === id ? { ...nota, Prioridad: 0 } : nota
            );
            setNotas(updatedNotas);
        } else {
            const result = await response.json();
            console.error(result.mensaje);
        }
    } catch (error) {
        console.error('Error al desfijar la nota:', error);
    }
  };

  // Obtener las etiquetas únicas de las notas para el filtro
  const etiquetasUnicas = [...new Set(notas.map(nota => nota.Etiqueta))];

  // Filtrado de notas basado en el filtro de búsqueda
  const notasFiltradas = notas.filter(nota =>
    (filtroEtiqueta === '' || nota.Etiqueta === filtroEtiqueta)
  );

  return (
    <div className="notes-container">
      <h2>Tus Notas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Dropdown de filtrado por etiqueta */}
      <select 
        value={filtroEtiqueta} 
        onChange={(e) => setFiltroEtiqueta(e.target.value)} 
        className="filter-select"
      >
        <option value="">Todas las etiquetas</option>
        {etiquetasUnicas.map((etiqueta, index) => (
          <option key={index} value={etiqueta}>{etiqueta}</option>
        ))}
      </select>

      {notas.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ) : (
        <>
          <div className="fijadas-container">
            <h3>Fijado</h3>
            <ul className="notes-list">
              {notasFiltradas.filter(nota => nota.Prioridad === 1).map((nota, index) => (
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
              {notasFiltradas.filter(nota => nota.Prioridad === 0).map((nota, index) => (
                <li key={index} className="note-item">
                  <h3>{nota.Titulo}</h3>
                  <p>{nota.Descripcion}</p>
                  <div className="note-tag-container">
                    <span className="note-tag">{nota.Etiqueta}</span>
                  </div>
                  <div className="fijar-button-container">
                    <button className="fijar-button" onClick={() => handleFijar(nota.Id)}>Fijar</button>
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
