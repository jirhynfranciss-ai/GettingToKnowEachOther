import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';
import {
  CustomQuestion,
  UserResponse,
  AdminNote,
} from './types';

// ─── Supabase Client ──────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://prsazpxsrglibztuisde.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByc2F6cHhzcmdsaWJ6dHVpc2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzQ2ODEsImV4cCI6MjA5MTExMDY4MX0.LvAeaqSGQeInT5tjgM1_nTl-zz2VcJ_jQl3wo7_w3Do';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Table Names (match your Supabase schema exactly) ────────────────────────
// Tables expected:
//   profiles         → UserProfile fields (id, name, nickname, location, school, birthday, age, submitted_at, updated_at, is_submitted)
//   interests        → UserInterests fields (user_id, hobbies, favorite_food, favorite_music, favorite_movies, favorite_color, favorite_place)
//   personalities    → UserPersonality fields (user_id, introvert_or_extrovert, beach_or_mountains, coffee_or_milk_tea, free_time_activity, morning_or_night, cat_or_dog, stay_in_or_go_out)
//   deeper           → UserDeeper fields (user_id, dreams, goals, what_makes_happy, what_makes_comfortable, life_philosophy, ideal_day)
//   custom_answers   → (user_id, question_id, answer)
//   questions        → CustomQuestion fields (id, category, question, type, options, is_required, is_active, created_at, field_key)
//   notes            → AdminNote fields (id, user_id, note, created_at)

// ─── Default Questions ────────────────────────────────────────────────────────
export const defaultQuestions: CustomQuestion[] = [
  // Basic
  { id: 'q_basic_1', category: 'basic', question: 'What is your full name?', type: 'text', isRequired: true, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'name' },
  { id: 'q_basic_2', category: 'basic', question: 'What do people call you? (Nickname)', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'nickname' },
  { id: 'q_basic_3', category: 'basic', question: 'Where do you currently live?', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'location' },
  { id: 'q_basic_4', category: 'basic', question: 'Where do you study or work?', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'school' },
  { id: 'q_basic_5', category: 'basic', question: 'When is your birthday? (optional)', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'birthday' },
  { id: 'q_basic_6', category: 'basic', question: 'How old are you? (optional)', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'age' },
  // Interests
  { id: 'q_int_1', category: 'interests', question: 'What are your hobbies or things you love doing?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'hobbies' },
  { id: 'q_int_2', category: 'interests', question: 'What is your favorite food?', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'favoriteFood' },
  { id: 'q_int_3', category: 'interests', question: 'What kind of music do you enjoy?', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'favoriteMusic' },
  { id: 'q_int_4', category: 'interests', question: 'What are your favorite movies or shows?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'favoriteMovies' },
  { id: 'q_int_5', category: 'interests', question: 'What is your favorite color?', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'favoriteColor' },
  { id: 'q_int_6', category: 'interests', question: 'What is your favorite place to be?', type: 'text', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'favoritePlace' },
  // Personality
  { id: 'q_per_1', category: 'personality', question: 'Are you more of an introvert or extrovert?', type: 'choice', options: ['Introvert 🌙', 'Extrovert ☀️', 'Somewhere in between 🌤️'], isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'introvertOrExtrovert' },
  { id: 'q_per_2', category: 'personality', question: 'Beach or Mountains?', type: 'choice', options: ['Beach 🏖️', 'Mountains 🏔️', 'Both!'], isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'beachOrMountains' },
  { id: 'q_per_3', category: 'personality', question: 'Coffee or Milk Tea?', type: 'choice', options: ['Coffee ☕', 'Milk Tea 🧋', 'Neither', 'Both!'], isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'coffeeOrMilkTea' },
  { id: 'q_per_4', category: 'personality', question: 'What do you enjoy doing in your free time?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'freeTimeActivity' },
  { id: 'q_per_5', category: 'personality', question: 'Are you a morning person or a night owl?', type: 'choice', options: ['Morning person 🌅', 'Night owl 🦉', 'Depends on the day'], isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'morningOrNight' },
  { id: 'q_per_6', category: 'personality', question: 'Cat or Dog person?', type: 'choice', options: ['Cat 🐱', 'Dog 🐶', 'Both!', 'Neither'], isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'catOrDog' },
  { id: 'q_per_7', category: 'personality', question: 'Stay in or go out on weekends?', type: 'choice', options: ['Stay in 🏠', 'Go out 🌆', 'Depends on my mood'], isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'stayInOrGoOut' },
  // Deeper
  { id: 'q_deep_1', category: 'deeper', question: 'What are your dreams in life?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'dreams' },
  { id: 'q_deep_2', category: 'deeper', question: 'What are your goals right now?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'goals' },
  { id: 'q_deep_3', category: 'deeper', question: 'What makes you genuinely happy?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'whatMakesHappy' },
  { id: 'q_deep_4', category: 'deeper', question: 'What makes you feel comfortable when talking to someone new?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'whatMakesComfortable' },
  { id: 'q_deep_5', category: 'deeper', question: 'Do you have a life philosophy or a quote you live by?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'lifePhilosophy' },
  { id: 'q_deep_6', category: 'deeper', question: 'What does your ideal day look like?', type: 'textarea', isRequired: false, isActive: true, createdAt: new Date().toISOString(), fieldKey: 'idealDay' },
];

// ─── Supabase Helper Functions ────────────────────────────────────────────────

/** Fetch all users as UserResponse[] by joining all four tables */
export async function fetchAllUsers(): Promise<UserResponse[]> {
  const { data: profiles, error } = await supabase.from('profiles').select('*');
  if (error) throw error;

  const users: UserResponse[] = await Promise.all(
    (profiles ?? []).map(async (p) => {
      const [interestsRes, personalityRes, deeperRes, customRes] = await Promise.all([
        supabase.from('interests').select('*').eq('user_id', p.id).single(),
        supabase.from('personalities').select('*').eq('user_id', p.id).single(),
        supabase.from('deeper').select('*').eq('user_id', p.id).single(),
        supabase.from('custom_answers').select('*').eq('user_id', p.id),
      ]);

      const customAnswers: Record<string, string> = {};
      for (const row of customRes.data ?? []) {
        customAnswers[row.question_id] = row.answer;
      }

      return {
        profile: {
          id: p.id,
          name: p.name ?? '',
          nickname: p.nickname ?? '',
          location: p.location ?? '',
          school: p.school ?? '',
          birthday: p.birthday ?? '',
          age: p.age ?? '',
          submittedAt: p.submitted_at ?? '',
          updatedAt: p.updated_at ?? '',
          isSubmitted: p.is_submitted ?? false,
        },
        interests: {
          userId: p.id,
          hobbies: interestsRes.data?.hobbies ?? '',
          favoriteFood: interestsRes.data?.favorite_food ?? '',
          favoriteMusic: interestsRes.data?.favorite_music ?? '',
          favoriteMovies: interestsRes.data?.favorite_movies ?? '',
          favoriteColor: interestsRes.data?.favorite_color ?? '',
          favoritePlace: interestsRes.data?.favorite_place ?? '',
        },
        personality: {
          userId: p.id,
          introvertOrExtrovert: personalityRes.data?.introvert_or_extrovert ?? '',
          beachOrMountains: personalityRes.data?.beach_or_mountains ?? '',
          coffeeOrMilkTea: personalityRes.data?.coffee_or_milk_tea ?? '',
          freeTimeActivity: personalityRes.data?.free_time_activity ?? '',
          morningOrNight: personalityRes.data?.morning_or_night ?? '',
          catOrDog: personalityRes.data?.cat_or_dog ?? '',
          stayInOrGoOut: personalityRes.data?.stay_in_or_go_out ?? '',
        },
        deeper: {
          userId: p.id,
          dreams: deeperRes.data?.dreams ?? '',
          goals: deeperRes.data?.goals ?? '',
          whatMakesHappy: deeperRes.data?.what_makes_happy ?? '',
          whatMakesComfortable: deeperRes.data?.what_makes_comfortable ?? '',
          lifePhilosophy: deeperRes.data?.life_philosophy ?? '',
          idealDay: deeperRes.data?.ideal_day ?? '',
        },
        customAnswers,
      };
    })
  );

  return users;
}

/** Fetch a single user by ID */
export async function fetchUserById(id: string): Promise<UserResponse | null> {
  const { data: p, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error || !p) return null;

  const [interestsRes, personalityRes, deeperRes, customRes] = await Promise.all([
    supabase.from('interests').select('*').eq('user_id', id).single(),
    supabase.from('personalities').select('*').eq('user_id', id).single(),
    supabase.from('deeper').select('*').eq('user_id', id).single(),
    supabase.from('custom_answers').select('*').eq('user_id', id),
  ]);

  const customAnswers: Record<string, string> = {};
  for (const row of customRes.data ?? []) {
    customAnswers[row.question_id] = row.answer;
  }

  return {
    profile: {
      id: p.id,
      name: p.name ?? '',
      nickname: p.nickname ?? '',
      location: p.location ?? '',
      school: p.school ?? '',
      birthday: p.birthday ?? '',
      age: p.age ?? '',
      submittedAt: p.submitted_at ?? '',
      updatedAt: p.updated_at ?? '',
      isSubmitted: p.is_submitted ?? false,
    },
    interests: {
      userId: p.id,
      hobbies: interestsRes.data?.hobbies ?? '',
      favoriteFood: interestsRes.data?.favorite_food ?? '',
      favoriteMusic: interestsRes.data?.favorite_music ?? '',
      favoriteMovies: interestsRes.data?.favorite_movies ?? '',
      favoriteColor: interestsRes.data?.favorite_color ?? '',
      favoritePlace: interestsRes.data?.favorite_place ?? '',
    },
    personality: {
      userId: p.id,
      introvertOrExtrovert: personalityRes.data?.introvert_or_extrovert ?? '',
      beachOrMountains: personalityRes.data?.beach_or_mountains ?? '',
      coffeeOrMilkTea: personalityRes.data?.coffee_or_milk_tea ?? '',
      freeTimeActivity: personalityRes.data?.free_time_activity ?? '',
      morningOrNight: personalityRes.data?.morning_or_night ?? '',
      catOrDog: personalityRes.data?.cat_or_dog ?? '',
      stayInOrGoOut: personalityRes.data?.stay_in_or_go_out ?? '',
    },
    deeper: {
      userId: p.id,
      dreams: deeperRes.data?.dreams ?? '',
      goals: deeperRes.data?.goals ?? '',
      whatMakesHappy: deeperRes.data?.what_makes_happy ?? '',
      whatMakesComfortable: deeperRes.data?.what_makes_comfortable ?? '',
      lifePhilosophy: deeperRes.data?.life_philosophy ?? '',
      idealDay: deeperRes.data?.ideal_day ?? '',
    },
    customAnswers,
  };
}

/** Upsert (create or update) a profile row */
export async function upsertProfile(data: UserResponse['profile']): Promise<void> {
  const { error } = await supabase.from('profiles').upsert({
    id: data.id,
    name: data.name,
    nickname: data.nickname,
    location: data.location,
    school: data.school,
    birthday: data.birthday,
    age: data.age,
    submitted_at: data.submittedAt || null,
    updated_at: new Date().toISOString(),
    is_submitted: data.isSubmitted,
  });
  if (error) throw error;
}

/** Upsert interests row */
export async function upsertInterests(data: UserResponse['interests']): Promise<void> {
  const { error } = await supabase.from('interests').upsert({
    user_id: data.userId,
    hobbies: data.hobbies,
    favorite_food: data.favoriteFood,
    favorite_music: data.favoriteMusic,
    favorite_movies: data.favoriteMovies,
    favorite_color: data.favoriteColor,
    favorite_place: data.favoritePlace,
  });
  if (error) throw error;
}

/** Upsert personality row */
export async function upsertPersonality(data: UserResponse['personality']): Promise<void> {
  const { error } = await supabase.from('personalities').upsert({
    user_id: data.userId,
    introvert_or_extrovert: data.introvertOrExtrovert,
    beach_or_mountains: data.beachOrMountains,
    coffee_or_milk_tea: data.coffeeOrMilkTea,
    free_time_activity: data.freeTimeActivity,
    morning_or_night: data.morningOrNight,
    cat_or_dog: data.catOrDog,
    stay_in_or_go_out: data.stayInOrGoOut,
  });
  if (error) throw error;
}

/** Upsert deeper row */
export async function upsertDeeper(data: UserResponse['deeper']): Promise<void> {
  const { error } = await supabase.from('deeper').upsert({
    user_id: data.userId,
    dreams: data.dreams,
    goals: data.goals,
    what_makes_happy: data.whatMakesHappy,
    what_makes_comfortable: data.whatMakesComfortable,
    life_philosophy: data.lifePhilosophy,
    ideal_day: data.idealDay,
  });
  if (error) throw error;
}

/** Upsert a single custom answer */
export async function upsertCustomAnswer(userId: string, questionId: string, answer: string): Promise<void> {
  const { error } = await supabase.from('custom_answers').upsert({
    user_id: userId,
    question_id: questionId,
    answer,
  });
  if (error) throw error;
}

/** Delete a user and all their related rows */
export async function deleteUserFromDB(userId: string): Promise<void> {
  await Promise.all([
    supabase.from('custom_answers').delete().eq('user_id', userId),
    supabase.from('interests').delete().eq('user_id', userId),
    supabase.from('personalities').delete().eq('user_id', userId),
    supabase.from('deeper').delete().eq('user_id', userId),
    supabase.from('notes').delete().eq('user_id', userId),
    supabase.from('profiles').delete().eq('id', userId),
  ]);
}

/** Fetch all questions, fallback to defaults if table is empty */
export async function fetchQuestions(): Promise<CustomQuestion[]> {
  const { data, error } = await supabase.from('questions').select('*').order('created_at');
  if (error || !data || data.length === 0) return defaultQuestions;

  return data.map((q) => ({
    id: q.id,
    category: q.category,
    question: q.question,
    type: q.type,
    options: q.options ?? [],
    isRequired: q.is_required,
    isActive: q.is_active,
    createdAt: q.created_at,
    fieldKey: q.field_key,
  }));
}

/** Insert a new question */
export async function insertQuestion(q: Omit<CustomQuestion, 'id' | 'createdAt'>): Promise<CustomQuestion> {
  const { data, error } = await supabase
    .from('questions')
    .insert({
      category: q.category,
      question: q.question,
      type: q.type,
      options: q.options ?? [],
      is_required: q.isRequired,
      is_active: q.isActive,
      field_key: q.fieldKey,
    })
    .select()
    .single();
  if (error) throw error;

  return {
    id: data.id,
    category: data.category,
    question: data.question,
    type: data.type,
    options: data.options ?? [],
    isRequired: data.is_required,
    isActive: data.is_active,
    createdAt: data.created_at,
    fieldKey: data.field_key,
  };
}

/** Update an existing question */
export async function updateQuestionInDB(id: string, updates: Partial<CustomQuestion>): Promise<void> {
  const mapped: Record<string, unknown> = {};
  if (updates.question !== undefined) mapped.question = updates.question;
  if (updates.category !== undefined) mapped.category = updates.category;
  if (updates.type !== undefined) mapped.type = updates.type;
  if (updates.options !== undefined) mapped.options = updates.options;
  if (updates.isRequired !== undefined) mapped.is_required = updates.isRequired;
  if (updates.isActive !== undefined) mapped.is_active = updates.isActive;
  if (updates.fieldKey !== undefined) mapped.field_key = updates.fieldKey;

  const { error } = await supabase.from('questions').update(mapped).eq('id', id);
  if (error) throw error;
}

/** Delete a question */
export async function deleteQuestionFromDB(id: string): Promise<void> {
  const { error } = await supabase.from('questions').delete().eq('id', id);
  if (error) throw error;
}

/** Fetch all notes */
export async function fetchNotes(): Promise<AdminNote[]> {
  const { data, error } = await supabase.from('notes').select('*').order('created_at');
  if (error) throw error;
  return (data ?? []).map((n) => ({
    id: n.id,
    userId: n.user_id,
    note: n.note,
    createdAt: n.created_at,
  }));
}

/** Insert a new admin note */
export async function insertNote(userId: string, note: string): Promise<AdminNote> {
  const { data, error } = await supabase
    .from('notes')
    .insert({ user_id: userId, note })
    .select()
    .single();
  if (error) throw error;
  return { id: data.id, userId: data.user_id, note: data.note, createdAt: data.created_at };
}

/** Delete a note */
export async function deleteNoteFromDB(id: string): Promise<void> {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw error;
}

// ─── Supabase Realtime ────────────────────────────────────────────────────────

/** Subscribe to real-time changes on the profiles table */
export function subscribeToProfiles(callback: () => void) {
  return supabase
    .channel('profiles-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, callback)
    .subscribe();
}

// ─── Session Management (using sessionStorage for role-based auth) ─────────────
const SESSION_STORAGE_KEY = 'app_session';

interface Session {
  role: 'admin' | 'user';
  userId?: string;
}

export function saveSession(session: Session): void {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

// ─── Zustand Store (fully powered by Supabase) ────────────────────────────────

interface AppState {
  // Session
  session: Session | null;
  loginError: string;

  // Data
  users: UserResponse[];
  questions: CustomQuestion[];
  notes: AdminNote[];

  // Draft state for user form
  draft: Partial<UserResponse>;

  // UI
  currentUserPage: number;
  adminTab: string;
  isLoading: boolean;

  // Actions - Auth
  loginAdmin: (password: string) => Promise<boolean>;
  loginUser: (userId: string) => Promise<void>;
  logout: () => void;
  initSession: () => Promise<void>;

  // Actions - User
  saveDraft: (section: string, data: Record<string, string>) => Promise<void>;
  submitResponse: () => Promise<void>;
  loadDraft: () => Promise<void>;

  // Actions - Admin
  getAllUsers: () => UserResponse[];
  getUserById: (id: string) => UserResponse | undefined;
  deleteUser: (id: string) => Promise<void>;
  exportData: () => string;
  addQuestion: (q: Omit<CustomQuestion, 'id' | 'createdAt'>) => Promise<void>;
  updateQuestion: (id: string, updates: Partial<CustomQuestion>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  toggleQuestion: (id: string) => Promise<void>;
  addNote: (userId: string, note: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNotesByUser: (userId: string) => AdminNote[];
  reloadData: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  session: null,
  loginError: '',
  users: [],
  questions: defaultQuestions,
  notes: [],
  draft: {},
  currentUserPage: 0,
  adminTab: 'dashboard',
  isLoading: false,

  // ── Init: restore session + load data ──────────────────────────────────────
  initSession: async () => {
    const session = loadSession();
    set({ session, isLoading: true });

    try {
      const [questions, notes] = await Promise.all([
        fetchQuestions(),
        fetchNotes(),
      ]);
      set({ questions, notes });

      if (session?.role === 'admin') {
        const users = await fetchAllUsers();
        set({ users });
      } else if (session?.userId) {
        const user = await fetchUserById(session.userId);
        if (user) set({ draft: user });
      }
    } catch (e) {
      console.error('initSession error:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  // ── Auth ───────────────────────────────────────────────────────────────────
  loginAdmin: async (password: string) => {
    if (password === 'aUgust122007') {
      const session: Session = { role: 'admin' };
      saveSession(session);
      set({ session, loginError: '', isLoading: true });
      try {
        const [users, questions, notes] = await Promise.all([
          fetchAllUsers(),
          fetchQuestions(),
          fetchNotes(),
        ]);
        set({ users, questions, notes });
      } catch (e) {
        console.error('loginAdmin fetch error:', e);
      } finally {
        set({ isLoading: false });
      }
      return true;
    }
    set({ loginError: 'Incorrect password. Please try again.' });
    return false;
  },

  loginUser: async (userId: string) => {
    set({ isLoading: true });
    try {
      // Check if user already exists in Supabase
      let user = await fetchUserById(userId);

      if (!user) {
        // Create blank profile + related rows
        const now = new Date().toISOString();
        const newProfile: UserResponse['profile'] = {
          id: userId, name: '', nickname: '', location: '',
          school: '', birthday: '', age: '',
          submittedAt: '', updatedAt: now, isSubmitted: false,
        };
        const newInterests: UserResponse['interests'] = {
          userId, hobbies: '', favoriteFood: '', favoriteMusic: '',
          favoriteMovies: '', favoriteColor: '', favoritePlace: '',
        };
        const newPersonality: UserResponse['personality'] = {
          userId, introvertOrExtrovert: '', beachOrMountains: '',
          coffeeOrMilkTea: '', freeTimeActivity: '', morningOrNight: '',
          catOrDog: '', stayInOrGoOut: '',
        };
        const newDeeper: UserResponse['deeper'] = {
          userId, dreams: '', goals: '', whatMakesHappy: '',
          whatMakesComfortable: '', lifePhilosophy: '', idealDay: '',
        };

        await Promise.all([
          upsertProfile(newProfile),
          upsertInterests(newInterests),
          upsertPersonality(newPersonality),
          upsertDeeper(newDeeper),
        ]);

        user = {
          profile: newProfile,
          interests: newInterests,
          personality: newPersonality,
          deeper: newDeeper,
          customAnswers: {},
        };
      }

      const session: Session = { role: 'user', userId };
      saveSession(session);

      const questions = await fetchQuestions();
      set({ session, draft: user, questions });
    } catch (e) {
      console.error('loginUser error:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    clearSession();
    set({ session: null, draft: {}, loginError: '', adminTab: 'dashboard', users: [] });
  },

  // ── User Actions ───────────────────────────────────────────────────────────
  saveDraft: async (section: string, data: Record<string, string>) => {
    const { session, draft } = get();
    if (!session?.userId) return;

    const userId = session.userId;

    try {
      if (section === 'profile') {
        const updated = { ...(draft as UserResponse).profile, ...data, updatedAt: new Date().toISOString() };
        await upsertProfile(updated);
        set({ draft: { ...(draft as UserResponse), profile: updated } });
      } else if (section === 'interests') {
        const updated = { ...(draft as UserResponse).interests, ...data };
        await upsertInterests(updated);
        set({ draft: { ...(draft as UserResponse), interests: updated } });
      } else if (section === 'personality') {
        const updated = { ...(draft as UserResponse).personality, ...data };
        await upsertPersonality(updated);
        set({ draft: { ...(draft as UserResponse), personality: updated } });
      } else if (section === 'deeper') {
        const updated = { ...(draft as UserResponse).deeper, ...data };
        await upsertDeeper(updated);
        set({ draft: { ...(draft as UserResponse), deeper: updated } });
      } else if (section === 'custom') {
        const updatedCustom = { ...(draft as UserResponse).customAnswers, ...data };
        await Promise.all(
          Object.entries(data).map(([qId, answer]) => upsertCustomAnswer(userId, qId, answer))
        );
        set({ draft: { ...(draft as UserResponse), customAnswers: updatedCustom } });
      }
    } catch (e) {
      console.error('saveDraft error:', e);
    }
  },

  submitResponse: async () => {
    const { session, draft } = get();
    if (!session?.userId) return;

    try {
      const updatedProfile = {
        ...(draft as UserResponse).profile,
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await upsertProfile(updatedProfile);
      set({ draft: { ...(draft as UserResponse), profile: updatedProfile } });
    } catch (e) {
      console.error('submitResponse error:', e);
    }
  },

  loadDraft: async () => {
    const { session } = get();
    if (!session?.userId) return;
    try {
      const user = await fetchUserById(session.userId);
      if (user) set({ draft: user });
    } catch (e) {
      console.error('loadDraft error:', e);
    }
  },

  // ── Admin Actions ──────────────────────────────────────────────────────────
  getAllUsers: () => get().users,

  getUserById: (id: string) => get().users.find((u) => u.profile.id === id),

  deleteUser: async (id: string) => {
    try {
      await deleteUserFromDB(id);
      set((state) => ({
        users: state.users.filter((u) => u.profile.id !== id),
        notes: state.notes.filter((n) => n.userId !== id),
      }));
    } catch (e) {
      console.error('deleteUser error:', e);
    }
  },

  exportData: () => JSON.stringify(get().users, null, 2),

  addQuestion: async (q) => {
    try {
      const newQ = await insertQuestion(q);
      set((state) => ({ questions: [...state.questions, newQ] }));
    } catch (e) {
      console.error('addQuestion error:', e);
    }
  },

  updateQuestion: async (id, updates) => {
    try {
      await updateQuestionInDB(id, updates);
      set((state) => ({
        questions: state.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
      }));
    } catch (e) {
      console.error('updateQuestion error:', e);
    }
  },

  deleteQuestion: async (id) => {
    try {
      await deleteQuestionFromDB(id);
      set((state) => ({ questions: state.questions.filter((q) => q.id !== id) }));
    } catch (e) {
      console.error('deleteQuestion error:', e);
    }
  },

  toggleQuestion: async (id) => {
    const q = get().questions.find((q) => q.id === id);
    if (!q) return;
    await get().updateQuestion(id, { isActive: !q.isActive });
  },

  addNote: async (userId, note) => {
    try {
      const newNote = await insertNote(userId, note);
      set((state) => ({ notes: [...state.notes, newNote] }));
    } catch (e) {
      console.error('addNote error:', e);
    }
  },

  deleteNote: async (id) => {
    try {
      await deleteNoteFromDB(id);
      set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    } catch (e) {
      console.error('deleteNote error:', e);
    }
  },

  getNotesByUser: (userId) => get().notes.filter((n) => n.userId === userId),

  reloadData: async () => {
    set({ isLoading: true });
    try {
      const [users, questions, notes] = await Promise.all([
        fetchAllUsers(),
        fetchQuestions(),
        fetchNotes(),
      ]);
      set({ users, questions, notes });
    } catch (e) {
      console.error('reloadData error:', e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
