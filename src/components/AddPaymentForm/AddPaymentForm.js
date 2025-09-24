import React, { useState } from 'react';
import '../AddDebtForm/AddDebtForm.css';

function AddPaymentForm({ debts, onAddPayment }) {
  const [debtId, setDebtId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!debtId || !amount) return;
    // El objeto que se envía a App.js ya tiene los nombres correctos.
    onAddPayment({ debtId, amount });
    // No reseteamos debtId para que el usuario pueda añadir varios abonos a la misma deuda.
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
                {/* --- CORRECCIÓN --- */}
                {/* Se muestra 'debt.descripcion' en lugar del incorrecto 'debt.name'. */}
                {debt.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Valor del abono ($)</label>
          <input
            type="number"
            placeholder="Ej: 10000"
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