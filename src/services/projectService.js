const supabase = require('../config/supabaseClient');

const projectService = {
  async listarProjects() {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  async criarProject(title, description, start_date, end_date, status) {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ title, description, start_date, end_date, status }])
      .select();
      
    if (error) throw new Error(error.message);
    return data[0];
  }
};

module.exports = projectService;