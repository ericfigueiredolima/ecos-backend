const employeeService = require('../services/employeeService');

const employeeController = {
  async getEmployees(req, res) {
    try {
      const employees = await employeeService.listarEmployees();
      return res.json({ success: true, data: employees });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async createEmployee(req, res) {
    try {
      const { full_name, email, phone, position } = req.body;
      if (!full_name) {
        return res.status(400).json({ success: false, error: 'O campo full_name é obrigatório.' });
      }
      const novoEmployee = await employeeService.criarEmployee(full_name, email, phone, position);
      return res.status(201).json({ success: true, data: novoEmployee });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = employeeController;