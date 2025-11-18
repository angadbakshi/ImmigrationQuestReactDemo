import React from 'react';
import {ImmigrationProgram} from "../../../../../../immigration-2/src/types/programs";

interface ProgramCardProps {
    program: ImmigrationProgram;
    onSelect: () => void;
}

export function ProgramCard({ program, onSelect }: ProgramCardProps) {
    return (
        <div
            className="border rounded p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={onSelect}
        >
            <h3 className="font-bold">{program.name}</h3>
            <p>{program.description}</p>
            <p className="text-sm text-gray-500">Type: {program.type}</p>
        </div>
    );
}
