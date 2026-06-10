import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Medicos from '../pages/Medicos';
import Pacientes from '../pages/Pacientes';
import Agendamentos from '../pages/Agendamentos';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app-main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicos" element={<Medicos />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
