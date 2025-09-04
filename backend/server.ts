import express from 'express';
import cors from 'cors';
import nodeRoutes from './routes/node';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', nodeRoutes);

app.listen(3001, () => console.log('Server on :3001'));