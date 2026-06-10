export default function PacienteCard({ paciente, onDelete }) {
  return (
    <article className="card">
      <h3>{paciente.nome || paciente.name || 'Paciente'}</h3>
      <p>Email: {paciente.email || 'Não informado'}</p>
      <p>Telefone: {paciente.telefone || paciente.phone || 'Não informado'}</p>
      <p>Data de nascimento: {paciente.data_nascimento || paciente.birthDate || 'Não informado'}</p>
      <div style={{ marginTop: 8 }}>
        <button
          className="button-secondary"
          onClick={async () => {
            if (confirm(`Excluir paciente ${paciente.nome}?`)) {
              try {
                await onDelete?.(paciente.id);
              } catch (e) {
                // noop
              }
            }
          }}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
