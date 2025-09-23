import React, { useState } from 'react';
import './App.css';
import AddDebtForm from './components/AddDebtForm/AddDebtForm';
import AddPaymentForm from './components/AddPaymentForm/AddPaymentForm';
import DebtList from './components/DebtList/DebtList';

function App() {
  const [debts, setDebts] = useState([

  ]);

  const [selectedDebt, setSelectedDebt] = useState(null);

  const handleAddDebt = (debt) => {
    setDebts([...debts, { ...debt, id: Date.now(), payments: [] }]);
  };

  const handleAddPayment = (payment) => {
    const updatedDebts = debts.map(debt => {
      if (debt.id === parseInt(payment.debtId)) {
        return {
          ...debt,
          payments: [...debt.payments, { amount: payment.amount, date: new Date().toISOString().slice(0, 10) }]
        };
      }
      return debt;
    });
    setDebts(updatedDebts);
  };

  const handleSelectDebt = (debt) => {
    setSelectedDebt(debt);
  };

  // --- NUEVA FUNCIÓN ---
  // Esta función filtrará la lista de deudas, quitando la que tenga el ID correspondiente.
  const handleDeleteDebt = (debtIdToDelete) => {
    // Si la deuda eliminada es la que está seleccionada, limpiamos la selección.
    if (selectedDebt && selectedDebt.id === debtIdToDelete) {
      setSelectedDebt(null);
    }
    setDebts(debts.filter(debt => debt.id !== debtIdToDelete));
  };
  // --------------------

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mi Gestor de Deudas</h1>
      </header>
      <main className="main-content">
        <div className="interactive-column">
          <AddDebtForm onAddDebt={handleAddDebt} />
          <AddPaymentForm debts={debts} onAddPayment={handleAddPayment} />
        </div>
        <div className="visual-column">
          {/* --- PROP NUEVA --- 
          Pasamos la nueva función al componente de la lista de deudas */}
          <DebtList
            debts={debts}
            onSelectDebt={handleSelectDebt}
            selectedDebt={selectedDebt}
            onDeleteDebt={handleDeleteDebt} 
          />
          {/* -------------------- */}
        </div>
      </main>
    </div>
  );
}

export default App;