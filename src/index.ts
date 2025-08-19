import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import { errorHandler } from './middleware/error-handler';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

export default app;
