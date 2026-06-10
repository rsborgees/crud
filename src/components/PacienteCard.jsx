export default function PacienteCard({ paciente }) {
  return (
    <article className="card">
      <h3>{paciente.nome || paciente.name || 'Paciente'}</h3>
      <p>CPF: {paciente.cpf || 'N/A'}</p>
      <p>Telefone: {paciente.telefone || paciente.phone || 'Não informado'}</p>
      <p>Idade: {paciente.idade ?? paciente.age ?? 'Não informado'}</p>
    </article>
  );
}
