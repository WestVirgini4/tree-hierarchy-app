import express from 'express';
import cors from 'cors';
import nodeRoutes from './routes/node';

const app = express();
app.use(cors());
app.use(express.json());
// Homepage
app.get('/', (req, res) => {
  res.json({ message: 'Tree Hierarchy API', status: 'running' });
});

app.use('/', nodeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on :${PORT}`));