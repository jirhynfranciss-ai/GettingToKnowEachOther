import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Check, X, MessageSquare } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { format } from 'date-fns';

interface Props {
  userId: string;
  onBack: () => void;
}

export default function UserDetail({ userId, onBack }: Props) {
  const { getUserById, addNote, deleteNote, getNotesByUser, deleteUser } = useStore();
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'interests' | 'personality' | 'deeper' | 'notes'>('profile');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const user = getUserById(userId);
  const notes = getNotesByUser(userId);

  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">User not found</p>
        <button onClick={onBack} className="mt-4 text-purple-600 hover:text-purple-700 text-sm">← Back</button>
      </div>
    );
  }

  const displayName = user.profile.name || user.profile.nickname || userId;

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(userId, newNote.trim());
      setNewNote('');
      setShowNoteInput(false);
    }
  };

  const handleDeleteUser = () => {
    deleteUser(userId);
    onBack();
  };

  const sections = [
    { id: 'profile', label: '🌸 Basic Info' },
    { id: 'interests', label: '✨ Interests' },
    { id: 'personality', label: '🌟 Personality' },
    { id: 'deeper', label: '💜 Deeper' },
    { id: 'notes', label: `📝 Notes (${notes.length})` },
  ] as const;

  return (
    <div className="space-y-4">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="font-bold text-gray-800">{displayName}</h2>
          <p className="text-xs text-gray-400">
            {user.profile.isSubmitted
              ? `✅ Submitted ${user.profile.submittedAt ? format(new Date(user.profile.submittedAt), 'MMM d, yyyy') : ''}`
              : '⏳ In Progress'}
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
          user.profile.isSubmitted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {user.profile.isSubmitted ? 'Submitted' : 'Draft'}
        </div>
      </div>

      {/* Profile Avatar Card */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold">{displayName}</h3>
            {user.profile.nickname && user.profile.name && (
              <p className="text-rose-100 text-sm">"{user.profile.nickname}"</p>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {user.profile.location && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">📍 {user.profile.location}</span>}
              {user.profile.age && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">🎂 {user.profile.age} yrs</span>}
              {user.profile.birthday && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">🎉 {user.profile.birthday}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeSection === s.id
                ? 'bg-purple-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      {activeSection === 'profile' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard emoji="🌸" label="Full Name" value={user.profile.name} />
          <InfoCard emoji="✨" label="Nickname" value={user.profile.nickname} />
          <InfoCard emoji="🏡" label="Location" value={user.profile.location} />
          <InfoCard emoji="📚" label="School/Work" value={user.profile.school} />
          <InfoCard emoji="🎂" label="Birthday" value={user.profile.birthday} />
          <InfoCard emoji="🎈" label="Age" value={user.profile.age} />
        </div>
      )}

      {activeSection === 'interests' && (
        <div className="space-y-3">
          <InfoCard emoji="🎨" label="Hobbies" value={user.interests.hobbies} large />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard emoji="🍜" label="Favorite Food" value={user.interests.favoriteFood} />
            <InfoCard emoji="🎨" label="Favorite Color" value={user.interests.favoriteColor} />
            <InfoCard emoji="🎵" label="Favorite Music" value={user.interests.favoriteMusic} />
            <InfoCard emoji="📍" label="Favorite Place" value={user.interests.favoritePlace} />
          </div>
          <InfoCard emoji="🎬" label="Favorite Movies/Shows" value={user.interests.favoriteMovies} large />
        </div>
      )}

      {activeSection === 'personality' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard emoji="🌙" label="Introvert or Extrovert?" value={user.personality.introvertOrExtrovert} />
          <InfoCard emoji="🏖️" label="Beach or Mountains?" value={user.personality.beachOrMountains} />
          <InfoCard emoji="☕" label="Coffee or Milk Tea?" value={user.personality.coffeeOrMilkTea} />
          <InfoCard emoji="🌅" label="Morning or Night?" value={user.personality.morningOrNight} />
          <InfoCard emoji="🐱" label="Cat or Dog?" value={user.personality.catOrDog} />
          <InfoCard emoji="🏠" label="Stay In or Go Out?" value={user.personality.stayInOrGoOut} />
          <InfoCard emoji="🎯" label="Free Time Activity" value={user.personality.freeTimeActivity} large />
        </div>
      )}

      {activeSection === 'deeper' && (
        <div className="space-y-3">
          <InfoCard emoji="🌠" label="Dreams" value={user.deeper.dreams} large />
          <InfoCard emoji="🎯" label="Goals" value={user.deeper.goals} large />
          <InfoCard emoji="☀️" label="What Makes Them Happy" value={user.deeper.whatMakesHappy} large />
          <InfoCard emoji="🤍" label="What Makes Them Comfortable" value={user.deeper.whatMakesComfortable} large />
          <InfoCard emoji="📖" label="Life Philosophy" value={user.deeper.lifePhilosophy} large />
          <InfoCard emoji="🌸" label="Ideal Day" value={user.deeper.idealDay} large />
        </div>
      )}

      {activeSection === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              My Notes About {user.profile.nickname || user.profile.name || 'them'}
            </h3>
            <button
              onClick={() => setShowNoteInput(!showNoteInput)}
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-xl text-xs font-medium hover:bg-purple-600 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Note
            </button>
          </div>

          {showNoteInput && (
            <div className="bg-white rounded-2xl p-4 border border-purple-200 shadow-sm">
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Write your thoughts, conversation starters, or anything you want to remember..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleAddNote}
                  className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-xl text-xs font-medium hover:bg-purple-600"
                >
                  <Check className="w-3 h-3" /> Save Note
                </button>
                <button
                  onClick={() => { setShowNoteInput(false); setNewNote(''); }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-200"
                >
                  <X className="w-3 h-3" /> Cancel
                </button>
              </div>
            </div>
          )}

          {notes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-gray-500 text-sm">No notes yet. Add your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{note.note}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')}
                    </span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm mt-4">
        <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Danger Zone
        </h3>
        {confirmDelete ? (
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-600 flex-1">Are you sure? This cannot be undone.</p>
            <button onClick={handleDeleteUser} className="px-3 py-1.5 bg-red-500 text-white rounded-xl text-xs font-medium hover:bg-red-600">
              Yes, Delete
            </button>
            <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors border border-red-200"
          >
            <Trash2 className="w-4 h-4" /> Delete This Profile
          </button>
        )}
      </div>
    </div>
  );
}

function InfoCard({ emoji, label, value, large }: { emoji: string; label: string; value?: string; large?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm ${large ? 'col-span-full' : ''}`}>
      <p className="text-xs text-gray-400 mb-1">{emoji} {label}</p>
      {value ? (
        <p className="text-sm text-gray-800 font-medium leading-relaxed">{value}</p>
      ) : (
        <p className="text-sm text-gray-300 italic">Not answered yet</p>
      )}
    </div>
  );
}
