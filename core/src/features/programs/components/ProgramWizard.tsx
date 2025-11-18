import React from 'react';
import { ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import {ImmigrationProgram, ImmigrationStep} from "../../../../../immigration-2/src/types/programs";

interface ProgramWizardProps {
  program: ImmigrationProgram;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function ProgramWizard({ program, currentStep, onStepChange }: ProgramWizardProps) {
  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  const renderStepContent = (step: ImmigrationStep) => (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
          <p className="text-gray-600 mt-1">{step.description}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-5 h-5" />
          <span>{step.estimatedTime}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Requirements</h4>
          <ul className="space-y-2">
            {step.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Required Documents</h4>
          <ul className="space-y-2">
            {step.documents.map((doc, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
        >
          Previous Step
        </button>
        <button
          onClick={() => onStepChange(currentStep + 1)}
          disabled={currentStep === program.steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {program.steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => onStepChange(index)}
              className={`flex items-center ${
                getStepStatus(index) === 'completed' ? 'text-green-600' :
                getStepStatus(index) === 'current' ? 'text-blue-600' :
                'text-gray-400'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                  ${getStepStatus(index) === 'completed' ? 'border-green-600 bg-green-50' :
                    getStepStatus(index) === 'current' ? 'border-blue-600 bg-blue-50' :
                    'border-gray-300'
                  }`}
                >
                  {getStepStatus(index) === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="text-sm mt-2">{step.title}</span>
              </div>
            </button>
            {index < program.steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      {renderStepContent(program.steps[currentStep])}
    </div>
  );
}