import React, { useState } from 'react';
// Importamos los mismos estilos del otro formulario para mantener consistencia
import '../AddDebtForm/AddDebtForm.css';

function AddPaymentForm({ debts, onAddPayment }) {
  const [debtId, setDebtId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!debtId || !amount) return;
    onAddPayment({ debtId, amount: parseFloat(amount) });
    setDebtId('');
    setAmount('');
  };

  return (
    <div className="card">
      <h2>Abonar a una Deuda</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Seleccionar Deuda</label>
          <select value={debtId} onChange={(e) => setDebtId(e.target.value)}>
            <option value="">-- Elige una deuda --</option>
            {debts.map(debt => (
              <option key={debt.id} value={debt.id}>
                {debt.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Valor del abono ($)</label>
          <input
            type="number"
            placeholder=""
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">Registrar Abono</button>
      </form>
    </div>
  );
}

export default AddPaymentForm;