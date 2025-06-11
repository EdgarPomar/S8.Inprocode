import FormViaje from './components/FormViaje';
import Card from './components/Card';
import { ViajesProvider } from './contexts/viajeContext';


function App() {
  return (
    <ViajesProvider>
      <div className="p-8 bg-gray-100 min-h-screen">
        <FormViaje />
        <h1 className="text-2xl font-bold mt-8 mb-4">Mis Viajes</h1>
        <Card />
      </div>
    </ViajesProvider>
  );
}

export default App;