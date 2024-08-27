const express = require('express');
const router = express.Router();
const userModel = require('../model/modelo.js');

// Ruta para crear un usuario
router.post('/users', async (req, res) => {
  const { username, password } = req.body;
  await userModel.createUser(username, password);
  res.send('User created');
});

// Ruta para obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
  const user = await userModel.getUserById(req.params.id);
  res.json(user);
});

// Ruta para actualizar un usuario por ID
router.put('/users/:id', async (req, res) => {
  const { username, password } = req.body;
  await userModel.updateUser(req.params.id, username, password);
  res.send('User updated');
});

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', async (req, res) => {
  await userModel.deleteUser(req.params.id);
  res.send('User deleted');
});

module.exports = router;

