'use client';

import React, { useState } from 'react';

interface UserSettings {
    theme: 'dark' | 'light';
    audioVisualization: boolean;
    notificationsEnabled: boolean;
    qualityPreset: 'low' | 'medium' | 'high';
    autoSavePresets: boolean;
    analyticsOptIn: boolean;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<UserSettings>({
          theme: 'dark',
          audioVisualization: true,
          notificationsEnabled: true,
          qualityPreset: 'high',
          autoSavePresets: true,
          analyticsOptIn: true,
    });

    const [saved, setSaved] = useState(false);

    const handleToggle = (key: keyof UserSettings) => {
          setSettings((prev) => ({
                  ...prev,
                  [key]: !prev[key],
          }));
    };

    const handlePresetChange = (preset: 'low' | 'medium' | 'high') => {
          setSettings((prev) => ({
                  ...prev,
                  qualityPreset: preset,
          }));
    };

    const handleThemeChange = (theme: 'dark' | 'light') => {
          setSettings((prev) => ({
                  ...prev,
                  theme,
          }));
    };

    const handleSave = async () => {
          try {
                  // In a real app, this would persist to a database
                  localStorage.setItem('userSettings', JSON.stringify(settings));
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
          } catch (error) {
                  console.error('Failed to save settings:', error);
          }
    };

    return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
                <div className="max-w-2xl mx-auto">
                        <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>h1>
                
                        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                          {/* Theme Setting */}
                                  <div className="border-b border-gray-700 pb-6">
                                              <h2 className="text-xl font-semibold text-white mb-4">Appearance</h2>h2>
                                              <div className="space-y-3">
                                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                                            <input
                                                                                                type="radio"
                                                                                                checked={settings.theme === 'dark'}
                                                                                                onChange={() => handleThemeChange('dark')}
                                                                                                className="w-4 h-4"
                                                                                              />
                                                                            <span className="text-gray-300">Dark Theme</span>span>
                                                            </label>label>
                                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                                            <input
                                                                                                type="radio"
                                                                                                checked={settings.theme === 'light'}
                                                                                                onChange={() => handleThemeChange('light')}
                                                                                                className="w-4 h-4"
                                                                                              />
                                                                            <span className="text-gray-300">Light Theme</span>span>
                                                            </label>label>
                                              </div>div>
                                  </div>div>
                        
                          {/* Quality Preset */}
                                  <div className="border-b border-gray-700 pb-6">
                                              <h2 className="text-xl font-semibold text-white mb-4">Visualization Quality</h2>h2>
                                              <div className="space-y-3">
                                                {(['low', 'medium', 'high'] as const).map((preset) => (
                            <label key={preset} className="flex items-center space-x-3 cursor-pointer">
                                              <input
                                                                    type="radio"
                                                                    checked={settings.qualityPreset === preset}
                                                                    onChange={() => handlePresetChange(preset)}
                                                                    className="w-4 h-4"
                                                                  />
                                              <span className="text-gray-300 capitalize">{preset} Quality</span>span>
                            </label>label>
                          ))}
                                              </div>div>
                                  </div>div>
                        
                          {/* Toggles */}
                                  <div className="space-y-4">
                                              <label className="flex items-center justify-between cursor-pointer">
                                                            <span className="text-gray-300">Audio Visualization</span>span>
                                                            <input
                                                                              type="checkbox"
                                                                              checked={settings.audioVisualization}
                                                                              onChange={() => handleToggle('audioVisualization')}
                                                                              className="w-5 h-5"
                                                                            />
                                              </label>label>
                                              <label className="flex items-center justify-between cursor-pointer">
                                                            <span className="text-gray-300">Enable Notifications</span>span>
                                                            <input
                                                                              type="checkbox"
                                                                              checked={settings.notificationsEnabled}
                                                                              onChange={() => handleToggle('notificationsEnabled')}
                                                                              className="w-5 h-5"
                                                                            />
                                              </label>label>
                                              <label className="flex items-center justify-between cursor-pointer">
                                                            <span className="text-gray-300">Auto-Save Presets</span>span>
                                                            <input
                                                                              type="checkbox"
                                                                              checked={settings.autoSavePresets}
                                                                              onChange={() => handleToggle('autoSavePresets')}
                                                                              className="w-5 h-5"
                                                                            />
                                              </label>label>
                                              <label className="flex items-center justify-between cursor-pointer">
                                                            <span className="text-gray-300">Analytics Opt-In</span>span>
                                                            <input
                                                                              type="checkbox"
                                                                              checked={settings.analyticsOptIn}
                                                                              onChange={() => handleToggle('analyticsOptIn')}
                                                                              className="w-5 h-5"
                                                                            />
                                              </label>label>
                                  </div>div>
                        
                          {/* Save Button */}
                                  <div className="pt-6 border-t border-gray-700">
                                              <button
                                                              onClick={handleSave}
                                                              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300"
                                                            >
                                                            Save Settings
                                              </button>button>
                                    {saved && (
                          <p className="text-green-400 text-center mt-2">Settings saved successfully!</p>p>
                                              )}
                                  </div>div>
                        </div>div>
                </div>div>
          </div>div>
        );
}</div>
