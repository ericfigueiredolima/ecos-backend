const supabase = require('../config/supabaseClient');

const userService = {
  async listarUsuarios() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  async criarUsuario(name, email, role = 'collaborator') {
    const emailPadrao = `${name.toLowerCase().trim().replace(/\s+/g, '.')}@ecos.com`;

    const { data, error } = await supabase
      .from('users')
      .insert([{ name: name, email: emailPadrao, role: 'collaborator' }])
      .select();
      
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = userService;