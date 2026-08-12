const supabase = require('../config/supabaseClient');

const projectService = {
    async getAllProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                project_employees (
                    employee_id,
                    employees (id, full_name)
                )
            `);
        if (error) throw new Error(error.message);
        
        // Mapeia para facilitar o uso no front-end
        return data.map(project => ({
            ...project,
            employees: project.project_employees?.map(pe => pe.employees) || []
        }));
    },

    async createProject(title, description, status, start_date, end_date, employee_ids = []) {
        const { data, error } = await supabase
            .from('projects')
            .insert([{ title, description, status, start_date, end_date }])
            .select();

        if (error) throw new Error(error.message);
        const newProject = data[0];

        // Se houver funcionários selecionados, cria os vínculos
        if (employee_ids && employee_ids.length > 0) {
            const relations = employee_ids.map(empId => ({
                project_id: newProject.id,
                employee_id: empId
            }));
            await supabase.from('project_employees').insert(relations);
        }

        return newProject;
    },

    async updateProject(id, title, description, status, start_date, end_date, employee_ids = []) {
        const { data, error } = await supabase
            .from('projects')
            .update({ title, description, status, start_date, end_date })
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        const updatedProject = data[0];

        // Atualiza os vínculos: remove os antigos e insere os novos selecionados
        await supabase.from('project_employees').delete().eq('project_id', id);

        if (employee_ids && employee_ids.length > 0) {
            const relations = employee_ids.map(empId => ({
                project_id: id,
                employee_id: empId
            }));
            await supabase.from('project_employees').insert(relations);
        }

        return updatedProject;
    },

    async deleteProject(id) {
        // Remove os vínculos primeiro por causa da chave estrangeira
        await supabase.from('project_employees').delete().eq('project_id', id);
        
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }
};

module.exports = projectService;