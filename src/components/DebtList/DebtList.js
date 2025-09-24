import React from 'react';
import './DebtList.css';

// --- Función de Utilidad ---
const formatCurrency = (value) => {
  const numberValue = Number(value) || 0;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
};

// --- Componente para un solo ítem de la lista (Estilo Anterior) ---
const DebtItem = ({ debt, onSelectDebt, isSelected, onDeleteDebt }) => {
  const montoInicial = Number(debt.monto) || 0;
  const totalPagado = (debt.payments || []).reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);
  const saldoActual = montoInicial - totalPagado;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteDebt(debt.id);
  };

  return (
    <div className={`debt-item ${isSelected ? 'selected' : ''}`} onClick={() => onSelectDebt(debt)}>
      <div className="debt-info">
        <h3>{debt.descripcion}</h3>
        <p>Valor inicial: {formatCurrency(montoInicial)}</p>
      </div>
      <div className="debt-balance">
        <h4>Saldo Actual</h4>
        <span>{formatCurrency(saldoActual)}</span>
      </div>
      <button onClick={handleDeleteClick} className="delete-btn">
        &times;
      </button>
    </div>
  );
};

// --- Componente para el historial de pagos ---
const PaymentHistory = ({ debt }) => {
  if (!debt) {
    return <div className="card payment-history-card placeholder">Selecciona una deuda para ver su historial de abonos.</div>;
  }

  return (
    <div className="card payment-history-card">
      <h2>Historial de Abonos: {debt.descripcion}</h2>
      {(debt.payments || []).length === 0 ? (
        <p>Aún no hay abonos para esta deuda.</p>
      ) : (
        <ul className="payment-list">
          {debt.payments.map((payment) => (
            <li key={payment.id} className="payment-list-item">
              <span>{payment.date}</span>
              <strong>{formatCurrency(payment.amount)}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- Componente Principal ---
function DebtList({ debts, onSelectDebt, selectedDebt, onDeleteDebt }) {
  return (
    <>
      <div className="card">
        <h2>Deudas Activas</h2>
        <div className="debt-list-container">
          {debts.length > 0 ? (
            debts.map(debt => (
              <DebtItem
                key={debt.id}
                debt={debt}
                onSelectDebt={onSelectDebt}
                isSelected={selectedDebt?.id === debt.id}
                onDeleteDebt={onDeleteDebt}
              />
            ))
          ) : (
            <p>No hay deudas pendientes. ¡Felicidades!</p>
          )}
        </div>
      </div>
      <PaymentHistory debt={selectedDebt} />
    </>
  );
}

export default DebtList;

