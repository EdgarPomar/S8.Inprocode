import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola desde Express con TypeScript!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


mongoose.connect('mongodb+srv://edgarmunozmanjon:URQtZCxJisJAw8Dt@backenddb.bttvajz.mongodb.net/BackendDB?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));
