import { useState } from 'react';
import {
  LayoutDashboard, Users, HelpCircle, Settings, LogOut, Heart, Menu, X,
  Database, FileDown, ChevronRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import DashboardOverview from './tabs/DashboardOverview';
import UsersList from './tabs/UsersList';
import UserDetail from './tabs/UserDetail';
import QuestionsManager from './tabs/QuestionsManager';
import SettingsTab from './tabs/SettingsTab';
import HostingGuide from './tabs/HostingGuide';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Responses', icon: Users },
  { id: 'questions', label: 'Questions', icon: HelpCircle },
  { id: 'hosting', label: 'Hosting Guide', icon: Database },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, exportData, getAllUsers } = useStore();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtky_responses_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewUser = (id: string) => {
    setSelectedUserId(id);
    setActiveTab('userDetail');
    setSidebarOpen(false);
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null);
    setActiveTab('users');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedUserId(null);
    setSidebarOpen(false);
  };

  const users = getAllUsers();
  const submitted = users.filter(u => u.profile.isSubmitted).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg border-r border-gray-100 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800">GTKY Admin</h1>
              <p className="text-xs text-gray-400">Getting to Know You</p>
            </div>
          </div>
        </div>

        {/* Stats Quick View */}
        <div className="mx-4 mt-4 p-3 bg-purple-50 rounded-xl border border-purple-100">
          <div className="flex justify-between text-xs">
            <div className="text-center">
              <p className="font-bold text-purple-700 text-lg">{users.length}</p>
              <p className="text-gray-500">Profiles</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-green-600 text-lg">{submitted}</p>
              <p className="text-gray-500">Submitted</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-orange-500 text-lg">{users.length - submitted}</p>
              <p className="text-gray-500">In Progress</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id || (tab.id === 'users' && activeTab === 'userDetail');
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
          >
            <FileDown className="w-4 h-4" />
            Export Data (JSON)
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1">
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
              {activeTab === 'dashboard' && '📊 Dashboard Overview'}
              {activeTab === 'users' && '👥 All Responses'}
              {activeTab === 'userDetail' && '👤 User Profile'}
              {activeTab === 'questions' && '❓ Question Manager'}
              {activeTab === 'hosting' && '🚀 Hosting & Database Guide'}
              {activeTab === 'settings' && '⚙️ Settings'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-purple-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-purple-700 font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {activeTab === 'dashboard' && <DashboardOverview onViewUser={handleViewUser} onTabChange={handleTabChange} />}
          {activeTab === 'users' && <UsersList onViewUser={handleViewUser} />}
          {activeTab === 'userDetail' && selectedUserId && (
            <UserDetail userId={selectedUserId} onBack={handleBackToUsers} />
          )}
          {activeTab === 'questions' && <QuestionsManager />}
          {activeTab === 'hosting' && <HostingGuide />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}
