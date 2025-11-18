import React from 'react';
import { ProgramCard } from './ProgramCard';
import {ImmigrationProgram} from "../../../../../../immigration-2/src/types/programs"; // Create ProgramCard separately

interface ProgramListProps {
    programs: ImmigrationProgram[];
    onSelect: (program: ImmigrationProgram) => void;
}

export function ProgramList({ programs, onSelect }: ProgramListProps) {
    if (programs.length === 0) {
        return <div>No programs available.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => (
                <ProgramCard
                    key={program.id}
                    program={program}
                    onSelect={() => onSelect(program)}
                />
            ))}
        </div>
    );
}
