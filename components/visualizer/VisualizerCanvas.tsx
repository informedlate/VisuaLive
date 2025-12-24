components/visualizer/VisualizerCanvas.tsx'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useVisualizer } from '@/hooks/useVisualizer';

interface VisualizerCanvasProps {
  className?: string;
  width?: number;
  height?: number;
  onPresetChange?: (presetId: string) => void;
}

export function VisualizerCanvas({
  className = '',
  width = 1280,
  height = 720,
  onPresetChange,
}: VisualizerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    state,
    initializeAudio,
    switchPreset,
    startVisualization,
    stopVisualization,
    getAllPresets,
  } = useVisualizer(canvasRef);

  const [presets, setPresets] = useState<any[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [audioSource, setAudioSource] = useState<'microphone' | 'file' | null>(null);

  useEffect(() => {
    const availablePresets = getAllPresets();
    setPresets(availablePresets);
    if (availablePresets.length > 0) {
      const firstPresetId = availablePresets[0].id;
      setSelectedPresetId(firstPresetId);
      switchPreset(firstPresetId);
    }
  }, [getAllPresets, switchPreset]);

  const handleStartMicrophone = async () => {
    try {
      await initializeAudio('microphone');
      setAudioSource('microphone');
    } catch (error) {
      console.error('Microphone initialization failed:', error);
    }
  };

  const handleLoadFile = async (file: File) => {
    try {
      await initializeAudio('file', file);
      setAudioSource('file');
    } catch (error) {
      console.error('File loading failed:', error);
    }
  };

  const handlePresetChange = (presetId: string) => {
    switchPreset(presetId);
    setSelectedPresetId(presetId);
    onPresetChange?.(presetId);
  };

  const handleStop = () => {
    stopVisualization();
    setAudioSource(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleLoadFile(file);
    }
  };

  return (
    <div className={`visualizer-container ${className}`}>
      <div className="visualizer-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="visualizer-canvas"
          style={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#000',
            borderRadius: '8px',
          }}
        />
      </div>

      <div className="visualizer-controls" style={{ marginTop: '20px' }}>
        <div className="audio-controls" style={{ marginBottom: '16px' }}>
          <button
            onClick={handleStartMicrophone}
            disabled={audioSource !== null}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              cursor: audioSource ? 'not-allowed' : 'pointer',
              opacity: audioSource ? 0.5 : 1,
            }}
          >
            🎤 Start Microphone
          </button>
          <label style={{ marginRight: '8px' }}>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              disabled={audioSource !== null}
              style={{ cursor: 'pointer' }}
            />
            📁 Load Audio File
          </label>
          <button
            onClick={handleStop}
            disabled={!audioSource}
            style={{
              padding: '8px 16px',
              cursor: audioSource ? 'pointer' : 'not-allowed',
              opacity: audioSource ? 1 : 0.5,
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            ⏹ Stop
          </button>
        </div>

        <div className="preset-controls">
          <label style={{ marginRight: '8px' }}>Preset:</label>
          <select
            value={selectedPresetId || ''}
            onChange={(e) => handlePresetChange(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Select a preset...</option>
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        {state.isPlaying && (
          <div className="status" style={{ marginTop: '12px', fontSize: '14px' }}>
            ✓ Now visualizing: {state.currentPreset?.name || 'Loading...'}
          </div>
        )}
      </div>
    </div>
  );
}
