const projectEmployeeService = require('../services/projectEmployeeService');

const projectEmployeeController = {
  async getAssociacoes(req, res) {
    try {
      const associacoes = await projectEmployeeService.listarAssociacoes();
      return res.json({ success: true, data: associacoes });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async createAssociacao(req, res) {
    try {
      const { project_id, employee_id } = req.body;
      if (!project_id || !employee_id) {
        return res.status(400).json({ success: false, error: 'Os campos project_id e employee_id são obrigatórios.' });
      }
      const novaAssociacao = await projectEmployeeService.criarAssociacao(project_id, employee_id);
      return res.status(201).json({ success: true, data: novaAssociacao });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = projectEmployeeController;