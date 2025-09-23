import React, { useState } from 'react';
import './AddDebtForm.css';

function AddDebtForm({ onAddDebt }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAddDebt({ name, initialAmount: parseFloat(amount) });
    setName('');
    setAmount('');
  };

  return (
    <div className="card">
      <h2>Registrar Nueva Deuda</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la deuda</label>
          <input
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Valor total ($)</label>
          <input
            type="number"
            placeholder=""
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">Agregar Deuda</button>
      </form>
    </div>
  );
}

export default AddDebtForm;