import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDropdown } from '../ui/UserDropdown';
import {UserProfileCard} from "../../features/profile";
import {UserProgress} from "../../features/progress";
import {QuestList} from "../../features/quests";
import {mockQuests} from "../../../../immigration-2/src/data/mockQuests";
import {Quest} from "../../../../immigration-2/src/types/quests";


export function DashboardMain() {
    const navigate = useNavigate();
    const [quests] = useState(mockQuests);

    const handleSelectQuest = (quest: Quest) => {
        navigate(`/quests/${quest.id}`);
    };

    return (
        <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
                <ErrorBoundary fallback={<div>Error loading profile</div>}>
                    <UserProfileCard />
                </ErrorBoundary>
                {/*<UserDropdown />*/}
            </div>

            <ErrorBoundary fallback={<div>Error loading progress</div>}>
                <UserProgress />
            </ErrorBoundary>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Quests</h2>
                <QuestList
                    quests={quests}
                    onSelectQuest={handleSelectQuest}
                />
            </div>
        </div>
    );
}

// Simple error boundary component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
    try {
        return <>{children}</>;
    } catch (error) {
        return <>{fallback}</>;
    }
}