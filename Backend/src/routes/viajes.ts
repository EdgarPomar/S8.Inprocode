import express, { Request, Response } from 'express';
import Viaje, { IViaje } from '../models/Viaje';

const router = express.Router();

// Crear
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoViaje = new Viaje(req.body as IViaje); // 👈 Se especifica tipo
    const viajeGuardado = await nuevoViaje.save();
    res.status(201).json(viajeGuardado);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Leer todos
router.get('/', async (_req: Request, res: Response) => {
  const viajes = await Viaje.find();
  res.json(viajes);
});

// Leer uno
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const viaje = await Viaje.findById(req.params.id);
    if (!viaje) res.status(404).json({ mensaje: 'Viaje no encontrado' });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Actualizar
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const viajeActualizado = await Viaje.findByIdAndUpdate(req.params.id, req.body as IViaje, { new: true });
    if (!viajeActualizado)  res.status(404).json({ mensaje: 'Viaje no encontrado' });
    res.json(viajeActualizado);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Eliminar
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const viajeEliminado = await Viaje.findByIdAndDelete(req.params.id);
    if (!viajeEliminado) res.status(404).json({ mensaje: 'Viaje no encontrado' });
    res.json({ mensaje: 'Viaje eliminado' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
