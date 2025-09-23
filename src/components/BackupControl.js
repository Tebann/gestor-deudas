// src/components/BackupControl.js
import React from 'react';
import { useDeudas } from '../context/DeudasContext';

export default function BackupControl() {
  const { deudas, clearAll } = useDeudas();

  const exportJson = () => {
    const dataStr = JSON.stringify(deudas, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gestor-deudas-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed)) {
          // guardar directamente en localStorage (clave usada por useLocalStorage)
          window.localStorage.setItem('gestor_deudas_v1_Tebann', JSON.stringify(parsed));
          // recargar para que React lea el nuevo estado (o mejor: exponer setter para actualizar)
          window.location.reload();
        } else {
          alert('Archivo inválido: se esperaba un array JSON');
        }
      } catch {
        alert('Error al leer JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ marginTop: 12 }}>
      <button onClick={exportJson}>Exportar backup JSON</button>
      <input type="file" accept="application/json" onChange={importJson} />
      <button onClick={() => { if (confirm('Borrar todo?')) { clearAll(); } }}>Borrar todo</button>
    </div>
  );
}
