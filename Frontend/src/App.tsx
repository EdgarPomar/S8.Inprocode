import Card from './components/Card';
import ResponsiveAppBar from './components/SearchNavbar';
import { ViajesProvider } from './contexts/viajeContext';
import CalendarPage from './pages/CalendarPage';
// import FormViaje from './components/FormViaje';
function App() {


  return (
    <ViajesProvider>
      <div className="p-8 bg-light min-vh-100">
          <ResponsiveAppBar/>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <h1 className="h3 fw-bold text-center pt-4">Mis Viajes</h1>
        </div>
        <Card />
        <CalendarPage/>
      </div>
    </ViajesProvider>
  );
}

export default App;
