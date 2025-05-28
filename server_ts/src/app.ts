import express from 'express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import logger from './logging/logger';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/usersRoutes';


const app = express();
const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json', 'utf8'));
// const morganLogStream = fs.createWriteStream('logs/morgan.log', { flags: 'a' });

app.use(express.json());
app.use(morgan('combined', { 
  // stream: { write: (message) => logger.http((message).trim()) },
  stream: { write: (message) => logger.warn('NOT_REAL_WARN_FROM_MORGAN_' + (message).trim()) },
  // stream: morganLogStream,
}));
app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
