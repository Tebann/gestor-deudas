import React from 'react';
import './DebtList.css';

// Función para formatear dinero
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// --- COMPONENTE MODIFICADO ---
// Ahora recibe onDeleteDebt y tiene un botón para eliminar.
const DebtItem = ({ debt, onSelectDebt, isSelected, onDeleteDebt }) => {
  const totalPaid = debt.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const currentBalance = debt.initialAmount - totalPaid;

  const handleDeleteClick = (e) => {
    // Esto evita que al hacer clic en el botón, también se seleccione la deuda.
    e.stopPropagation(); 
    onDeleteDebt(debt.id);
  };

  return (
    <div className={`debt-item ${isSelected ? 'selected' : ''}`} onClick={() => onSelectDebt(debt)}>
      <div className="debt-info">
        <h3>{debt.name}</h3>
        <p>Valor inicial: {formatCurrency(debt.initialAmount)}</p>
      </div>
      <div className="debt-balance">
        <h4>Saldo Actual</h4>
        <span>{formatCurrency(currentBalance)}</span>
      </div>
      {/* --- BOTÓN NUEVO --- */}
      <button onClick={handleDeleteClick} className="delete-btn">
        Eliminar
      </button>
      {/* ------------------- */}
    </div>
  );
};
// -----------------------------

// Componente para el historial de pagos (sin cambios)
const PaymentHistory = ({ debt }) => {
  if (!debt) {
    return <div className="card payment-history-card placeholder">Selecciona una deuda para ver su historial de abonos.</div>;
  }

  return (
    <div className="card payment-history-card">
      <h2>Historial de Abonos: {debt.name}</h2>
      {debt.payments.length === 0 ? (
        <p>Aún no hay abonos para esta deuda.</p>
      ) : (
        <ul className="payment-list">
          {debt.payments.map((payment, index) => (
            <li key={index} className="payment-list-item">
              <span>{payment.date}</span>
              <strong>{formatCurrency(payment.amount)}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- COMPONENTE MODIFICADO ---
// Ahora recibe onDeleteDebt y lo pasa a cada DebtItem.
function DebtList({ debts, onSelectDebt, selectedDebt, onDeleteDebt }) {
  return (
    <>
      <div className="card">
        <h2>Deudas Activas</h2>
        <div className="debt-list-container">
          {debts.map(debt => (
            <DebtItem
              key={debt.id}
              debt={debt}
              onSelectDebt={onSelectDebt}
              isSelected={selectedDebt?.id === debt.id}
              onDeleteDebt={onDeleteDebt} // <-- Lo pasamos aquí
            />
          ))}
        </div>
      </div>
      <PaymentHistory debt={selectedDebt} />
    </>
  );
}

export default DebtList;