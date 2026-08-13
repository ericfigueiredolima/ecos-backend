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

        // Utiliza upsert baseado na coluna 'email' para atualizar ou inserir com segurança sem duplicar
        const { data, error } = await supabase
            .from('users')
            .upsert(
                [{ name, email, role: userRole }],
                { onConflict: 'email', ignoreDuplicates: false }
            )
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