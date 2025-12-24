hooks/useVisualizer.ts'use client';
import { useEffect, useRef, useState } from 'react';
import { AudioEngine } from '@/lib/audio/engine';
import { PresetManager } from '@/lib/presets/manager';
import { ShaderManager } from '@/lib/shaders/manager';
import { Preset } from '@/lib/presets/types';

interface VisualizerState {
  isAudioReady: boolean;
  currentPreset: Preset | null;
  frequencyData: Uint8Array;
  isPlaying: boolean;
}

export function useVisualizer(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const presetManagerRef = useRef<PresetManager | null>(null);
  const shaderManagerRef = useRef<ShaderManager | null>(null);
  const [state, setState] = useState<VisualizerState>({
    isAudioReady: false,
    currentPreset: null,
    frequencyData: new Uint8Array(256),
    isPlaying: false,
  });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    audioEngineRef.current = new AudioEngine();
    presetManagerRef.current = new PresetManager();
    shaderManagerRef.current = new ShaderManager(gl);

    setState(prev => ({ ...prev, isAudioReady: true }));

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef]);

  const initializeAudio = async (source: 'microphone' | 'file', fileOrDeviceId?: File | string) => {
    if (!audioEngineRef.current || !presetManagerRef.current) return;

    try {
      if (source === 'microphone') {
        await audioEngineRef.current.initializeMicrophone();
      } else if (source === 'file' && fileOrDeviceId instanceof File) {
        await audioEngineRef.current.loadAudioFile(fileOrDeviceId);
      }
      setState(prev => ({ ...prev, isPlaying: true }));
      startVisualization();
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  };

  const switchPreset = (presetId: string) => {
    if (!presetManagerRef.current) return;
    const success = presetManagerRef.current.setCurrentPreset(presetId);
    if (success) {
      const preset = presetManagerRef.current.getCurrentPreset();
      setState(prev => ({ ...prev, currentPreset: preset }));
    }
  };

  const getFrequencyData = () => {
    if (!audioEngineRef.current) return new Uint8Array(256);
    return audioEngineRef.current.getFrequencyData();
  };

  const startVisualization = () => {
    if (!canvasRef.current || !shaderManagerRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const render = () => {
      const frequencyData = getFrequencyData();
      setState(prev => ({ ...prev, frequencyData }));

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const preset = presetManagerRef.current?.getCurrentPreset();
      if (preset && shaderManagerRef.current) {
        shaderManagerRef.current.setUniform('uFrequency', frequencyData);
        shaderManagerRef.current.setUniform('uTime', performance.now() / 1000);
        shaderManagerRef.current.render();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);
  };

  const stopVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const getAllPresets = () => {
    return presetManagerRef.current?.getAllPresets() || [];
  };

  return {
    state,
    initializeAudio,
    switchPreset,
    startVisualization,
    stopVisualization,
    getAllPresets,
    audioEngine: audioEngineRef.current,
    presetManager: presetManagerRef.current,
    shaderManager: shaderManagerRef.current,
  };
}
