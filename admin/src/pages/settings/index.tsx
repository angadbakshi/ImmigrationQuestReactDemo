import { Card } from '../../../../core/src/components/ui/Card';
import { Bell, Shield, Database } from 'lucide-react';
import { Switch } from '../../../../core/src/components/ui/Switch';

export function AdminSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
                <p className="mt-2 text-sm text-gray-600">Manage system-wide settings and configurations</p>
            </div>

            <Card className="divide-y divide-gray-200">
                {/* Notifications Settings */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-gray-500" />
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">System Notifications</h3>
                                <p className="text-sm text-gray-500">Enable email notifications for system events</p>
                            </div>
                        </div>
                        <Switch />
                    </div>
                </div>

                {/* Security Settings */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-gray-500" />
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Enhanced Security</h3>
                                <p className="text-sm text-gray-500">Enable additional security measures</p>
                            </div>
                        </div>
                        <Switch />
                    </div>
                </div>

                {/* Backup Settings */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Database className="w-5 h-5 text-gray-500" />
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Automated Backups</h3>
                                <p className="text-sm text-gray-500">Enable daily system backups</p>
                            </div>
                        </div>
                        <Switch />
                    </div>
                </div>
            </Card>
        </div>
    );
}