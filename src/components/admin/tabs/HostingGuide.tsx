import { useState } from 'react';
import {
  Globe, Database, Server, Copy, Check, ChevronDown, ChevronUp,
  ExternalLink, Code, Shield, Zap, BookOpen
} from 'lucide-react';

type Section = 'overview' | 'vercel' | 'netlify' | 'firebase' | 'supabase' | 'github' | 'schema';

export default function HostingGuide() {
  const [openSection, setOpenSection] = useState<Section | null>('overview');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggle = (section: Section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-6 h-6" />
          <h2 className="text-xl font-bold">Hosting & Database Guide</h2>
        </div>
        <p className="text-purple-100 text-sm">
          Step-by-step instructions to deploy your GTKY system online with a real database.
        </p>
      </div>

      {/* Overview */}
      <GuideSection
        id="overview"
        icon={<BookOpen className="w-5 h-5 text-blue-500" />}
        title="📋 Overview — What You Need"
        open={openSection === 'overview'}
        onToggle={() => toggle('overview')}
        color="blue"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm font-semibold text-blue-800 mb-2">Current State vs. Hosted Version</p>
            <div className="space-y-2 text-sm text-blue-700">
              <p>🔴 <strong>Right now:</strong> Data is saved in browser LocalStorage (only visible on the same device/browser)</p>
              <p>🟢 <strong>After hosting:</strong> Data is stored in a real database — accessible from anywhere</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 font-medium">Recommended Stack (Free Tier):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StackCard icon="🚀" title="Vercel" desc="Free frontend hosting — just connect GitHub" badge="Recommended" />
            <StackCard icon="🔥" title="Firebase" desc="Free database + auth — Google's platform" badge="Easy Setup" />
            <StackCard icon="⚡" title="Supabase" desc="PostgreSQL database with free tier" badge="Powerful" />
            <StackCard icon="🌐" title="Netlify" desc="Alternative to Vercel, also free" badge="Alternative" />
          </div>
        </div>
      </GuideSection>

      {/* Vercel Hosting */}
      <GuideSection
        id="vercel"
        icon={<Zap className="w-5 h-5 text-black" />}
        title="🚀 Deploy on Vercel (Recommended)"
        open={openSection === 'vercel'}
        onToggle={() => toggle('vercel')}
        color="gray"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Vercel is the easiest way to host a React/Vite app for free.</p>

          <StepList steps={[
            {
              step: 1,
              title: 'Create a GitHub Repository',
              desc: 'Go to github.com → Click "New Repository" → Name it (e.g. gtky-app) → Initialize with README',
              code: null,
            },
            {
              step: 2,
              title: 'Push Your Code to GitHub',
              desc: 'In your project folder, run these commands:',
              code: `git init\ngit add .\ngit commit -m "Initial commit"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/gtky-app.git\ngit push -u origin main`,
              codeKey: 'git-push',
            },
            {
              step: 3,
              title: 'Sign Up at Vercel',
              desc: 'Go to vercel.com → Click "Sign Up" → Continue with GitHub → Authorize Vercel',
              code: null,
              link: { text: 'Visit Vercel →', url: 'https://vercel.com' },
            },
            {
              step: 4,
              title: 'Import Your Project',
              desc: 'In Vercel Dashboard → Click "Add New Project" → Select your GitHub repo → Click "Import"',
              code: null,
            },
            {
              step: 5,
              title: 'Configure Build Settings',
              desc: 'Vercel will auto-detect Vite. Make sure these settings are correct:',
              code: `Framework Preset: Vite\nBuild Command: npm run build\nOutput Directory: dist\nInstall Command: npm install`,
              codeKey: 'vercel-config',
            },
            {
              step: 6,
              title: 'Click Deploy!',
              desc: 'Vercel will build and deploy your app. You\'ll get a URL like: https://gtky-app.vercel.app',
              code: null,
            },
            {
              step: 7,
              title: 'Share the Link with Your Crush',
              desc: 'Send your URL to your crush. They can open it on any device and fill it out!',
              code: null,
            },
          ]} onCopy={copyToClipboard} copied={copied} />
        </div>
      </GuideSection>

      {/* Netlify */}
      <GuideSection
        id="netlify"
        icon={<Globe className="w-5 h-5 text-teal-500" />}
        title="🌐 Deploy on Netlify (Alternative)"
        open={openSection === 'netlify'}
        onToggle={() => toggle('netlify')}
        color="teal"
      >
        <div className="space-y-4">
          <StepList steps={[
            {
              step: 1,
              title: 'Build your project locally',
              desc: 'Run the build command first:',
              code: 'npm run build',
              codeKey: 'netlify-build',
            },
            {
              step: 2,
              title: 'Sign Up at Netlify',
              desc: 'Go to netlify.com → Sign up free → Connect with GitHub',
              code: null,
              link: { text: 'Visit Netlify →', url: 'https://netlify.com' },
            },
            {
              step: 3,
              title: 'Drag & Drop Deploy (Simplest Method)',
              desc: 'In Netlify → Click "Sites" → Drag your "dist" folder into the deploy zone',
              code: null,
            },
            {
              step: 4,
              title: 'Or Connect GitHub for Auto-Deploy',
              desc: 'Netlify → "Add new site" → Import from Git → Select repo → Set build command',
              code: `Build Command: npm run build\nPublish Directory: dist`,
              codeKey: 'netlify-config',
            },
          ]} onCopy={copyToClipboard} copied={copied} />
        </div>
      </GuideSection>

      {/* Firebase Database */}
      <GuideSection
        id="firebase"
        icon={<Database className="w-5 h-5 text-orange-500" />}
        title="🔥 Firebase Database Setup (Free)"
        open={openSection === 'firebase'}
        onToggle={() => toggle('firebase')}
        color="orange"
      >
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-orange-800">
              Firebase Firestore lets you store data in the cloud so responses are saved permanently and visible from any device.
            </p>
          </div>

          <StepList steps={[
            {
              step: 1,
              title: 'Create Firebase Project',
              desc: 'Go to firebase.google.com → Click "Get Started" → Create a project → Name it "gtky-app"',
              code: null,
              link: { text: 'Firebase Console →', url: 'https://firebase.google.com' },
            },
            {
              step: 2,
              title: 'Enable Firestore Database',
              desc: 'In Firebase Console → Build → Firestore Database → Create Database → Start in Test Mode (for now)',
              code: null,
            },
            {
              step: 3,
              title: 'Register Your Web App',
              desc: 'Project Settings → Add App → Web → Register → Copy the config values',
              code: null,
            },
            {
              step: 4,
              title: 'Install Firebase SDK',
              desc: 'In your project terminal:',
              code: 'npm install firebase',
              codeKey: 'firebase-install',
            },
            {
              step: 5,
              title: 'Create Firebase Config File',
              desc: 'Create src/lib/firebase.ts with your project config:',
              code: `import { initializeApp } from 'firebase/app';\nimport { getFirestore } from 'firebase/firestore';\n\nconst firebaseConfig = {\n  apiKey: "YOUR_API_KEY",\n  authDomain: "YOUR_PROJECT.firebaseapp.com",\n  projectId: "YOUR_PROJECT_ID",\n  storageBucket: "YOUR_PROJECT.appspot.com",\n  messagingSenderId: "YOUR_SENDER_ID",\n  appId: "YOUR_APP_ID"\n};\n\nconst app = initializeApp(firebaseConfig);\nexport const db = getFirestore(app);`,
              codeKey: 'firebase-config',
            },
            {
              step: 6,
              title: 'Set Firestore Security Rules',
              desc: 'In Firestore → Rules tab → Replace with secure rules:',
              code: `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    // Users can write their own data\n    match /users/{userId} {\n      allow read, write: if true; // Change to auth-based later\n    }\n    // Only authenticated admin can read all\n    match /admin/{document=**} {\n      allow read, write: if false; // Set up admin auth\n    }\n  }\n}`,
              codeKey: 'firebase-rules',
            },
            {
              step: 7,
              title: 'Update .env for Production',
              desc: 'Create a .env file in root with your Firebase config (add to .gitignore!):',
              code: `VITE_FIREBASE_API_KEY=your_api_key\nVITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com\nVITE_FIREBASE_PROJECT_ID=your_project_id`,
              codeKey: 'firebase-env',
            },
          ]} onCopy={copyToClipboard} copied={copied} />
        </div>
      </GuideSection>

      {/* Supabase */}
      <GuideSection
        id="supabase"
        icon={<Server className="w-5 h-5 text-green-500" />}
        title="⚡ Supabase Database (PostgreSQL)"
        open={openSection === 'supabase'}
        onToggle={() => toggle('supabase')}
        color="green"
      >
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm text-green-800">
              Supabase is an open-source Firebase alternative with a real PostgreSQL database. Great for more complex needs.
            </p>
          </div>

          <StepList steps={[
            {
              step: 1,
              title: 'Create Supabase Project',
              desc: 'Go to supabase.com → Create account → New Project → Name it "gtky-app" → Save your database password!',
              code: null,
              link: { text: 'Visit Supabase →', url: 'https://supabase.com' },
            },
            {
              step: 2,
              title: 'Install Supabase Client',
              code: 'npm install @supabase/supabase-js',
              codeKey: 'supabase-install',
              desc: '',
            },
            {
              step: 3,
              title: 'Create Supabase Config',
              desc: 'Create src/lib/supabase.ts:',
              code: `import { createClient } from '@supabase/supabase-js';\n\nconst supabaseUrl = import.meta.env.VITE_SUPABASE_URL;\nconst supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;\n\nexport const supabase = createClient(supabaseUrl, supabaseKey);`,
              codeKey: 'supabase-config',
            },
            {
              step: 4,
              title: 'Create Database Tables (SQL Editor)',
              desc: 'In Supabase → SQL Editor → Run this schema:',
              code: `-- See the Database Schema section below for full SQL`,
              codeKey: 'supabase-tables',
            },
          ]} onCopy={copyToClipboard} copied={copied} />
        </div>
      </GuideSection>

      {/* Database Schema */}
      <GuideSection
        id="schema"
        icon={<Code className="w-5 h-5 text-indigo-500" />}
        title="🗄️ Database Schema (SQL)"
        open={openSection === 'schema'}
        onToggle={() => toggle('schema')}
        color="indigo"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Use this schema for Supabase or any PostgreSQL database. It matches the data structure of this system.
          </p>

          <CodeBlock
            label="Full Database Schema"
            code={`-- Users basic profile table
CREATE TABLE user_profiles (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(200),
  nickname VARCHAR(100),
  location VARCHAR(200),
  school VARCHAR(200),
  birthday VARCHAR(100),
  age VARCHAR(20),
  is_submitted BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interests table
CREATE TABLE user_interests (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES user_profiles(id) ON DELETE CASCADE,
  hobbies TEXT,
  favorite_food VARCHAR(200),
  favorite_music VARCHAR(200),
  favorite_movies TEXT,
  favorite_color VARCHAR(100),
  favorite_place VARCHAR(200)
);

-- Personality table
CREATE TABLE user_personality (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES user_profiles(id) ON DELETE CASCADE,
  introvert_or_extrovert VARCHAR(100),
  beach_or_mountains VARCHAR(100),
  coffee_or_milk_tea VARCHAR(100),
  free_time_activity TEXT,
  morning_or_night VARCHAR(100),
  cat_or_dog VARCHAR(100),
  stay_in_or_go_out VARCHAR(100)
);

-- Deeper questions table
CREATE TABLE user_deeper (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES user_profiles(id) ON DELETE CASCADE,
  dreams TEXT,
  goals TEXT,
  what_makes_happy TEXT,
  what_makes_comfortable TEXT,
  life_philosophy TEXT,
  ideal_day TEXT
);

-- Custom questions table
CREATE TABLE custom_questions (
  id VARCHAR(100) PRIMARY KEY,
  category VARCHAR(50),
  question TEXT NOT NULL,
  type VARCHAR(20),
  options JSONB,
  is_required BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  field_key VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom answers table
CREATE TABLE custom_answers (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES user_profiles(id) ON DELETE CASCADE,
  question_id VARCHAR(100) REFERENCES custom_questions(id),
  field_key VARCHAR(100),
  answer TEXT
);

-- Admin notes table
CREATE TABLE admin_notes (
  id VARCHAR(100) PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES user_profiles(id) ON DELETE CASCADE,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_interests_user_id ON user_interests(user_id);
CREATE INDEX idx_user_personality_user_id ON user_personality(user_id);
CREATE INDEX idx_user_deeper_user_id ON user_deeper(user_id);
CREATE INDEX idx_admin_notes_user_id ON admin_notes(user_id);`}
            codeKey="full-schema"
            onCopy={copyToClipboard}
            copied={copied}
          />

          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-sm font-semibold text-indigo-800 mb-2">📌 How to use this schema:</p>
            <ul className="space-y-1 text-sm text-indigo-700">
              <li>1. Go to Supabase → SQL Editor</li>
              <li>2. Paste the SQL above and click "Run"</li>
              <li>3. Your tables will be created automatically</li>
              <li>4. Update the app store to use Supabase instead of LocalStorage</li>
            </ul>
          </div>
        </div>
      </GuideSection>

      {/* Security */}
      <GuideSection
        id="github"
        icon={<Shield className="w-5 h-5 text-red-500" />}
        title="🔒 Security Best Practices"
        open={openSection === 'github'}
        onToggle={() => toggle('github')}
        color="red"
      >
        <div className="space-y-4">
          <SecurityItem
            icon="🔑"
            title="Never Commit Your Password or API Keys"
            desc='Keep your admin password and Firebase/Supabase keys in a .env file. Add .env to your .gitignore file so it never gets uploaded to GitHub.'
          />
          <SecurityItem
            icon="🛡️"
            title="Use Environment Variables"
            desc='In Vercel/Netlify, add your secret keys in their "Environment Variables" settings panel — never hardcode them in your source code.'
          />
          <SecurityItem
            icon="🔐"
            title="Set Strong Database Rules"
            desc='In Firebase or Supabase, set rules so users can only write their own data, and admin reads are protected by authentication.'
          />
          <SecurityItem
            icon="📧"
            title="Consider Adding Email Auth"
            desc='For extra security, use Firebase Authentication to require users to sign in with their email before filling out the form.'
          />
          <SecurityItem
            icon="🗑️"
            title="Data Privacy"
            desc='Remember: your crush is sharing personal information. Keep it private, respect their answers, and never share them with others.'
          />

          <CodeBlock
            label=".gitignore (add these lines)"
            code={`.env\n.env.local\n.env.production\nnode_modules/\ndist/`}
            codeKey="gitignore"
            onCopy={copyToClipboard}
            copied={copied}
          />
        </div>
      </GuideSection>

      {/* Final Tips */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100">
        <h3 className="font-semibold text-gray-800 mb-3">💌 Final Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5 flex-shrink-0">♥</span>
            <span>Share the URL naturally — "Hey, I made this fun little form, want to fill it out?" works perfectly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5 flex-shrink-0">♥</span>
            <span>Tell them there's no wrong answers and they can skip anything they're not comfortable with</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5 flex-shrink-0">♥</span>
            <span>Use their answers to start meaningful conversations — not to overwhelm them with everything at once</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-0.5 flex-shrink-0">♥</span>
            <span>Good luck! 🌸 The fact that you made this shows how much you care.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function GuideSection({ id: _id, icon, title, open, onToggle, color, children }: {
  id: string;
  icon: React.ReactNode;
  title: string;
  open: boolean;
  onToggle: () => void;
  color: string;
  children: React.ReactNode;
}) {
  const borderColors: Record<string, string> = {
    blue: 'border-blue-100',
    gray: 'border-gray-200',
    teal: 'border-teal-100',
    orange: 'border-orange-100',
    green: 'border-green-100',
    indigo: 'border-indigo-100',
    red: 'border-red-100',
  };

  return (
    <div className={`bg-white rounded-2xl border ${borderColors[color] || 'border-gray-100'} shadow-sm overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-gray-800 text-sm sm:text-base">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-50">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

function StepList({ steps, onCopy, copied }: {
  steps: { step: number; title: string; desc: string; code: string | null; codeKey?: string; link?: { text: string; url: string } }[];
  onCopy: (text: string, key: string) => void;
  copied: string | null;
}) {
  return (
    <div className="space-y-4">
      {steps.map(s => (
        <div key={s.step} className="flex gap-3">
          <div className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            {s.step}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm mb-1">{s.title}</p>
            {s.desc && <p className="text-sm text-gray-600 mb-2">{s.desc}</p>}
            {s.link && (
              <a
                href={s.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 mb-2"
              >
                {s.link.text} <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {s.code && s.codeKey && (
              <CodeBlock label="" code={s.code} codeKey={s.codeKey} onCopy={onCopy} copied={copied} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ label, code, codeKey, onCopy, copied }: {
  label: string;
  code: string;
  codeKey: string;
  onCopy: (text: string, key: string) => void;
  copied: string | null;
}) {
  return (
    <div className="relative">
      {label && <p className="text-xs font-medium text-gray-600 mb-1">{label}</p>}
      <div className="bg-gray-900 rounded-xl p-4 pr-12 relative">
        <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">{code}</pre>
        <button
          onClick={() => onCopy(code, codeKey)}
          className="absolute top-3 right-3 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          title="Copy to clipboard"
        >
          {copied === codeKey
            ? <Check className="w-3 h-3 text-green-400" />
            : <Copy className="w-3 h-3 text-gray-400" />
          }
        </button>
      </div>
    </div>
  );
}

function StackCard({ icon, title, desc, badge }: { icon: string; title: string; desc: string; badge: string }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-1">
        <span className="text-xl">{icon}</span>
        <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-100">{badge}</span>
      </div>
      <p className="font-semibold text-gray-800 text-sm">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
    </div>
  );
}

function SecurityItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{title}</p>
        <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

import React from 'react';
