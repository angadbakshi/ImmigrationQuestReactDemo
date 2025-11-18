import {ProgramList} from "./ProgramList";
import {ProgramForm} from "./ProgramForm";
import {useEffect, useState} from "react";
import {ImmigrationProgram} from "../../../../../immigration-2/src/types/programs.ts";
import {supabase} from "../../../../../core/src/services";

export function ProgramManagement() {
    const [programs, setPrograms] = useState<ImmigrationProgram[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<ImmigrationProgram | null>(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        async function fetchPrograms() {
            try {
                setLoading(true);
                // Corrected table name
                const { data, error } = await supabase.from('immigration_programs').select('*');
                if (error) {
                    console.error('Error fetching programs:', error);
                } else {
                    console.log('Fetched programs:', data); // Debugging log
                    setPrograms(data || []);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchPrograms();
    }, []);

    const handleSaveProgram = async (program: Partial<ImmigrationProgram>) => {
        if (program.id) {
            const { error } = await supabase.from('programs').update(program).eq('id', program.id);
            if (error) console.error('Error updating program:', error);
        } else {
            const { error } = await supabase.from('programs').insert(program);
            if (error) console.error('Error adding program:', error);
        }
        setSelectedProgram(null);
        const { data } = await supabase.from('programs').select('*');
        setPrograms(data || []);
    };

    const handleDeleteProgram = async (id: string) => {
        const { error } = await supabase.from('programs').delete().eq('id', id);
        if (error) console.error('Error deleting program:', error);
        setPrograms(programs.filter((p) => p.id !== id));
    };

    if (loading) {
        return <div>Loading programs...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Program Management</h1>
            {selectedProgram ? (
                <ProgramForm
                    program={selectedProgram}
                    onSubmit={handleSaveProgram}
                    onBack={() => setSelectedProgram(null)} // Reset selection
                />
            ) : (
                <div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                        onClick={() => setSelectedProgram({} as ImmigrationProgram)}
                    >
                        Add New Program
                    </button>
                    {programs.length > 0 ? (
                        <ProgramList
                            programs={programs}
                            onSelect={(program) => setSelectedProgram(program)}
                        />
                    ) : (
                        <div>No programs found. Use the "Add Program" button to create one.</div>
                    )}
                </div>
            )}
        </div>
    );
}
