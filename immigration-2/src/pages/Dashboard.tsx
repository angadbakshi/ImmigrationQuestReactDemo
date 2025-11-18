import { DashboardMain } from 'core/src/components/dashboard/DashboardMain';
import { DashboardSidebar } from 'core/src/components/dashboard/DashboardSidebar';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
            <DashboardMain/>
            <DashboardSidebar/>
        </div>
    </div>
  );
}