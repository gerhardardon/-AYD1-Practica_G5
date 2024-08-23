import React, { useState } from 'react';
import './AddNotes.css';

function AgregarNota({ agregarNota }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [error, setError] = useState(''); // Estado para manejar el error

  const manejarSubmit = async(e) => {
    e.preventDefault();

    if (titulo.trim() === '') {
      setError('El título no puede estar vacío'); // Mostrar error si el título está vacío
      return;
    }

    const nuevaNota = { titulo, descripcion, etiqueta };
    // Realizar la solicitud fetch
    try {
      const response = await fetch('http://localhost:4000/Agregar_Nota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaNota),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la nota');
      }

      const data = await response.json();
      agregarNota(data); // Puedes pasar los datos obtenidos al agregar la nota si es necesario

      // Limpiamos los campos y el error
      setTitulo('');
      setDescripcion('');
      setEtiqueta('');
      setError('');
    } catch (error) {
      setError('Hubo un problema al agregar la nota'); // Manejar el error
    }
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
