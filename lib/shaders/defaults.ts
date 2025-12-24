// Default Shader Library - Phase 4
// Collection of starter shaders for visualization

import { Preset, ShaderUniforms } from '../presets/types';

const DEFAULT_VERTEX_SHADER = `
  attribute vec4 position;
    void main() {
        gl_Position = position;
          }
          `;

// Gradient shader responsive to bass frequencies
const BASS_GRADIENT_SHADER = `
  precision mediump float;
    uniform float uBass;
      uniform float uMid;
        uniform float uHigh;
          uniform float uTime;

              void main() {
                  gl_FragColor = vec4(
                        uBass / 255.0,
                              uMid / 255.0,
                                    uHigh / 255.0,
                                          1.0
                                              );
                                                }
                                                `;

// Perlin-like noise visualization
const NOISE_SHADER = `
  precision mediump float;
    uniform float uBass;
      uniform float uTime;
        varying vec2 vCoord;

            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
                  }

                      void main() {
                          vec2 st = gl_FragCoord.xy / vec2(512.0);
                              float noise = random(st + uTime * 0.001);
                                  float bass = uBass / 255.0;
                                      gl_FragColor = vec4(noise * bass, noise * 0.5, noise, 1.0);
                                        }
                                        `;

// Oscillating particles
const PARTICLES_SHADER = `
  precision mediump float;
    uniform float uBass;
      uniform float uMid;
        uniform float uHigh;
          uniform float uTime;

              void main() {
                  vec2 st = gl_FragCoord.xy / vec2(512.0);
                      float dist = length(st - 0.5);
                          float wave = sin(dist * 20.0 - uTime * 0.01) * 0.5 + 0.5;
                              float color = wave * (uMid / 255.0);
                                  gl_FragColor = vec4(color, color * 0.8, color * 0.6, 1.0);
                                    }
                                    `;

export const DEFAULT_PRESETS: Preset[] = [
  {
        id: 'bass-gradient',
        name: 'Bass Gradient',
        description: 'Responsive color gradient driven by bass frequencies',
        author: 'VisuaLive',
        shader: {
                vertex: DEFAULT_VERTEX_SHADER,
                fragment: BASS_GRADIENT_SHADER,
        },
        uniforms: {
                uBass: { type: 'float', value: 0, min: 0, max: 255 },
                uMid: { type: 'float', value: 0, min: 0, max: 255 },
                uHigh: { type: 'float', value: 0, min: 0, max: 255 },
                uTime: { type: 'float', value: 0 },
        },
        audioResponsive: {
                bassSensitivity: 1.0,
                midSensitivity: 0.5,
                highSensitivity: 0.3,
        },
        tags: ['gradient', 'bass', 'reactive'],
        createdAt: Date.now(),
  },
  {
        id: 'noise-pattern',
        name: 'Noise Pattern',
        description: 'Perlin-like noise with bass intensity',
        author: 'VisuaLive',
        shader: {
                vertex: DEFAULT_VERTEX_SHADER,
                fragment: NOISE_SHADER,
        },
        uniforms: {
                uBass: { type: 'float', value: 0, min: 0, max: 255 },
                uTime: { type: 'float', value: 0 },
        },
        audioResponsive: {
                bassSensitivity: 1.0,
                midSensitivity: 0.0,
                highSensitivity: 0.0,
        },
        tags: ['noise', 'procedural'],
        createdAt: Date.now(),
  },
  {
        id: 'particle-wave',
        name: 'Particle Wave',
        description: 'Oscillating particle effect with audio sync',
        author: 'VisuaLive',
        shader: {
                vertex: DEFAULT_VERTEX_SHADER,
                fragment: PARTICLES_SHADER,
        },
        uniforms: {
                uBass: { type: 'float', value: 0, min: 0, max: 255 },
                uMid: { type: 'float', value: 0, min: 0, max: 255 },
                uHigh: { type: 'float', value: 0, min: 0, max: 255 },
                uTime: { type: 'float', value: 0 },
        },
        audioResponsive: {
                bassSensitivity: 0.8,
                midSensitivity: 0.6,
                highSensitivity: 0.4,
        },
        tags: ['particles', 'wave', 'animation'],
        createdAt: Date.now(),
  },
  ];
