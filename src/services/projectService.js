const supabase = require('../config/supabaseClient');

const projectService = {
    async getAllProjects() {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) throw new Error(error.message);
        return data;
    },

    async createProject(title, description, status, start_date) {
        const { data, error } = await supabase
            .from('projects')
            .insert([{ title, description, status, start_date }])
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async updateProject(id, title, description, status, start_date) {
        const { data, error } = await supabase
            .from('projects')
            .update({ title, description, status, start_date })
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    async deleteProject(id) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }
};

module.exports = projectService;