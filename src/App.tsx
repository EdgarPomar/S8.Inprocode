import Card from "./components/Card"
import FormViaje from "./components/FormViaje"


function App() {
  
  return (
    <div style={{ padding: '2rem' }}>
      <FormViaje/>
      <h1>Mis Viajes</h1>
      <Card />
    </div>
  )
}

export default App
