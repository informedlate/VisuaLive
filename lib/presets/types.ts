// Preset Types - Phase 3
// Defines the structure for visualization presets and their uniforms

export interface ShaderUniforms {
    [key: string]: {
          type: 'float' | 'int' | 'vec2' | 'vec3' | 'vec4' | 'mat3' | 'mat4' | 'sampler2D';
          value: number | number[] | WebGLTexture;
          min?: number;
          max?: number;
          step?: number;
    };
}

export interface Preset {
    id: string;
    name: string;
    description?: string;
    author: string;
    shader: {
      vertex: string;
      fragment: string;
    };
    uniforms: ShaderUniforms;
    audioResponsive: {
      bassSensitivity: number;
      midSensitivity: number;
      highSensitivity: number;
    };
    thumbnail?: string;
    tags?: string[];
    createdAt: number;
}

export interface VisualizerState {
    currentPreset: Preset | null;
    isPlaying: boolean;
    audioData: {
      frequency: Uint8Array | null;
      timeDomain: Uint8Array | null;
      bands: { bass: number; mid: number; high: number } | null;
    };
    error: string | null;
}
