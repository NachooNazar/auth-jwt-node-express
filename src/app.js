import express from 'express';
import morgan from 'morgan';
import { createRoles } from './libs/initialState';
const app = express();

//Defino middlewares
app.use(morgan('dev'));
app.use(express.json());
createRoles();
//Defino rutas con el siguiente formato
//app.use("/api/[nombre-ruta]", [nombre-funcion])
//Ej: app.use("/api/login",userLogin)
import authController from './routes/auth.routes';
import userController from './routes/user.routes';
app.use('/api/auth', authController);
app.use('/api/users', userController);
export default app;
