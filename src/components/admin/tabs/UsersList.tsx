import { useState } from 'react';
import { Search, Eye, Trash2, CheckCircle, Clock, Filter } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { format } from 'date-fns';

interface Props {
  onViewUser: (id: string) => void;
}

export default function UsersList({ onViewUser }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'submitted' | 'draft'>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { getAllUsers, deleteUser } = useStore();

  const users = getAllUsers();

  const filtered = users.filter(u => {
    const name = (u.profile.name + u.profile.nickname + u.profile.id).toLowerCase();
    const matchSearch = name.includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'submitted' && u.profile.isSubmitted) ||
      (filter === 'draft' && !u.profile.isSubmitted);
    return matchSearch && matchFilter;
  });

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

  const handleDelete = (id: string) => {
    deleteUser(id);
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or username..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-sm bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Filter className="w-4 h-4 text-gray-400 self-center hidden sm:block" />
          {(['all', 'submitted', 'draft'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                filter === f
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {f === 'all' ? '📋 All' : f === 'submitted' ? '✅ Submitted' : '⏳ Draft'}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{filtered.length} profile{filtered.length !== 1 ? 's' : ''} found</span>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500">No profiles found</p>
          {search && <p className="text-xs text-gray-400 mt-1">Try a different search term</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(user => {
            const completion = getCompletionRate(user);
            const displayName = user.profile.name || user.profile.nickname || user.profile.id;

            return (
              <div key={user.profile.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 transition-all">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white font-bold text-lg">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{displayName}</h3>
                        {user.profile.nickname && user.profile.name && (
                          <p className="text-xs text-gray-400">"{user.profile.nickname}"</p>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        user.profile.isSubmitted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {user.profile.isSubmitted
                          ? <><CheckCircle className="w-3 h-3" /> Submitted</>
                          : <><Clock className="w-3 h-3" /> In Progress</>
                        }
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                      {user.profile.school && <span>📚 {user.profile.school}</span>}
                      {user.profile.location && <span>📍 {user.profile.location}</span>}
                      {user.profile.age && <span>🎂 {user.profile.age} yrs</span>}
                    </div>

                    {/* Completion */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{completion}% filled</span>
                    </div>

                    {/* Timestamps */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      {user.profile.updatedAt && (
                        <span>Updated: {format(new Date(user.profile.updatedAt), 'MMM d, yyyy h:mm a')}</span>
                      )}
                      {user.profile.isSubmitted && user.profile.submittedAt && (
                        <span className="text-green-600">
                          Submitted: {format(new Date(user.profile.submittedAt), 'MMM d, yyyy h:mm a')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => onViewUser(user.profile.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium hover:bg-purple-100 transition-colors border border-purple-100"
                  >
                    <Eye className="w-4 h-4" /> View Profile
                  </button>

                  {confirmDelete === user.profile.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(user.profile.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded-xl text-xs font-medium hover:bg-red-600"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(user.profile.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors border border-gray-100 hover:border-red-200"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


