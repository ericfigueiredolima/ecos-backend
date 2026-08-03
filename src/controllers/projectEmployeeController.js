const projectEmployeeService = require('../services/projectEmployeeService');

const projectEmployeeController = {
  async getLinks(req, res) {
    try {
      const links = await projectEmployeeService.getProjectEmployees();
      return res.json({ success: true, data: links });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async link(req, res) {
    try {
      const { project_id, employee_id } = req.body;
      if (!project_id || !employee_id) {
        return res.status(400).json({ success: false, error: 'project_id e employee_id são obrigatórios.' });
      }

      const newLink = await projectEmployeeService.linkEmployeeToProject(project_id, employee_id);
      return res.status(201).json({ success: true, data: newLink });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async unlink(req, res) {
    try {
      const { project_id, employee_id } = req.body;
      if (!project_id || !employee_id) {
        return res.status(400).json({ success: false, error: 'project_id e employee_id são obrigatórios.' });
      }

      await projectEmployeeService.unlinkEmployeeFromProject(project_id, employee_id);
      return res.json({ success: true, message: 'Funcionário desvinculado do projeto com sucesso.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = projectEmployeeController;