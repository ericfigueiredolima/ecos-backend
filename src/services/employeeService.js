const supabase = require('../config/supabaseClient');

const employeeService = {
    async getAllEmployees() {
        const { data, error } = await supabase.from('employees').select('*');
        if (error) throw new Error(error.message);
        return data;
    },

    async createEmployee(full_name, email, phone, position) {
        const { data, error } = await supabase
            .from('employees')
            .insert([{ full_name, email, phone, position }])
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async updateEmployee(id, full_name, email, phone, position) {
        const { data, error } = await supabase
            .from('employees')
            .update({ full_name, email, phone, position })
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async deleteEmployee(id) {
        const { error } = await supabase
            .from('employees')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }
};

module.exports = employeeService;