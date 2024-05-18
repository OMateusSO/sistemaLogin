import express from 'express';
import mongoose from 'mongoose';
import User from '@/models/User';  // Supondo que seu arquivo de modelo de usuário é userModel.js


const app = express();
const port = 3000;

// Conecte ao MongoDB
mongoose.connect('mongodb+srv://Adm:ziqYd3V4W3H9S6EN@cluster0.y34kq8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(express.json());  // Para parsear JSON no body da requisição

// Defina uma rota para obter o nome do usuário a partir do email
app.post('/user/nome', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ nome: user.nome });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});