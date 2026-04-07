import { Heart, Star, CheckCircle } from 'lucide-react';
import { UserResponse } from '../../types';
import { useStore } from '../../store/useStore';

interface Props {
  user: UserResponse;
  onEdit: () => void;
}

export default function SubmittedPage({ user }: Props) {
  const { logout } = useStore();
  const name = user.profile.nickname || user.profile.name || 'friend';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Heart */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-200 animate-pulse">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you, {name}! 💌</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Your answers have been submitted. It means a lot that you took the time to share a part of yourself. 🌸
        </p>

        {/* Summary Cards */}
        <div className="space-y-3 text-left mb-8">
          {user.profile.name && (
            <SummaryItem emoji="🌸" label="Name" value={user.profile.name} />
          )}
          {user.profile.nickname && (
            <SummaryItem emoji="✨" label="Nickname" value={user.profile.nickname} />
          )}
          {user.profile.location && (
            <SummaryItem emoji="🏡" label="Location" value={user.profile.location} />
          )}
          {user.interests.favoriteFood && (
            <SummaryItem emoji="🍜" label="Favorite Food" value={user.interests.favoriteFood} />
          )}
          {user.interests.favoriteColor && (
            <SummaryItem emoji="🎨" label="Favorite Color" value={user.interests.favoriteColor} />
          )}
          {user.personality.coffeeOrMilkTea && (
            <SummaryItem emoji="☕" label="Coffee or Milk Tea" value={user.personality.coffeeOrMilkTea} />
          )}
        </div>

        {/* Completion Badge */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 mb-6">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-semibold text-gray-800">Responses Submitted ✓</p>
              <p className="text-xs text-gray-500">
                {user.profile.submittedAt
                  ? new Date(user.profile.submittedAt).toLocaleString()
                  : 'Just now'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>Your answers are private and safe</span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
          <button
            onClick={logout}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold hover:opacity-90 transition-all shadow-sm"
          >
            Done 💕
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
      <span className="text-xl">{emoji}</span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
