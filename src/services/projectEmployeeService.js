const supabase = require('../config/supabaseClient');

const projectEmployeeService = {
    // Listar todos os vínculos (ou funcionários por projeto)
    async getProjectEmployees() {
        const { data, error } = await supabase
            .from('project_employees') // Ajuste o nome da tabela intermediária se necessário
            .select(`
                *,
                project:projects(*),
                employee:employees(*)
            `);

        if (error) throw new Error(error.message);
        return data;
    },

    // Vincular funcionário a um projeto
    async linkEmployeeToProject(project_id, employee_id) {
        const { data, error } = await supabase
            .from('project_employees')
            .insert([{ project_id, employee_id }])
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    // Desvincular funcionário de um projeto
    async unlinkEmployeeFromProject(project_id, employee_id) {
        const { error } = await supabase
            .from('project_employees')
            .delete()
            .match({ project_id, employee_id });

        if (error) throw new Error(error.message);
        return true;
    }
};

module.exports = projectEmployeeService;