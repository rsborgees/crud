export default function MedicoCard({ medico }) {
  return (
    <article className="card">
      <h3>{medico.nome || medico.name || 'Médico'}</h3>
      <p>CRM: {medico.crm || 'N/A'}</p>
      <p>Especialidade: {medico.especialidade || medico.specialty || 'Não informado'}</p>
      <p>Email: {medico.email || 'Não informado'}</p>
    </article>
  );
}
