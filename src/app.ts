import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Express } from 'express';
import userRoutes from './routes/user.routes';
import planRoutes from './routes/plan.routes';
import subsRoutes from './routes/subscription.routes';
import usageRoutes from './routes/usage.routes';

const app:Express = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/subscription', subsRoutes);
app.use('/api/usage', usageRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});


export default app;