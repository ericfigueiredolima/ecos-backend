const supabase = require('../config/supabaseClient');

const authService = {
  async syncUser(email, full_name) {
    // Verifica se o usuário já existe
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return existingUser;
    }

    // Se não existir, cadastra automaticamente como collaborator
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ email, full_name, role: 'collaborator' }])
      .select()
      .single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    return newUser;
  }
};

module.exports = authService;