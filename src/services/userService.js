const supabase = require('../config/supabaseClient');

const userService = {
    async getAllUsers() {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw new Error(error.message);
        return data;
    },

    async createUser(name, email, role) {
        // 1. Verifica se o usuário já existe no banco
        const { data: existingUser, error: findError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (findError) throw new Error(findError.message);

        // 2. Se o usuário já existe, NÃO alteramos o role dele (protegendo o admin)
        if (existingUser) {
            return existingUser;
        }

        // 3. Se for um usuário novo, criamos com o papel padrão ou o enviado
        const userRole = role || 'não autorizado';
        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email, role: userRole }])
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async updateUser(id, name, email, role) {
        const { data, error } = await supabase
            .from('users')
            .update({ name, email, role })
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async deleteUser(id) {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }
};

module.exports = userService;