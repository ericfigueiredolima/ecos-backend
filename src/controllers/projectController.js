const projectService = require('../services/projectService');

const projectController = {
  async getProjects(req, res) {
    try {
      const projects = await projectService.getAllProjects();
      return res.json({ success: true, data: projects });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async createProject(req, res) {
    try {
      const { title, description, status, start_date } = req.body;
      if (!title) {
        return res.status(400).json({ success: false, error: 'O campo title é obrigatório.' });
      }
      const newProject = await projectService.createProject(title, description, status, start_date);
      return res.status(201).json({ success: true, data: newProject });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateProject(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status, start_date } = req.body;
      
      const updatedProject = await projectService.updateProject(id, title, description, status, start_date);
      
      if (!updatedProject) {
        return res.status(404).json({ success: false, error: 'Projeto não encontrado.' });
      }

      return res.json({ success: true, data: updatedProject });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      await projectService.deleteProject(id);
      return res.json({ success: true, message: 'Projeto deletado com sucesso.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = projectController;