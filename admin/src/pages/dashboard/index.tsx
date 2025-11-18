import { Users, Database, Activity } from 'lucide-react';
import { Card } from 'core/src/components/ui/Card';

export function AdminDashboard() {
    const stats = [
        {
            id: 'users',
            label: 'Total Users',
            value: '2,845',
            icon: Users,
            change: '+12%',
            changeType: 'positive'
        },
        {
            id: 'programs',
            label: 'Active Programs',
            value: '7',
            icon: Database,
            change: '0%',
            changeType: 'neutral'
        },
        {
            id: 'applications',
            label: 'New Applications',
            value: '124',
            icon: Activity,
            change: '+18%',
            changeType: 'positive'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-2 text-sm text-gray-600">Overview of system statistics and recent activity</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.id} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                            <div className="rounded-full p-3 bg-gray-50">
                                <stat.icon className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                        <div className="mt-4">
              <span className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                      stat.changeType === 'negative' ? 'text-red-600' :
                          'text-gray-600'
              }`}>
                {stat.change} from last month
              </span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Panel */}
            <Card className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {/* Activity items would go here */}
                    <p className="text-gray-600">No recent activity to display</p>
                </div>
            </Card>
        </div>
    );
}