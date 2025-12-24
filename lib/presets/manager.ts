lib/presets/manager.tsimport { Preset } from './types';
import { defaultPresets } from '../shaders/defaults';

export class PresetManager {
  private presets: Map<string, Preset>;
  private currentPresetId: string | null = null;

  constructor() {
    this.presets = new Map();
    this.loadDefaults();
    this.loadFromStorage();
  }

  private loadDefaults(): void {
    defaultPresets.forEach(preset => {
      this.presets.set(preset.id, preset);
    });
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('visualive_presets');
    if (stored) {
      try {
        const presets = JSON.parse(stored);
        Object.entries(presets).forEach(([id, preset]: [string, any]) => {
          this.presets.set(id, preset);
        });
      } catch (e) {
        console.error('Failed to load presets from storage', e);
      }
    }
  }

  saveToStorage(): void {
    if (typeof window === 'undefined') return;
    const presetObj: Record<string, Preset> = {};
    this.presets.forEach((preset, id) => {
      presetObj[id] = preset;
    });
    localStorage.setItem('visualive_presets', JSON.stringify(presetObj));
  }

  getPreset(id: string): Preset | undefined {
    return this.presets.get(id);
  }

  getAllPresets(): Preset[] {
    return Array.from(this.presets.values());
  }

  addPreset(preset: Preset): void {
    this.presets.set(preset.id, preset);
    this.saveToStorage();
  }

  deletePreset(id: string): void {
    this.presets.delete(id);
    this.saveToStorage();
    if (this.currentPresetId === id) {
      this.currentPresetId = null;
    }
  }

  setCurrentPreset(id: string): boolean {
    if (this.presets.has(id)) {
      this.currentPresetId = id;
      return true;
    }
    return false;
  }

  getCurrentPreset(): Preset | null {
    if (!this.currentPresetId) return null;
    return this.presets.get(this.currentPresetId) || null;
  }

  getCurrentPresetId(): string | null {
    return this.currentPresetId;
  }

  updatePreset(id: string, updates: Partial<Preset>): void {
    const preset = this.presets.get(id);
    if (preset) {
      const updated = { ...preset, ...updates };
      this.presets.set(id, updated);
      this.saveToStorage();
    }
  }
}
