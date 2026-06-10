import { useEffect, useState } from 'react';
import { getMedicos } from '../services/medicoService';
import MedicoCard from '../components/MedicoCard';

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMedicos()
      .then((data) => setMedicos(data || []))
      .catch(() => setMedicos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1 className="page-title">Médicos</h1>
      <p className="page-description">Lista de médicos cadastrados na clínica.</p>
      {loading ? (
        <div className="empty-state">Carregando médicos...</div>
      ) : medicos.length === 0 ? (
        <div className="empty-state">Nenhum médico encontrado.</div>
      ) : (
        <div className="card-grid">
          {medicos.map((medico) => (
            <MedicoCard key={medico.id ?? medico._id ?? medico.crm} medico={medico} />
          ))}
        </div>
      )}
    </section>
  );
}
