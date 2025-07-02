import express, { Request, Response } from 'express'
import { Usuario } from '../models/Usuario'

const router = express.Router()

// Crear usuario
router.post('/register', async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = new Usuario(req.body)
    const usuarioGuardado = await nuevoUsuario.save()
    res.status(201).json(usuarioGuardado)
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message })
    } else {
      res.status(400).json({ error: 'Error desconocido' })
    }
  }
})

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ msg: 'Faltan campos' })
      return
    }

    const usuario = await Usuario.findOne({ email, password })

    if (!usuario) {
      res.status(400).json({ msg: 'Email o contraseña incorrectos' })
      return
    }

    // Eliminamos password del objeto antes de enviar
    const { password: _, ...usuarioSinPassword } = usuario.toObject()
    res.status(200).json(usuarioSinPassword)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
})
// // Obtener todos los usuarios
// router.get('/', async (_req: Request, res: Response) => {
//   try {
//     const usuarios = await Usuario.find()
//     res.json(usuarios)
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(500).json({ error: err.message })
//     } else {
//       res.status(500).json({ error: 'Error desconocido' })
//     }
//   }
// })

// // Obtener usuario por ID
// router.get('/:id', async (req: Request, res: Response) => {
//   try {
//     const usuario = await Usuario.findById(req.params.id)
//     if (!usuario) {
//       return res.status(404).json({ msg: 'Usuario no encontrado' })
//     }
//     res.json(usuario)
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(400).json({ error: err.message })
//     } else {
//       res.status(400).json({ error: 'Error desconocido' })
//     }
//   }
// })

// // Actualizar usuario
// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     if (!actualizado) {
//       return res.status(404).json({ msg: 'Usuario no encontrado' })
//     }
//     res.json(actualizado)
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(400).json({ error: err.message })
//     } else {
//       res.status(400).json({ error: 'Error desconocido' })
//     }
//   }
// })

// // Eliminar usuario
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const eliminado = await Usuario.findByIdAndDelete(req.params.id)
//     if (!eliminado) {
//       return res.status(404).json({ msg: 'Usuario no encontrado' })
//     }
//     res.json({ msg: 'Usuario eliminado correctamente' })
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(400).json({ error: err.message })
//     } else {
//       res.status(400).json({ error: 'Error desconocido' })
//     }
//   }
// })

export default router
