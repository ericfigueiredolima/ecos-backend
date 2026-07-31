const userService = require('../services/userService');

const userController = {
  async getUsuarios(req, res) {
    try {
      const usuarios = await userService.listarUsuarios();
      return res.json({ success: true, data: usuarios });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async createUsuario(req, res) {
    try {
      const nome = req.body.nome || req.body.name;
      if (!nome) {
        return res.status(400).json({ success: false, error: 'O campo nome é obrigatório.' });
      }
      const novoUsuario = await userService.criarUsuario(nome);
      return res.status(201).json({ success: true, data: novoUsuario });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = userController;