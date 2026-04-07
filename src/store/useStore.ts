import { create } from 'zustand';
import {
  CustomQuestion,
  UserResponse,
  AdminNote,
} from '../types';

const DB_KEY = 'gtky_database';
const SESSION_KEY = 'gtky_session';

interface Database {
  users: UserResponse[];
  questions: CustomQuestion[];
  notes: AdminNote[];
}

const defaultQuestions: CustomQuestion[] = [
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

function loadDB(): Database {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { users: [], questions: defaultQuestions, notes: [] };
}

function saveDB(db: Database) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

interface Session {
  role: 'admin' | 'user';
  userId?: string;
}

interface AppState {
  // Session
  session: Session | null;
  loginError: string;

  // DB
  db: Database;

  // Draft state for user form
  draft: Partial<UserResponse>;

  // UI
  currentUserPage: number;
  adminTab: string;

  // Actions - Auth
  loginAdmin: (password: string) => boolean;
  loginUser: (userId: string) => void;
  logout: () => void;
  loadSession: () => void;

  // Actions - User
  saveDraft: (section: string, data: Record<string, string>) => void;
  submitResponse: () => void;
  loadDraft: () => void;

  // Actions - Admin
  getAllUsers: () => UserResponse[];
  getUserById: (id: string) => UserResponse | undefined;
  deleteUser: (id: string) => void;
  exportData: () => string;
  addQuestion: (q: Omit<CustomQuestion, 'id' | 'createdAt'>) => void;
  updateQuestion: (id: string, updates: Partial<CustomQuestion>) => void;
  deleteQuestion: (id: string) => void;
  toggleQuestion: (id: string) => void;
  addNote: (userId: string, note: string) => void;
  deleteNote: (id: string) => void;
  getNotesByUser: (userId: string) => AdminNote[];
  reloadDB: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  session: null,
  loginError: '',
  db: loadDB(),
  draft: {},
  currentUserPage: 0,
  adminTab: 'dashboard',

  loadSession: () => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw) as Session;
        set({ session });
      }
    } catch {}
    set({ db: loadDB() });
  },

  loginAdmin: (password: string) => {
    if (password === 'aUgust122007') {
      const session: Session = { role: 'admin' };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      set({ session, loginError: '' });
      return true;
    }
    set({ loginError: 'Incorrect password. Please try again.' });
    return false;
  },

  loginUser: (userId: string) => {
    const db = loadDB();
    const existing = db.users.find(u => u.profile.id === userId);
    const session: Session = { role: 'user', userId: existing?.profile.id || userId };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

    if (!existing) {
      const newUser: UserResponse = {
        profile: {
          id: userId,
          name: '',
          nickname: '',
          location: '',
          school: '',
          birthday: '',
          age: '',
          submittedAt: '',
          updatedAt: new Date().toISOString(),
          isSubmitted: false,
        },
        interests: { userId, hobbies: '', favoriteFood: '', favoriteMusic: '', favoriteMovies: '', favoriteColor: '', favoritePlace: '' },
        personality: { userId, introvertOrExtrovert: '', beachOrMountains: '', coffeeOrMilkTea: '', freeTimeActivity: '', morningOrNight: '', catOrDog: '', stayInOrGoOut: '' },
        deeper: { userId, dreams: '', goals: '', whatMakesHappy: '', whatMakesComfortable: '', lifePhilosophy: '', idealDay: '' },
        customAnswers: {},
      };
      db.users.push(newUser);
      saveDB(db);
    }

    set({ session, db, draft: existing || {} });
  },

  logout: () => {
    sessionStorage.removeItem(SESSION_KEY);
    set({ session: null, draft: {}, loginError: '', adminTab: 'dashboard' });
  },

  saveDraft: (section: string, data: Record<string, string>) => {
    const { session, db } = get();
    if (!session?.userId) return;

    const idx = db.users.findIndex(u => u.profile.id === session.userId);
    if (idx === -1) return;

    const user = { ...db.users[idx] };

    if (section === 'profile') {
      user.profile = { ...user.profile, ...data, updatedAt: new Date().toISOString() };
    } else if (section === 'interests') {
      user.interests = { ...user.interests, ...data };
    } else if (section === 'personality') {
      user.personality = { ...user.personality, ...data };
    } else if (section === 'deeper') {
      user.deeper = { ...user.deeper, ...data };
    } else if (section === 'custom') {
      user.customAnswers = { ...user.customAnswers, ...data };
    }

    db.users[idx] = user;
    saveDB(db);
    set({ db: { ...db, users: [...db.users] }, draft: user });
  },

  submitResponse: () => {
    const { session, db } = get();
    if (!session?.userId) return;

    const idx = db.users.findIndex(u => u.profile.id === session.userId);
    if (idx === -1) return;

    db.users[idx].profile.isSubmitted = true;
    db.users[idx].profile.submittedAt = new Date().toISOString();
    saveDB(db);
    set({ db: { ...db, users: [...db.users] } });
  },

  loadDraft: () => {
    const { session, db } = get();
    if (!session?.userId) return;
    const user = db.users.find(u => u.profile.id === session.userId);
    if (user) set({ draft: user });
  },

  getAllUsers: () => get().db.users,

  getUserById: (id: string) => get().db.users.find(u => u.profile.id === id),

  deleteUser: (id: string) => {
    const db = get().db;
    db.users = db.users.filter(u => u.profile.id !== id);
    db.notes = db.notes.filter(n => n.userId !== id);
    saveDB(db);
    set({ db: { ...db } });
  },

  exportData: () => {
    const { db } = get();
    return JSON.stringify(db.users, null, 2);
  },

  addQuestion: (q) => {
    const db = get().db;
    const newQ: CustomQuestion = {
      ...q,
      id: `q_custom_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.questions = [...db.questions, newQ];
    saveDB(db);
    set({ db: { ...db } });
  },

  updateQuestion: (id, updates) => {
    const db = get().db;
    db.questions = db.questions.map(q => q.id === id ? { ...q, ...updates } : q);
    saveDB(db);
    set({ db: { ...db } });
  },

  deleteQuestion: (id) => {
    const db = get().db;
    db.questions = db.questions.filter(q => q.id !== id);
    saveDB(db);
    set({ db: { ...db } });
  },

  toggleQuestion: (id) => {
    const db = get().db;
    db.questions = db.questions.map(q => q.id === id ? { ...q, isActive: !q.isActive } : q);
    saveDB(db);
    set({ db: { ...db } });
  },

  addNote: (userId, note) => {
    const db = get().db;
    const newNote: AdminNote = {
      id: `note_${Date.now()}`,
      userId,
      note,
      createdAt: new Date().toISOString(),
    };
    db.notes = [...db.notes, newNote];
    saveDB(db);
    set({ db: { ...db } });
  },

  deleteNote: (id) => {
    const db = get().db;
    db.notes = db.notes.filter(n => n.id !== id);
    saveDB(db);
    set({ db: { ...db } });
  },

  getNotesByUser: (userId) => get().db.notes.filter(n => n.userId === userId),

  reloadDB: () => {
    set({ db: loadDB() });
  },
}));
