const supabase = require('../config/supabaseClient');

const projectEmployeeService = {
  async listarAssociacoes() {
    const { data, error } = await supabase
      .from('project_employees')
      .select(`
        id,
        project_id,
        employee_id,
        projects (title),
        employees (full_name, position)
      `);
      
    if (error) throw new Error(error.message);
    return data;
  },

  async criarAssociacao(project_id, employee_id) {
    const { data, error } = await supabase
      .from('project_employees')
      .insert([{ project_id, employee_id }])
      .select();
      
    if (error) throw new Error(error.message);
    return data[0];
  }
};

module.exports = projectEmployeeService;