import React from 'react';
import {Badge, Card} from "../../../components";
import {ImmigrationProgram} from "../../../../../immigration-2/src/types/programs";
import {mockImmigrationPrograms} from "../../../../../immigration-2/src/data/mockImmigrationPrograms";

interface ProgramSelectorProps {
  currentProgram?: ImmigrationProgram|null;
  onAssign: (programId: string) => void;
}

export function ProgramSelector({ currentProgram, onAssign }: ProgramSelectorProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Immigration Program</h3>
      <div className="space-y-4">
        {mockImmigrationPrograms.map((program) => (
          <div
            key={program.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors
              ${program.id === currentProgram?.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
              }`}
            onClick={() => onAssign(program.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{program.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{program.description}</p>
              </div>
              <Badge variant={program.type === 'work' ? 'success' : 'default'}>
                {program.type}
              </Badge>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Processing time: {program.estimatedTimeframe}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}