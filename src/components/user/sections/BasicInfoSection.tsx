import { useEffect, useState } from 'react';
import { UserResponse } from '../../../types';

interface Props {
  onSave: (section: string, data: Record<string, string>) => void;
  draft: Partial<UserResponse>;
}

export default function BasicInfoSection({ onSave, draft }: Props) {
  const [form, setForm] = useState({
    name: draft.profile?.name || '',
    nickname: draft.profile?.nickname || '',
    location: draft.profile?.location || '',
    school: draft.profile?.school || '',
    birthday: draft.profile?.birthday || '',
    age: draft.profile?.age || '',
  });

  useEffect(() => {
    setForm({
      name: draft.profile?.name || '',
      nickname: draft.profile?.nickname || '',
      location: draft.profile?.location || '',
      school: draft.profile?.school || '',
      birthday: draft.profile?.birthday || '',
      age: draft.profile?.age || '',
    });
  }, [draft.profile]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onSave('profile', updated);
  };

  return (
    <div className="space-y-4">
      <FormField
        label="What is your full name? 🌸"
        required
        hint="Your real name or the name you prefer"
      >
        <input
          type="text"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="e.g. Mia Santos"
          className="input-field"
        />
      </FormField>

      <FormField
        label="What do people call you? (Nickname) ✨"
        hint="What your friends and family call you"
      >
        <input
          type="text"
          value={form.nickname}
          onChange={e => handleChange('nickname', e.target.value)}
          placeholder="e.g. Mia, Mimi, Sunshine..."
          className="input-field"
        />
      </FormField>

      <FormField
        label="Where do you currently live? 🏡"
        hint="City or general area is fine"
      >
        <input
          type="text"
          value={form.location}
          onChange={e => handleChange('location', e.target.value)}
          placeholder="e.g. Cebu City, Philippines"
          className="input-field"
        />
      </FormField>

      <FormField
        label="Where do you study or work? 📚"
        hint="School, university, or workplace"
      >
        <input
          type="text"
          value={form.school}
          onChange={e => handleChange('school', e.target.value)}
          placeholder="e.g. University of San Carlos"
          className="input-field"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Birthday 🎂" hint="Optional">
          <input
            type="text"
            value={form.birthday}
            onChange={e => handleChange('birthday', e.target.value)}
            placeholder="e.g. August 12"
            className="input-field"
          />
        </FormField>

        <FormField label="Age 🎈" hint="Optional">
          <input
            type="text"
            value={form.age}
            onChange={e => handleChange('age', e.target.value)}
            placeholder="e.g. 18"
            className="input-field"
          />
        </FormField>
      </div>
    </div>
  );
}

function FormField({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-3">{hint}</p>}
      {children}
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

import React from 'react';
