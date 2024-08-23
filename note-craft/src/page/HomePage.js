import React, { useState } from 'react';
import './HomePage.css';
import AgregarNota from '../components/AddNotes/AddNotes';
import VerNota from '../components/ViewNote/ViewNotes';

function HomePage() {
  const [view, setView] = useState('agregar'); // Enfocado en Agregar Nota
  const [notas, setNotas] = useState([]);

  const agregarNota = (nuevaNota) => {
    setNotas([...notas, nuevaNota]); // Actualizamos el estado con la nueva nota
    console.log('Nota agregada:', nuevaNota); // Puedes usar este log para confirmar que la nota se añade
  };

  return (
    <div>
      <div id='title'>
        <h1>Note-</h1>
        <h1>Craft</h1>
      </div>
      <nav>
        <ul>
          <li onClick={() => setView('agregar')}>Agregar Nota</li>
          <li onClick={() => setView('ver')}>Ver Notas</li>
        </ul>
      </nav>
      <div id="container">
        {view === 'agregar' && <AgregarNota agregarNota={agregarNota} />}
        {view === 'ver' && <VerNota notas={notas} />} {/* Mostramos VerNota */}
      </div>
    </div>
  );
}

export default HomePage;
