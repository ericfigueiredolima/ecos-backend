const userService = require('../services/userService');

const userController = {
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.json({ success: true, data: users });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email, role } = req.body;
      if (!name || !email) {
        return res.status(400).json({ success: false, error: 'Os campos name e email são obrigatórios.' });
      }
      const newUser = await userService.createUser(name, email, role);
      return res.status(201).json({ success: true, data: newUser });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
      
      const updatedUser = await userService.updateUser(id, name, email, role);
      
      if (!updatedUser) {
        return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
      }

      return res.json({ success: true, data: updatedUser });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.json({ success: true, message: 'Usuário deletado com sucesso.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = userController;