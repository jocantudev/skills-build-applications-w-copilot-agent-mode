import express from 'express';
import cors from 'cors';
import db from './config/database';

const app = express();
const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.get('/api/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

app.listen(port, () => {
  console.log(`Server running at ${baseUrl}`);
});

export default app;
