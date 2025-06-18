import Card from './components/Card';
import { ViajesProvider } from './contexts/viajeContext';
// import FormViaje from './components/FormViaje';
function App() {


  return (
    <ViajesProvider>
      <div className="p-8 bg-light min-vh-100">
        <div className="d-flex justify-content-center align-items-center mb-4">
          <h1 className="h3 fw-bold text-center ">Mis Viajes</h1>
          
        </div>
        <Card />
      </div>
    </ViajesProvider>
  );
}

export default App;
