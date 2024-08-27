const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Conexión a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Función para crear un nuevo usuario
async function createUser(username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  return result;
}

// Función para obtener un usuario por ID
async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

// Función para actualizar un usuario
async function updateUser(id, username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = await pool.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, hashedPassword, id]);
  return result;
}

// Función para eliminar un usuario
async function deleteUser(id) {
  const result = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
