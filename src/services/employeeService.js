const supabase = require('../config/supabaseClient');

const employeeService = {
  async listarEmployees() {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  async criarEmployee(full_name, email, phone, position) {
    const { data, error } = await supabase
      .from('employees')
      .insert([{ full_name, email, phone, position }])
      .select();
      
    if (error) throw new Error(error.message);
    return data[0];
  }
};

module.exports = employeeService;