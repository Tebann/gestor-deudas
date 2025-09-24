import React, { useState } from 'react';
import './App.css';
import { useDeudas } from './context/DeudasContext';
import AddDebtForm from './components/AddDebtForm/AddDebtForm';
import AddPaymentForm from './components/AddPaymentForm/AddPaymentForm';
import DebtList from './components/DebtList/DebtList';

function LoginScreen() { /* ...código sin cambios... */ }

function App() {
  const { user, logout, deudas, addDeuda, updateDeuda, removeDeuda } = useDeudas();
  const [selectedDebt, setSelectedDebt] = useState(null);

  if (!user) {
    return <LoginScreen />;
  }

  const handleAddDebt = (debt) => {
    addDeuda({ ...debt, payments: [] });
  };

  // 3. LA CORRECCIÓN MÁS IMPORTANTE ESTÁ AQUÍ
  const handleAddPayment = (payment) => {
    // Quitamos parseInt. El ID de la deuda ahora es un string.
    const debtId = payment.debtId; 

    const newPayment = {
      amount: payment.amount,
      date: new Date().toISOString().slice(0, 10),
      id: Date.now() // Un ID simple para el pago en sí
    };

    // Pasamos el ID (string) y el objeto del nuevo pago directamente
    // a la función del contexto. No necesitamos buscar la deuda aquí.
    updateDeuda(debtId, newPayment);
  };

  const handleDeleteDebt = (debtIdToDelete) => {
    if (selectedDebt && selectedDebt.id === debtIdToDelete) {
      setSelectedDebt(null);
    }
    removeDeuda(debtIdToDelete);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mi Gestor de Deudas</h1>
        <div className="user-info">
            <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
            <span>{user.displayName}</span>
            <button onClick={logout} className="logout-button">Cerrar Sesión</button>
        </div>
      </header>
      <main className="main-content">
        <div className="interactive-column">
          <AddDebtForm onAddDebt={handleAddDebt} />
          <AddPaymentForm debts={deudas} onAddPayment={handleAddPayment} />
        </div>
        <div className="visual-column">
          <DebtList
            debts={deudas}
            onSelectDebt={setSelectedDebt}
            selectedDebt={selectedDebt}
            onDeleteDebt={handleDeleteDebt}
          />
        </div>
      </main>
    </div>
  );
}

export default App;