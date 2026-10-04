import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generalRoutes from './routes/generalRoutes';
import medicoRoutes from './routes/medicoRoutes';
import turnoRoutes from './routes/turnoRoutes';
import { handleNotFound } from './controllers/generalController';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Registro de rutas
app.use('/', generalRoutes);
app.use('/medicos', medicoRoutes);
app.use('/turnos', turnoRoutes);

// Manejo de rutas inexistentes (404)
app.use(handleNotFound);

// Middleware centralizado de manejo de errores (debe ir al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor de TurnosRed escuchando en http://localhost:${PORT}`);
});