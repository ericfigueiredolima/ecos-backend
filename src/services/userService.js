const supabase = require('../config/supabaseClient');

const userService = {
  async listarUsuarios() {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  async criarUsuario(nome) {
    const { data, error } = await supabase.from('usuarios').insert([{ nome }]).select();
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = userService;