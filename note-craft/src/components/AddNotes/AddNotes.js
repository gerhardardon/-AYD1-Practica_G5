import React, { useState } from 'react';
import './AddNotes.css';

function AgregarNota({ agregarNota }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [error, setError] = useState(''); // Estado para manejar el error

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (titulo.trim() === '') {
      setError('El título no puede estar vacío'); // Mostrar error si el título está vacío
      return;
    }

    const nuevaNota = { titulo, descripcion, etiqueta };
    agregarNota(nuevaNota);

    // Limpiamos los campos y el error
    setTitulo('');
    setDescripcion('');
    setEtiqueta('');
    setError('');
  };

  return (
    <div>
      <h2>Agregar Nota</h2>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Título:</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
        <div>
          <label>Descripción:</label>
          <textarea 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
          />
        </div>
        <div>
          <label>Etiqueta:</label>
          <input 
            type="text" 
            value={etiqueta} 
            onChange={(e) => setEtiqueta(e.target.value)} 
          />
        </div>
        <button type="submit">Agregar Nota</button>
      </form>
    </div>
  );
}

export default AgregarNota;
