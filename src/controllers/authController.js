const authService = require('../services/authService');

const authController = {
  async googleLogin(req, res) {
    try {
      const { email, full_name } = req.body;

      if (!email) {
        return res.status(400).json({ success: false, error: 'O campo email é obrigatório.' });
      }

      const user = await authService.syncUser(email, full_name);
      return res.json({ success: true, data: user });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = authController;