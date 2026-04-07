import { Users, CheckCircle, Clock, TrendingUp, Heart, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { format } from 'date-fns';

interface Props {
  onViewUser: (id: string) => void;
  onTabChange: (tab: string) => void;
}

export default function DashboardOverview({ onViewUser, onTabChange }: Props) {
  const { getAllUsers, db } = useStore();
  const users = getAllUsers();
  const submitted = users.filter(u => u.profile.isSubmitted);
  const inProgress = users.filter(u => !u.profile.isSubmitted);
  const totalQuestions = db.questions.filter(q => q.isActive).length;

  const getCompletionRate = (user: typeof users[0]) => {
    const fields = [
      user.profile.name, user.profile.nickname, user.profile.location, user.profile.school,
      user.interests.hobbies, user.interests.favoriteFood, user.interests.favoriteMusic,
      user.interests.favoriteColor, user.personality.introvertOrExtrovert,
      user.personality.coffeeOrMilkTea, user.deeper.dreams, user.deeper.goals,
    ];
    const filled = fields.filter(f => f && f.trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.profile.updatedAt).getTime() - new Date(a.profile.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-6 h-6 fill-white" />
          <h2 className="text-xl font-bold">Welcome back, Admin! 💜</h2>
        </div>
        <p className="text-purple-100 text-sm">
          Here's an overview of your Getting to Know You system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5 text-purple-500" />}
          label="Total Profiles"
          value={users.length}
          bg="bg-purple-50"
          border="border-purple-100"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
          label="Submitted"
          value={submitted.length}
          bg="bg-green-50"
          border="border-green-100"
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-orange-500" />}
          label="In Progress"
          value={inProgress.length}
          bg="bg-orange-50"
          border="border-orange-100"
        />
        <StatCard
          icon={<Star className="w-5 h-5 text-yellow-500" />}
          label="Active Questions"
          value={totalQuestions}
          bg="bg-yellow-50"
          border="border-yellow-100"
        />
      </div>

      {/* Completion Bar */}
      {users.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Submission Rate
            </h3>
            <span className="text-sm font-bold text-purple-600">
              {users.length > 0 ? Math.round((submitted.length / users.length) * 100) : 0}%
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-violet-500 rounded-full transition-all duration-1000"
              style={{ width: `${users.length > 0 ? (submitted.length / users.length) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{submitted.length} submitted</span>
            <span>{inProgress.length} in progress</span>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Recent Activity</h3>
          <button
            onClick={() => onTabChange('users')}
            className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {recentUsers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🌸</div>
            <p className="text-gray-500 text-sm">No responses yet. Share the link with your crush!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentUsers.map(user => {
              const completion = getCompletionRate(user);
              return (
                <div
                  key={user.profile.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-50 hover:border-gray-200"
                  onClick={() => onViewUser(user.profile.id)}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {(user.profile.nickname || user.profile.name || user.profile.id).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {user.profile.name || user.profile.nickname || user.profile.id}
                    </p>
                    <p className="text-xs text-gray-400">
                      Updated {user.profile.updatedAt ? format(new Date(user.profile.updatedAt), 'MMM d, h:mm a') : 'recently'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-gray-700">{completion}%</div>
                      <div className="text-xs text-gray-400">complete</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.profile.isSubmitted
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {user.profile.isSubmitted ? '✓ Done' : '⏳ Draft'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100">
        <h3 className="font-semibold text-gray-800 mb-3">💡 Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5">•</span>
            Share the link with your crush and let them fill it out at their own pace
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5">•</span>
            Add custom questions in the Questions Manager to personalize the experience
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5">•</span>
            Use the notes feature to write down your thoughts about their answers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5">•</span>
            Export data regularly to keep a backup of all responses
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg, border }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bg: string;
  border: string;
}) {
  return (
    <div className={`${bg} rounded-2xl p-4 border ${border}`}>
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

import React from 'react';
