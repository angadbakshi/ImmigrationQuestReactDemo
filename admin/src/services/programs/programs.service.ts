import {supabase} from "../../../../core";
import {ImmigrationProgram} from "../../../auth/dist/immigration-2/src/types/programs";

export const programService = {
    async getPrograms() {
        const { data, error } = await supabase.from('immigration_programs').select('*');
        if (error) throw error;
        return data;
    },

    async createProgram(program: Partial<ImmigrationProgram>) {
        const { data, error } = await supabase.from('immigration_programs').insert([program]);
        if (error) throw error;
        return data;
    },

    async updateProgram(programId: string, updates: Partial<ImmigrationProgram>) {
        const { data, error } = await supabase
            .from('immigration_programs')
            .update(updates)
            .eq('id', programId);
        if (error) throw error;
        return data;
    },

    async assignProgram(userId: string, programId: string) {
        const { data, error } = await supabase
            .from('applications')
            .insert({
                profile_id: userId,
                program_id: programId,
                status: 'assigned'
            })
            .select()
            .single();
        if (error) throw error;
        return data;
    }
};
