import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section>
      <h1 className="page-title">Sistema de Clínica</h1>
      <p className="page-description">
        Use este painel para gerenciar médicos, pacientes e agendamentos.
      </p>
      <div className="card-grid">
        <div className="card">
          <h3>Médicos</h3>
          <p>Veja a lista de médicos cadastrados e acesse informações de contato.</p>
          <Link to="/medicos">Abrir médicos</Link>
        </div>
        <div className="card">
          <h3>Pacientes</h3>
          <p>Gerencie pacientes, histórico e dados pessoais.</p>
          <Link to="/pacientes">Abrir pacientes</Link>
        </div>
        <div className="card">
          <h3>Agendamentos</h3>
          <p>Visualize horários disponíveis e consultas agendadas.</p>
          <Link to="/agendamentos">Abrir agendamentos</Link>
        </div>
      </div>
    </section>
  );
}
