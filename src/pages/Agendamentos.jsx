import { useEffect, useState } from 'react';
import { getAgendamentos } from '../services/agendamentoService';
import AgendamentoCard from '../components/AgendamentoCard';

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgendamentos()
      .then((data) => setAgendamentos(data || []))
      .catch(() => setAgendamentos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1 className="page-title">Agendamentos</h1>
      <p className="page-description">Confira os agendamentos da clínica.</p>
      {loading ? (
        <div className="empty-state">Carregando agendamentos...</div>
      ) : agendamentos.length === 0 ? (
        <div className="empty-state">Nenhum agendamento encontrado.</div>
      ) : (
        <div className="card-grid">
          {agendamentos.map((agendamento) => (
            <AgendamentoCard key={agendamento.id ?? agendamento._id ?? `${agendamento.paciente}-${agendamento.data}`} agendamento={agendamento} />
          ))}
        </div>
      )}
    </section>
  );
}
