import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://edgarmunozmanjon:URQtZCxJisJAw8Dt@backenddb.bttvajz.mongodb.net/BackendDB?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};
