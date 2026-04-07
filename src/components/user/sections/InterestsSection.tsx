import { useEffect, useState } from 'react';
import { UserResponse } from '../../../types';

interface Props {
  onSave: (section: string, data: Record<string, string>) => void;
  draft: Partial<UserResponse>;
}

export default function InterestsSection({ onSave, draft }: Props) {
  const [form, setForm] = useState({
    hobbies: draft.interests?.hobbies || '',
    favoriteFood: draft.interests?.favoriteFood || '',
    favoriteMusic: draft.interests?.favoriteMusic || '',
    favoriteMovies: draft.interests?.favoriteMovies || '',
    favoriteColor: draft.interests?.favoriteColor || '',
    favoritePlace: draft.interests?.favoritePlace || '',
  });

  useEffect(() => {
    setForm({
      hobbies: draft.interests?.hobbies || '',
      favoriteFood: draft.interests?.favoriteFood || '',
      favoriteMusic: draft.interests?.favoriteMusic || '',
      favoriteMovies: draft.interests?.favoriteMovies || '',
      favoriteColor: draft.interests?.favoriteColor || '',
      favoritePlace: draft.interests?.favoritePlace || '',
    });
  }, [draft.interests]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onSave('interests', updated);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          What are your hobbies? 🎨
        </label>
        <p className="text-xs text-gray-400 mb-3">Things you love doing in your spare time</p>
        <textarea
          value={form.hobbies}
          onChange={e => handleChange('hobbies', e.target.value)}
          placeholder="e.g. reading, painting, gaming, cooking, photography..."
          className="input-field resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Favorite Food 🍜</label>
          <p className="text-xs text-gray-400 mb-3">What's your go-to comfort food?</p>
          <input
            type="text"
            value={form.favoriteFood}
            onChange={e => handleChange('favoriteFood', e.target.value)}
            placeholder="e.g. ramen, pizza, sinigang..."
            className="input-field"
          />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Favorite Color 🎨</label>
          <p className="text-xs text-gray-400 mb-3">The color that speaks to you</p>
          <input
            type="text"
            value={form.favoriteColor}
            onChange={e => handleChange('favoriteColor', e.target.value)}
            placeholder="e.g. lavender, blue, sunset orange..."
            className="input-field"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Favorite Music 🎵
        </label>
        <p className="text-xs text-gray-400 mb-3">Genres, artists, or songs you love</p>
        <input
          type="text"
          value={form.favoriteMusic}
          onChange={e => handleChange('favoriteMusic', e.target.value)}
          placeholder="e.g. OPM, Taylor Swift, lo-fi, K-pop..."
          className="input-field"
        />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Favorite Movies or Shows 🎬
        </label>
        <p className="text-xs text-gray-400 mb-3">What do you enjoy watching?</p>
        <textarea
          value={form.favoriteMovies}
          onChange={e => handleChange('favoriteMovies', e.target.value)}
          placeholder="e.g. Your Name, Crash Landing on You, horror films, documentaries..."
          className="input-field resize-none"
          rows={3}
        />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Favorite Place 📍
        </label>
        <p className="text-xs text-gray-400 mb-3">A place that makes you feel at home or happy</p>
        <input
          type="text"
          value={form.favoritePlace}
          onChange={e => handleChange('favoritePlace', e.target.value)}
          placeholder="e.g. the beach, a cozy café, my room, Baguio..."
          className="input-field"
        />
      </div>
    </div>
  );
}
