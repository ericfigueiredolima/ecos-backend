const employeeService = require('../services/employeeService');

const employeeController = {
  async getEmployees(req, res) {
    try {
      const employees = await employeeService.getAllEmployees();
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
      const newEmployee = await employeeService.createEmployee(full_name, email, phone, position);
      return res.status(201).json({ success: true, data: newEmployee });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const { full_name, email, phone, position } = req.body;
      
      const updatedEmployee = await employeeService.updateEmployee(id, full_name, email, phone, position);
      
      if (!updatedEmployee) {
        return res.status(404).json({ success: false, error: 'Funcionário não encontrado.' });
      }

      return res.json({ success: true, data: updatedEmployee });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      await employeeService.deleteEmployee(id);
      return res.json({ success: true, message: 'Funcionário deletado com sucesso.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = employeeController;