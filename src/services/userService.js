const supabase = require('../config/supabaseClient');

const userService = {
    async getAllUsers() {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw new Error(error.message);
        return data;
    },

    async createUser(name, email, role) {
        // Regra de segurança: se for o seu e-mail principal, força o papel de admin
        const userRole = email === 'ericfigueiredolima@gmail.com' ? 'admin' : (role || 'não autorizado');

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