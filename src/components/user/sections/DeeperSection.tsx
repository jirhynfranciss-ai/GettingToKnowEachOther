import { useEffect, useState } from 'react';
import { UserResponse } from '../../../types';

interface Props {
  onSave: (section: string, data: Record<string, string>) => void;
  draft: Partial<UserResponse>;
}

const questions = [
  { key: 'dreams', emoji: '🌠', label: 'What are your dreams in life?', placeholder: 'Big or small — share what you hope for...' },
  { key: 'goals', emoji: '🎯', label: 'What are your goals right now?', placeholder: "What are you working towards these days?" },
  { key: 'whatMakesHappy', emoji: '☀️', label: 'What makes you genuinely happy?', placeholder: 'Little moments, big achievements — what lights you up?' },
  { key: 'whatMakesComfortable', emoji: '🤍', label: 'What makes you feel comfortable when talking to someone new?', placeholder: 'e.g. when they listen, when they share too, when conversations feel natural...' },
  { key: 'lifePhilosophy', emoji: '📖', label: 'Do you have a life philosophy or a quote you live by?', placeholder: 'Something that guides you or gives you strength...' },
  { key: 'idealDay', emoji: '🌸', label: 'What does your ideal day look like?', placeholder: 'Walk me through your perfect day from morning to night...' },
];

export default function DeeperSection({ onSave, draft }: Props) {
  const [form, setForm] = useState({
    dreams: draft.deeper?.dreams || '',
    goals: draft.deeper?.goals || '',
    whatMakesHappy: draft.deeper?.whatMakesHappy || '',
    whatMakesComfortable: draft.deeper?.whatMakesComfortable || '',
    lifePhilosophy: draft.deeper?.lifePhilosophy || '',
    idealDay: draft.deeper?.idealDay || '',
  });

  useEffect(() => {
    setForm({
      dreams: draft.deeper?.dreams || '',
      goals: draft.deeper?.goals || '',
      whatMakesHappy: draft.deeper?.whatMakesHappy || '',
      whatMakesComfortable: draft.deeper?.whatMakesComfortable || '',
      lifePhilosophy: draft.deeper?.lifePhilosophy || '',
      idealDay: draft.deeper?.idealDay || '',
    });
  }, [draft.deeper]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onSave('deeper', updated);
  };

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
        <p className="text-sm text-purple-700 text-center leading-relaxed">
          💜 These are optional deeper questions. Only share what you feel comfortable with. There's no pressure at all!
        </p>
      </div>

      {questions.map(q => (
        <div key={q.key} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {q.emoji} {q.label}
          </label>
          <p className="text-xs text-gray-400 mb-3">Optional — share only what you're comfortable with</p>
          <textarea
            value={form[q.key as keyof typeof form]}
            onChange={e => handleChange(q.key, e.target.value)}
            placeholder={q.placeholder}
            className="input-field resize-none"
            rows={3}
          />
        </div>
      ))}
    </div>
  );
}
