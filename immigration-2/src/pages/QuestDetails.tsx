import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, CheckCircle } from 'lucide-react';
import { Card } from 'core/src/components/ui/Card';
import {mockQuests} from "../data/mockQuests.ts";

export function QuestDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const quest = mockQuests.find(q => q.id === id);

    if (!quest) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Quest not found</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-4 text-blue-600 hover:text-blue-700"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{quest.title}</h1>
                        <p className="text-gray-600 mt-2">{quest.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Trophy className="w-5 h-5" />
                        <span>{quest.points} points</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Steps</h2>
                    <div className="space-y-4">
                        {quest.steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full border">
                                    {step.completed ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <span className="text-sm text-gray-500">{index + 1}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}