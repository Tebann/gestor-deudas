import React, { useState } from 'react';
import './AddDebtForm.css';

function AddDebtForm({ onAddDebt }) {
  // --- CORRECCIÓN ---
  // Se cambian los nombres de los estados para ser consistentes: 'descripcion' y 'monto'.
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descripcion || !monto) return;

    // --- CORRECCIÓN ---
    // Se envía el objeto con los nombres de propiedad correctos: { descripcion, monto }.
    // El valor de 'monto' ya es un string que viene del input, lo dejamos así
    // para que App.js lo procese.
    onAddDebt({ descripcion, monto });

    // Se limpian los campos del formulario.
    setDescripcion('');
    setMonto('');
  };

  return (
    <div className="card">
      <h2>Registrar Nueva Deuda</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la deuda</label>
          <input
            type="text"
            placeholder="Ej: Almuerzo de equipo"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Valor total ($)</label>
          <input
            type="number"
            placeholder="Ej: 50000"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">Agregar Deuda</button>
      </form>
    </div>
  );
}

export default AddDebtForm;