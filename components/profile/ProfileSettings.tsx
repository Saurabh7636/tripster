import { User } from '@/lib/types';

interface ProfileSettingsProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileSettings({ user, activeTab, onTabChange }: ProfileSettingsProps) {
  const tabs = [
    { id: 'personal', label: 'Personal details', icon: '👤' },
    { id: 'payment', label: 'Payment information', icon: '💳' },
    { id: 'safety', label: 'Safety', icon: '🛡️' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'passengers', label: 'Add other passengers', icon: '👥' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <span>←</span>
        <h2 className="text-xl font-bold">Profile settings</h2>
      </div>
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4">
          <span>🚪</span>
          <span>Log out</span>
        </button>
      </nav>
    </div>
  );
}

