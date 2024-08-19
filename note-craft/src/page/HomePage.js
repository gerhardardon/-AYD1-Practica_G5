import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [view, setView] = useState('notas'); // Controla la vista actual

  return (
    <div>
      <div id='title'>
        <h1>Note-</h1>
        <h1>Craft</h1>
      </div>
      <nav>
        <ul>
          <li onClick={() => setView('notas')}>Ver Notas</li>
          <li onClick={() => setView('agregar')}>Agregar Nota</li>
          <li onClick={() => setView('archivadas')}>Notas Archivadas</li>
        </ul>
      </nav>
      <div id="container">
        {view === 'notas' && <div> Aquí van las notas </div>}
        {view === 'agregar' && <div> Aquí puedes agregar una nueva nota </div>}
        {view === 'archivadas' && <div> Aquí están las notas archivadas </div>}
      </div>
    </div>
  );
}

export default HomePage;
