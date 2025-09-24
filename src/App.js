import React, { useState } from 'react';
import './App.css';
import { useDeudas } from './context/DeudasContext';
import AddDebtForm from './components/AddDebtForm/AddDebtForm';
import AddPaymentForm from './components/AddPaymentForm/AddPaymentForm';
import DebtList from './components/DebtList/DebtList';

// Componente separado para la pantalla de Login
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

// Componente principal de la aplicación
function App() {
  const { user, logout, deudas, addDeuda, updateDeuda, removeDeuda } = useDeudas();
  const [selectedDebt, setSelectedDebt] = useState(null);

  // Si no hay usuario, muestra la pantalla de login
  if (!user) {
    return <LoginScreen />;
  }

  // --- Lógica de Manejadores (ahora usan las funciones del contexto) ---
  const handleAddDebt = (debt) => {
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
      updateDeuda(debtId, { payments: [...targetDebt.payments, newPayment] });
    }
  };

  const handleDeleteDebt = (debtIdToDelete) => {
    if (selectedDebt && selectedDebt.id === debtIdToDelete) {
      setSelectedDebt(null);
    }
    removeDeuda(debtIdToDelete);
  };

  // Si hay usuario, muestra la app normal
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