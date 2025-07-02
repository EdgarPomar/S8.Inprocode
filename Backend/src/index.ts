import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import viajesRoutes from './routes/viajes'; // ✅ importa tus rutas
import usuariosRoutes from './routes/usuarios'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // ✅ habilita CORS
app.use(express.json()); // ✅ permite recibir JSON

app.use('/api/viajes', viajesRoutes); // ✅ monta las rutas AQUÍ
app.use('/api/usuarios', usuariosRoutes) // ✅ NUEVA RUTA


app.get('/', (req, res) => {
  res.send('¡Hola desde Express con TypeScript!');
});

app.listen(port, async () => {
  await connectDB(); // conecta con MongoDB
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
