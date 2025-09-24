import React, { useState } from 'react';
import './App.css';
import { useDeudas } from './context/DeudasContext';
import AddDebtForm from './components/AddDebtForm/AddDebtForm';
import AddPaymentForm from './components/AddPaymentForm/AddPaymentForm';
import DebtList from './components/DebtList/DebtList';

function LoginScreen() {
  const { login } = useDeudas();
  return (
    <div className="app-container login-container">
        <div className="login-box">
            <h1>Gestor de Deudas</h1>
            <p>Inicia sesión con tu cuenta de Google para guardar y sincronizar tus deudas en todos tus dispositivos.</p>
            <button onClick={login} className="login-button">
                Iniciar Sesión con Google
            </button>
        </div>
    </div>
  );
}

function App() {
  const { user, logout, deudas, addDeuda, updateDeuda, removeDeuda } = useDeudas();
  const [selectedDebt, setSelectedDebt] = useState(null);

  if (!user) {
    return <LoginScreen />;
  }

  // --- CORRECCIÓN ---
  // Esta función ahora recibe correctamente { descripcion, monto } desde el formulario.
  const handleAddDebt = (debt) => {
    // Se asegura de que el monto sea un número y de que la descripción no sea nula.
    const newDebtData = {
      descripcion: debt.descripcion || '',
      monto: Number(debt.monto) || 0,
      payments: [],
      fechaCreacion: new Date()
    };
    // Se envía el objeto ya limpio y formateado al contexto.
    addDeuda(newDebtData);
  };

  const handleAddPayment = (payment) => {
    const debtId = payment.debtId;
    const newPayment = {
      // Se asegura de que el monto del abono sea un número.
      amount: Number(payment.amount) || 0,
      date: new Date().toISOString().slice(0, 10),
      id: Date.now()
    };
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