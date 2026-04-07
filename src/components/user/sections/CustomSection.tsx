import { useState } from 'react';
import { CustomQuestion, UserResponse } from '../../../types';

interface Props {
  onSave: (section: string, data: Record<string, string>) => void;
  draft: Partial<UserResponse>;
  questions: CustomQuestion[];
}

export default function CustomSection({ onSave, draft, questions }: Props) {
  const [form, setForm] = useState<Record<string, string>>(draft.customAnswers || {});

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onSave('custom', updated);
  };

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="text-4xl mb-3">💫</div>
        <p className="text-gray-500">No additional questions yet. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map(q => (
        <div key={q.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            💫 {q.question}
            {q.isRequired && <span className="text-rose-400 ml-1">*</span>}
          </label>
          <p className="text-xs text-gray-400 mb-3">
            {q.isRequired ? 'Required' : 'Optional — share what you feel comfortable with'}
          </p>

          {q.type === 'choice' && q.options ? (
            <div className="flex flex-wrap gap-2">
              {q.options.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleChange(q.fieldKey, opt)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    form[q.fieldKey] === opt
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white border-transparent shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : q.type === 'textarea' ? (
            <textarea
              value={form[q.fieldKey] || ''}
              onChange={e => handleChange(q.fieldKey, e.target.value)}
              placeholder="Type your answer here..."
              className="input-field resize-none"
              rows={3}
              required={q.isRequired}
            />
          ) : (
            <input
              type="text"
              value={form[q.fieldKey] || ''}
              onChange={e => handleChange(q.fieldKey, e.target.value)}
              placeholder="Type your answer here..."
              className="input-field"
              required={q.isRequired}
            />
          )}
        </div>
      ))}
    </div>
  );
}
