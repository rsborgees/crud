import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Início</Link>
      <Link to="/medicos">Médicos</Link>
      <Link to="/pacientes">Pacientes</Link>
      <Link to="/agendamentos">Agendamentos</Link>
    </nav>
  );
}
