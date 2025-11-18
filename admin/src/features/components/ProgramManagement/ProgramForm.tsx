import React, { useState } from 'react';
import { ImmigrationProgram } from "../../../../../../immigration-2/src/types/programs";

interface ProgramFormProps {
    program?: ImmigrationProgram;
    onSubmit: (program: Partial<ImmigrationProgram>) => void;
    onBack?: () => void; // Added optional onBack prop for navigation
}

export function ProgramForm({ program, onSubmit, onBack }: ProgramFormProps) {
    const [formData, setFormData] = useState<Partial<ImmigrationProgram>>(program || {
        id: '',
        name: '',
        type: 'work',
        description: '',
        requirements: [],
        estimatedTimeframe: '',
        difficulty: 1,
        steps: [],
        eligibilityPoints: 0,
        processingTime: '',
        fees: {
            application: 0,
            processing: 0,
            other: 0,
        },
        benefits: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    const programTypes: ImmigrationProgram['type'][] = [
        'work',
        'study',
        'family',
        'permanent',
        'startup',
        'investor',
        'business',
    ];
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">
                {program ? 'Edit Immigration Program' : 'Add Immigration Program'}
            </h1>

            {/* Optional Back Button */}
            {onBack && (
                <button
                    type="button"
                    className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
                    onClick={onBack}
                >
                    Back to Program List
                </button>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        required
                    />
                </div>

                {/* Type Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        value={formData.type}
                        onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value as ImmigrationProgram['type'] })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {programTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Estimated Timeframe */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Estimated Timeframe
                    </label>
                    <input
                        type="text"
                        value={formData.estimatedTimeframe}
                        onChange={(e) =>
                            setFormData({...formData, estimatedTimeframe: e.target.value})
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {program ? 'Update Program' : 'Add Program'}
                </button>
            </form>
        </div>
    );
}
