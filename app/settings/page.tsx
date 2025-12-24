app/settings/page.tsx'use client';
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

  const handleQualityChange = (value: 'low' | 'medium' | 'high') => {
    setSettings((prev) => ({
      ...prev,
      qualityPreset: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('visualive_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px', fontSize: '28px' }}>Settings</h1>

        {saved && (
          <div
            style={{
              backgroundColor: '#4ecdc433',
              color: '#4ecdc4',
              padding: '12px 16px',
              borderRadius: '6px',
              marginBottom: '24px',
              border: '1px solid #4ecdc4',
            }}
          >
            ✓ Settings saved successfully
          </div>
        )}

        <div style={{ display: 'grid', gap: '24px' }}>
          {/* Theme Section */}
          <div style={{ borderBottom: '1px solid #222', paddingBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Appearance</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <label style={{ color: '#aaa' }}>Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as 'dark' | 'light' })}
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid #333',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>

          {/* Audio Section */}
          <div style={{ borderBottom: '1px solid #222', paddingBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Audio & Visualization</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <label style={{ color: '#aaa' }}>Real-time Visualization</label>
              <input
                type="checkbox"
                checked={settings.audioVisualization}
                onChange={() => handleToggle('audioVisualization')}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ color: '#aaa' }}>Quality Preset</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['low', 'medium', 'high'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleQualityChange(preset)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: settings.qualityPreset === preset ? '#4ecdc4' : '#1a1a1a',
                      color: settings.qualityPreset === preset ? '#000' : '#fff',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: settings.qualityPreset === preset ? 'bold' : 'normal',
                    }}
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div style={{ borderBottom: '1px solid #222', paddingBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Notifications & Saving</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ color: '#aaa' }}>Enable Notifications</label>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={() => handleToggle('notificationsEnabled')}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ color: '#aaa' }}>Auto-save Presets</label>
              <input
                type="checkbox"
                checked={settings.autoSavePresets}
                onChange={() => handleToggle('autoSavePresets')}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
            </div>
          </div>

          {/* Privacy Section */}
          <div style={{ borderBottom: '1px solid #222', paddingBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Privacy</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ color: '#aaa' }}>Share Analytics</label>
              <input
                type="checkbox"
                checked={settings.analyticsOptIn}
                onChange={() => handleToggle('analyticsOptIn')}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
            </div>
            <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
              Helps us improve VisuaLive (anonymous data only)
            </small>
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            marginTop: '30px',
            padding: '12px 24px',
            backgroundColor: '#4ecdc4',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
