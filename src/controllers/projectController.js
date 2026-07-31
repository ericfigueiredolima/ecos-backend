const projectService = require('../services/projectService');

const projectController = {
  async getProjects(req, res) {
    try {
      const projects = await projectService.listarProjects();
      return res.json({ success: true, data: projects });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async createProject(req, res) {
    try {
      const { title, description, start_date, end_date, status } = req.body;
      if (!title) {
        return res.status(400).json({ success: false, error: 'O campo title é obrigatório.' });
      }
      const novoProject = await projectService.criarProject(title, description, start_date, end_date, status);
      return res.status(201).json({ success: true, data: novoProject });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = projectController;