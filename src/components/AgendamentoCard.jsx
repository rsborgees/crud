export default function AgendamentoCard({ agendamento }) {
  return (
    <article className="card">
      <h3>{agendamento.servico || agendamento.service || 'Agendamento'}</h3>
      <p>Paciente: {agendamento.paciente || agendamento.patient || 'Não informado'}</p>
      <p>Médico: {agendamento.medico || agendamento.doctor || 'Não informado'}</p>
      <p>Data: {agendamento.data || agendamento.date || 'Não informado'}</p>
    </article>
  );
}
