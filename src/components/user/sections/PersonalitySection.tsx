import { useEffect, useState } from 'react';
import { UserResponse } from '../../../types';

interface Props {
  onSave: (section: string, data: Record<string, string>) => void;
  draft: Partial<UserResponse>;
}

const choices: Record<string, { label: string; emoji: string; hint: string; options: { value: string; emoji: string }[] }> = {
  introvertOrExtrovert: {
    label: 'Introvert or Extrovert?',
    emoji: '🌙',
    hint: 'How do you recharge?',
    options: [
      { value: 'Introvert', emoji: '🌙' },
      { value: 'Extrovert', emoji: '☀️' },
      { value: 'Ambivert', emoji: '🌤️' },
    ],
  },
  beachOrMountains: {
    label: 'Beach or Mountains?',
    emoji: '🏖️',
    hint: 'Your ideal escape',
    options: [
      { value: 'Beach', emoji: '🏖️' },
      { value: 'Mountains', emoji: '🏔️' },
      { value: 'Both!', emoji: '🌍' },
    ],
  },
  coffeeOrMilkTea: {
    label: 'Coffee or Milk Tea?',
    emoji: '☕',
    hint: 'Your go-to drink',
    options: [
      { value: 'Coffee', emoji: '☕' },
      { value: 'Milk Tea', emoji: '🧋' },
      { value: 'Both!', emoji: '🥤' },
      { value: 'Neither', emoji: '💧' },
    ],
  },
  morningOrNight: {
    label: 'Morning Person or Night Owl?',
    emoji: '🌅',
    hint: 'When do you feel most alive?',
    options: [
      { value: 'Morning Person', emoji: '🌅' },
      { value: 'Night Owl', emoji: '🦉' },
      { value: 'Depends on the day', emoji: '😅' },
    ],
  },
  catOrDog: {
    label: 'Cat or Dog person?',
    emoji: '🐱',
    hint: 'Pick your side!',
    options: [
      { value: 'Cat', emoji: '🐱' },
      { value: 'Dog', emoji: '🐶' },
      { value: 'Both!', emoji: '🐾' },
      { value: 'Neither', emoji: '🦋' },
    ],
  },
  stayInOrGoOut: {
    label: 'Stay in or Go out on weekends?',
    emoji: '🏠',
    hint: 'Your ideal weekend vibe',
    options: [
      { value: 'Stay In', emoji: '🏠' },
      { value: 'Go Out', emoji: '🌆' },
      { value: 'Depends on my mood', emoji: '🎲' },
    ],
  },
};

export default function PersonalitySection({ onSave, draft }: Props) {
  const [form, setForm] = useState({
    introvertOrExtrovert: draft.personality?.introvertOrExtrovert || '',
    beachOrMountains: draft.personality?.beachOrMountains || '',
    coffeeOrMilkTea: draft.personality?.coffeeOrMilkTea || '',
    freeTimeActivity: draft.personality?.freeTimeActivity || '',
    morningOrNight: draft.personality?.morningOrNight || '',
    catOrDog: draft.personality?.catOrDog || '',
    stayInOrGoOut: draft.personality?.stayInOrGoOut || '',
  });

  useEffect(() => {
    setForm({
      introvertOrExtrovert: draft.personality?.introvertOrExtrovert || '',
      beachOrMountains: draft.personality?.beachOrMountains || '',
      coffeeOrMilkTea: draft.personality?.coffeeOrMilkTea || '',
      freeTimeActivity: draft.personality?.freeTimeActivity || '',
      morningOrNight: draft.personality?.morningOrNight || '',
      catOrDog: draft.personality?.catOrDog || '',
      stayInOrGoOut: draft.personality?.stayInOrGoOut || '',
    });
  }, [draft.personality]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onSave('personality', updated);
  };

  return (
    <div className="space-y-4">
      {Object.entries(choices).map(([key, config]) => (
        <div key={key} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {config.emoji} {config.label}
          </label>
          <p className="text-xs text-gray-400 mb-3">{config.hint}</p>
          <div className="flex flex-wrap gap-2">
            {config.options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange(key, opt.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  form[key as keyof typeof form] === opt.value
                    ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white border-transparent shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                {opt.emoji} {opt.value}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          🎯 What do you enjoy doing in your free time?
        </label>
        <p className="text-xs text-gray-400 mb-3">Tell me more in your own words!</p>
        <textarea
          value={form.freeTimeActivity}
          onChange={e => handleChange('freeTimeActivity', e.target.value)}
          placeholder="e.g. I love binge-watching anime, going on walks, journaling..."
          className="input-field resize-none"
          rows={3}
        />
      </div>
    </div>
  );
}
