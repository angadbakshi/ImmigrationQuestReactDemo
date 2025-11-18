import { useParams } from 'react-router-dom';
import { mockImmigrationPrograms } from '../data/mockData';
import { Clock, DollarSign, Award, CheckCircle } from 'lucide-react';
import React from 'react';
import {ProgramWizard} from "core/src/features/programs/components/ProgramWizard";

export function ProgramDetails() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = React.useState(0);

  const program = mockImmigrationPrograms.find(p => p.id === id);

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Program Header */}
      <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{program.name}</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">{program.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${program.difficulty === 1 ? 'bg-green-100 text-green-800' :
                program.difficulty === 2 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}
            >
              {program.difficulty === 1 ? 'Easy' :
                program.difficulty === 2 ? 'Moderate' :
                'Advanced'} Process
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Processing Time</p>
              <p className="font-medium">{program.processingTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Fees</p>
              <p className="font-medium">
                ${program.fees.application + program.fees.processing + (program.fees.other || 0)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Benefits</p>
              <p className="font-medium">{program.benefits.length} Key Benefits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Program Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {program.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Program Wizard */}
      <ProgramWizard
        program={program}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
    </div>
  );
}