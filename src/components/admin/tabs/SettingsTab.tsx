import { useState } from 'react';
import { Trash2, RefreshCw, Download, Upload, AlertTriangle, Check, Database } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export default function SettingsTab() {
  const { getAllUsers, deleteUser, exportData, reloadDB } = useStore();
  const [confirmClear, setConfirmClear] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showImport, setShowImport] = useState(false);

  const users = getAllUsers();

  const handleClearAll = () => {
    users.forEach(u => deleteUser(u.profile.id));
    setConfirmClear(false);
    reloadDB();
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtky_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed)) throw new Error('Invalid format');
      const existing = JSON.parse(localStorage.getItem('gtky_database') || '{}');
      existing.users = [...(existing.users || []), ...parsed];
      localStorage.setItem('gtky_database', JSON.stringify(existing));
      reloadDB();
      setImportStatus('success');
      setImportText('');
      setTimeout(() => setImportStatus('idle'), 3000);
    } catch {
      setImportStatus('error');
      setTimeout(() => setImportStatus('idle'), 3000);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setImportText(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-5">
      {/* Data Management */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-purple-500" />
          Data Management
        </h3>

        <div className="space-y-3">
          {/* Current DB Info */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{users.length}</p>
                <p className="text-xs text-gray-500">Total Profiles</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{users.filter(u => u.profile.isSubmitted).length}</p>
                <p className="text-xs text-gray-500">Submitted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">{users.filter(u => !u.profile.isSubmitted).length}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
            </div>
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors text-left"
          >
            <Download className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800 text-sm">Export All Data</p>
              <p className="text-xs text-blue-600">Download all responses as JSON backup file</p>
            </div>
          </button>

          {/* Import */}
          <button
            onClick={() => setShowImport(!showImport)}
            className="w-full flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors text-left"
          >
            <Upload className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800 text-sm">Import Data</p>
              <p className="text-xs text-green-600">Restore from a backup JSON file</p>
            </div>
          </button>

          {showImport && (
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <label className="block text-xs font-medium text-gray-600 mb-2">Upload JSON file or paste content</label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="block w-full text-xs text-gray-600 mb-2 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
              />
              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder='Paste JSON array here... [{"profile": {...}, ...}]'
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-xs resize-none font-mono"
                rows={4}
              />
              {importStatus === 'success' && (
                <p className="text-green-600 text-xs flex items-center gap-1 mt-2"><Check className="w-3 h-3" /> Import successful!</p>
              )}
              {importStatus === 'error' && (
                <p className="text-red-500 text-xs mt-2">⚠️ Invalid JSON format. Please check your file.</p>
              )}
              <div className="flex gap-2 mt-3">
                <button onClick={handleImport} className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600">
                  Import
                </button>
                <button onClick={() => { setShowImport(false); setImportText(''); }} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Reload */}
          <button
            onClick={() => { reloadDB(); }}
            className="w-full flex items-center gap-3 p-4 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition-colors text-left"
          >
            <RefreshCw className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-800 text-sm">Reload Database</p>
              <p className="text-xs text-purple-600">Refresh data from local storage</p>
            </div>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
        <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Danger Zone
        </h3>

        {confirmClear ? (
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <p className="text-sm text-red-700 font-medium mb-2">⚠️ This will permanently delete ALL {users.length} user profiles!</p>
            <p className="text-xs text-red-600 mb-4">This action cannot be undone. Consider exporting your data first.</p>
            <div className="flex gap-2">
              <button onClick={handleClearAll} className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600">
                Yes, Delete Everything
              </button>
              <button onClick={() => setConfirmClear(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmClear(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors border border-red-200"
            disabled={users.length === 0}
          >
            <Trash2 className="w-4 h-4" />
            Clear All User Data ({users.length} profiles)
          </button>
        )}
      </div>

      {/* About */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100">
        <h3 className="font-semibold text-gray-800 mb-3">💌 About This System</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Getting to Know You (GTKY) is a respectful and gradual way to learn more about your crush through a comfortable, pressure-free questionnaire system.
        </p>
        <div className="space-y-1.5 text-xs text-gray-500">
          <p>• <strong>Data Storage:</strong> Currently using Browser LocalStorage</p>
          <p>• <strong>Privacy:</strong> All data is stored locally — only accessible via admin password</p>
          <p>• <strong>Version:</strong> 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
