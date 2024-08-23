import React, { useState, useEffect } from 'react';
import '../DeleteNote/DeleteNotes.css';

function ArchivarNota({ onArchivar }) {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(true); 
  const [filtroEtiqueta] = useState(''); // Estado para el filtro de etiqueta

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

  const handleDesArchivar = async (id) => {
    try {
        const response = await fetch('http://localhost:4000/Desarchivar_Nota', {
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
        console.error('Error al desarchivar la nota:', error);
    }
  };

  // Obtener las etiquetas únicas de las notas para el filtro

  // Filtrado de notas basado en el filtro de búsqueda
  const notasFiltradas = notas.filter(nota =>
    (filtroEtiqueta === '' || nota.Etiqueta === filtroEtiqueta)
  );

  return (
    <div className="notes-container">
      <h2>Tus Notas archivadas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Dropdown de filtrado por etiqueta */}

      {notas.length === 0 ? (
        <p>No hay notas disponibles.</p>
      ) : (
        <>
{/* sadfsdfsd */}
<div className="archivadas-container">
            <h3>Archivado</h3>
            <ul className="notes-list">
              {notasFiltradas.filter(nota => nota.Prioridad === 2).map((nota, index) => (
                <li key={index} className="note-item">
                  <h3>{nota.Titulo}</h3>
                  <p>{nota.Descripcion}</p>
                  <div className="note-tag-container">
                    <span className="note-tag">{nota.Etiqueta}</span>
                  </div>
                  <div className="fijar-button-container">
                    <button className="fijar-button" onClick={() => handleDesArchivar(nota.Id)}>Desarchivar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
{/* sdfsdf */}
        </>
      )}
    </div>
  );
}

export default ArchivarNota;
