const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota raiz de boas-vindas
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do ECOS!' });
});

// Usando as rotas de usuários
app.use('/api', userRoutes);
app.use('/api', employeeRoutes);
app.use('/api', projectRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});