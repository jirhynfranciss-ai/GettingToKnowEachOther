import { useState } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, Edit3, Check, X, HelpCircle } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { CustomQuestion, Category } from '../../../types';

const categoryLabels: Record<Category, string> = {
  basic: '🌸 Basic Info',
  interests: '✨ Interests',
  personality: '🌟 Personality',
  deeper: '💜 Deeper',
};

const categoryColors: Record<Category, string> = {
  basic: 'bg-rose-50 border-rose-200 text-rose-700',
  interests: 'bg-orange-50 border-orange-200 text-orange-700',
  personality: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  deeper: 'bg-purple-50 border-purple-200 text-purple-700',
};

export default function QuestionsManager() {
  const { db, addQuestion, deleteQuestion, toggleQuestion, updateQuestion } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [newQ, setNewQ] = useState({
    question: '',
    category: 'basic' as Category,
    type: 'text' as 'text' | 'textarea' | 'choice',
    options: '',
    isRequired: false,
  });

  const questions = db.questions;
  const filtered = filterCategory === 'all' ? questions : questions.filter(q => q.category === filterCategory);

  const defaultFieldKeys = ['name', 'nickname', 'location', 'school', 'birthday', 'age',
    'hobbies', 'favoriteFood', 'favoriteMusic', 'favoriteMovies', 'favoriteColor', 'favoritePlace',
    'introvertOrExtrovert', 'beachOrMountains', 'coffeeOrMilkTea', 'freeTimeActivity', 'morningOrNight', 'catOrDog', 'stayInOrGoOut',
    'dreams', 'goals', 'whatMakesHappy', 'whatMakesComfortable', 'lifePhilosophy', 'idealDay'];

  const isDefault = (q: CustomQuestion) => defaultFieldKeys.includes(q.fieldKey);

  const handleAddQuestion = () => {
    if (!newQ.question.trim()) return;
    const fieldKey = `custom_${Date.now()}`;
    addQuestion({
      ...newQ,
      fieldKey,
      isActive: true,
      options: newQ.type === 'choice' ? newQ.options.split(',').map(o => o.trim()).filter(Boolean) : undefined,
    });
    setNewQ({ question: '', category: 'basic', type: 'text', options: '', isRequired: false });
    setShowForm(false);
  };

  const handleEdit = (q: CustomQuestion) => {
    setEditingId(q.id);
    setEditText(q.question);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      updateQuestion(id, { question: editText.trim() });
    }
    setEditingId(null);
  };

  const activeCount = questions.filter(q => q.isActive).length;
  const inactiveCount = questions.filter(q => !q.isActive).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{activeCount} active · {inactiveCount} hidden</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl text-sm font-medium hover:bg-purple-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      {/* Add Question Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-500" />
            New Custom Question
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Question Text *</label>
              <textarea
                value={newQ.question}
                onChange={e => setNewQ({ ...newQ, question: e.target.value })}
                placeholder="Write your question here..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm resize-none"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                <select
                  value={newQ.category}
                  onChange={e => setNewQ({ ...newQ, category: e.target.value as Category })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm bg-white"
                >
                  {Object.entries(categoryLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Answer Type</label>
                <select
                  value={newQ.type}
                  onChange={e => setNewQ({ ...newQ, type: e.target.value as 'text' | 'textarea' | 'choice' })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm bg-white"
                >
                  <option value="text">Short Text</option>
                  <option value="textarea">Long Text</option>
                  <option value="choice">Multiple Choice</option>
                </select>
              </div>
            </div>

            {newQ.type === 'choice' && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Options (comma separated)</label>
                <input
                  type="text"
                  value={newQ.options}
                  onChange={e => setNewQ({ ...newQ, options: e.target.value })}
                  placeholder="Option 1, Option 2, Option 3..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm"
                />
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newQ.isRequired}
                onChange={e => setNewQ({ ...newQ, isRequired: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Mark as required</span>
            </label>

            <div className="flex gap-2">
              <button
                onClick={handleAddQuestion}
                className="flex items-center gap-1 px-4 py-2 bg-purple-500 text-white rounded-xl text-sm font-medium hover:bg-purple-600"
              >
                <Plus className="w-3 h-3" /> Add Question
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            filterCategory === 'all' ? 'bg-purple-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          All ({questions.length})
        </button>
        {(Object.keys(categoryLabels) as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterCategory === cat ? 'bg-purple-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {categoryLabels[cat]} ({questions.filter(q => q.category === cat).length})
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.map(q => (
          <div
            key={q.id}
            className={`bg-white rounded-2xl p-4 border shadow-sm transition-all ${
              q.isActive ? 'border-gray-100' : 'border-gray-100 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleQuestion(q.id)}
                className={`mt-0.5 flex-shrink-0 ${q.isActive ? 'text-green-500' : 'text-gray-300'}`}
                title={q.isActive ? 'Hide question' : 'Show question'}
              >
                {q.isActive
                  ? <ToggleRight className="w-6 h-6" />
                  : <ToggleLeft className="w-6 h-6" />
                }
              </button>

              <div className="flex-1 min-w-0">
                {editingId === q.id ? (
                  <div className="flex items-start gap-2">
                    <textarea
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-purple-300 focus:outline-none text-sm resize-none"
                      rows={2}
                      autoFocus
                    />
                    <div className="flex flex-col gap-1">
                      <button onClick={() => handleSaveEdit(q.id)} className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        <Check className="w-3 h-3" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm font-medium ${q.isActive ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                    {q.question}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[q.category]}`}>
                    {categoryLabels[q.category]}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">{q.type}</span>
                  {q.isRequired && <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full border border-red-100">Required</span>}
                  {isDefault(q) && <span className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full border border-blue-100">Default</span>}
                  {q.options && q.options.length > 0 && (
                    <span className="text-xs text-gray-400">{q.options.length} options</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {!isDefault(q) && editingId !== q.id && (
                  <button
                    onClick={() => handleEdit(q)}
                    className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Edit question"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                {!isDefault(q) && (
                  confirmDelete === q.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => { deleteQuestion(q.id); setConfirmDelete(null); }} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <Check className="w-3 h-3" />
                      </button>
                      <button onClick={() => setConfirmDelete(null)} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(q.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
          <div className="text-4xl mb-3">❓</div>
          <p className="text-gray-500">No questions in this category</p>
        </div>
      )}
    </div>
  );
}
