const supabase = require('../config/supabaseClient');

const projectService = {
    async getAllProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                project_employees (
                    employee_id,
                    employees (id, full_name, position)
                ),
                project_users (
                    user_id,
                    users (id, name, email, role)
                )
            `);
        if (error) throw new Error(error.message);
        
        // Mapeia para facilitar o uso no front-end retornando ambos os arrays
        return data.map(project => ({
            ...project,
            employees: project.project_employees?.map(pe => pe.employees) || [],
            users: project.project_users?.map(pu => pu.users) || []
        }));
    },

    async createProject(title, description, status, start_date, end_date, employee_ids = [], user_ids = []) {
        const { data, error } = await supabase
            .from('projects')
            .insert([{ title, description, status, start_date, end_date }])
            .select();

        if (error) throw new Error(error.message);
        const newProject = data[0];

        // Insere vínculos de funcionários, se houver
        if (employee_ids && employee_ids.length > 0) {
            const empRelations = employee_ids.map(empId => ({
                project_id: newProject.id,
                employee_id: empId
            }));
            await supabase.from('project_employees').insert(empRelations);
        }

        // Insere vínculos de usuários, se houver
        if (user_ids && user_ids.length > 0) {
            const userRelations = user_ids.map(userId => ({
                project_id: newProject.id,
                user_id: userId
            }));
            await supabase.from('project_users').insert(userRelations);
        }

        return newProject;
    },

    async updateProject(id, title, description, status, start_date, end_date, employee_ids = [], user_ids = []) {
        const { data, error } = await supabase
            .from('projects')
            .update({ title, description, status, start_date, end_date })
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        const updatedProject = data[0];

        // Atualiza vínculos de funcionários (remove antigos e insere novos)
        await supabase.from('project_employees').delete().eq('project_id', id);
        if (employee_ids && employee_ids.length > 0) {
            const empRelations = employee_ids.map(empId => ({
                project_id: id,
                employee_id: empId
            }));
            await supabase.from('project_employees').insert(empRelations);
        }

        // Atualiza vínculos de usuários (remove antigos e insere novos)
        await supabase.from('project_users').delete().eq('project_id', id);
        if (user_ids && user_ids.length > 0) {
            const userRelations = user_ids.map(userId => ({
                project_id: id,
                user_id: userId
            }));
            await supabase.from('project_users').insert(userRelations);
        }

        return updatedProject;
    },

    async deleteProject(id) {
        // Remove os vínculos primeiro por causa da chave estrangeira
        await supabase.from('project_employees').delete().eq('project_id', id);
        await supabase.from('project_users').delete().eq('project_id', id);
        
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }
};

module.exports = projectService;