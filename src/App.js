import React, { useState } from 'react';
import './App.css';
import AddDebtForm from './components/AddDebtForm/AddDebtForm';
import AddPaymentForm from './components/AddPaymentForm/AddPaymentForm';
import DebtList from './components/DebtList/DebtList';
import { useDeudas } from './context/DeudasContext'; // 👈 1. IMPORTAMOS EL HOOK

function App() {
  // 🔽 2. OBTENEMOS TODO DEL CONTEXTO
  const { deudas, addDeuda, removeDeuda, updateDeuda } = useDeudas();

  // El estado para saber qué deuda está seleccionada puede seguir siendo local.
  const [selectedDebt, setSelectedDebt] = useState(null);

  // 🔽 3. ADAPTAMOS LAS FUNCIONES PARA QUE USEN EL CONTEXTO
  const handleAddDebt = (debt) => {
    // Le añadimos la propiedad 'payments' vacía que tu lógica esperaba.
    addDeuda({ ...debt, payments: [] });
  };

  const handleAddPayment = (payment) => {
    const debtId = parseInt(payment.debtId);
    const targetDebt = deudas.find(d => d.id === debtId);

    if (targetDebt) {
      const newPayment = {
        amount: payment.amount,
        date: new Date().toISOString().slice(0, 10)
      };
      // Usamos 'updateDeuda' para actualizar los pagos de la deuda correcta.
      updateDeuda(debtId, { payments: [...targetDebt.payments, newPayment] });
    }
  };

  const handleDeleteDebt = (debtIdToDelete) => {
    if (selectedDebt && selectedDebt.id === debtIdToDelete) {
      setSelectedDebt(null);
    }
    // Llamamos a la función del contexto.
    removeDeuda(debtIdToDelete);
  };

  const handleSelectDebt = (debt) => {
    setSelectedDebt(debt);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mi Gestor de Deudas</h1>
      </header>
      <main className="main-content">
        <div className="interactive-column">
          {/* Los componentes ahora usan las nuevas funciones */}
          <AddDebtForm onAddDebt={handleAddDebt} />
          <AddPaymentForm debts={deudas} onAddPayment={handleAddPayment} />
        </div>
        <div className="visual-column">
          <DebtList
            debts={deudas}
            onSelectDebt={handleSelectDebt}
            selectedDebt={selectedDebt}
            onDeleteDebt={handleDeleteDebt}
          />
        </div>
      </main>
    </div>
  );
}

export default App;