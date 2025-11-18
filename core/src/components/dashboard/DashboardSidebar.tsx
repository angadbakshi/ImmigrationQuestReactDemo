import React from 'react';
import { useNavigate } from 'react-router-dom';
import {mockImmigrationPrograms} from "../../../../immigration-2/src/data/mockImmigrationPrograms";
import {ImmigrationProgram} from "../../../../immigration-2/src/types/programs";
import {mockUserProfile} from "../../../../immigration-2/src/data/mockUserProfile";
import {ProgramCard} from "../../features/programs";

export function DashboardSidebar() {
    const navigate = useNavigate();
    const [selectedProgram, setSelectedProgram] = React.useState(mockUserProfile.immigrationProgram);

    const handleSelectProgram = (program: ImmigrationProgram) => {
        setSelectedProgram(program);
        navigate(`/programs/${program.id}`);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Immigration Programs</h2>
            <div className="space-y-4">
                {mockImmigrationPrograms.map(program => (
                    <ProgramCard
                        key={program.id}
                        program={program}
                        onSelect={handleSelectProgram}
                        isSelected={selectedProgram.id === program.id}
                    />
                ))}
            </div>
        </div>
    );
}