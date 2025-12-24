// Shader Manager - Phase 3: WebGL Visualization
// Manages shader compilation and uniform updates

import { Preset, ShaderUniforms } from '../presets/types';

export class ShaderManager {
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private uniforms: Map<string, WebGLUniformLocation> = new Map();

  constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
  }

  compile(preset: Preset): boolean {
        try {
                const vertexShader = this.compileShader(preset.shader.vertex, this.gl.VERTEX_SHADER);
                const fragmentShader = this.compileShader(preset.shader.fragment, this.gl.FRAGMENT_SHADER);

          if (!vertexShader || !fragmentShader) return false;

          this.program = this.gl.createProgram();
                if (!this.program) return false;

          this.gl.attachShader(this.program, vertexShader);
                this.gl.attachShader(this.program, fragmentShader);
                this.gl.linkProgram(this.program);

          if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
                    console.error('Program link failed:', this.gl.getProgramInfoLog(this.program));
                    return false;
          }

          this.gl.useProgram(this.program);
                this.cacheUniformLocations(preset.uniforms);
                return true;
        } catch (e) {
                console.error('Shader compilation failed:', e);
                return false;
        }
  }

  private compileShader(source: string, type: number): WebGLShader | null {
        const shader = this.gl.createShader(type);
        if (!shader) return null;

      this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
              console.error('Shader compile failed:', this.gl.getShaderInfoLog(shader));
              return null;
      }
        return shader;
  }

  private cacheUniformLocations(uniforms: ShaderUniforms): void {
        this.uniforms.clear();
        if (!this.program) return;

      Object.keys(uniforms).forEach(name => {
              const loc = this.gl.getUniformLocation(this.program!, name);
              if (loc !== null) {
                        this.uniforms.set(name, loc);
              }
      });
  }

  updateUniforms(uniforms: ShaderUniforms): void {
        if (!this.program) return;
        this.gl.useProgram(this.program);

      Object.entries(uniforms).forEach(([name, uniform]) => {
              const loc = this.uniforms.get(name);
              if (!loc) return;

                                             switch (uniform.type) {
                                               case 'float':
                                                           this.gl.uniform1f(loc, uniform.value as number);
                                                           break;
                                               case 'vec2':
                                                           this.gl.uniform2fv(loc, uniform.value as number[]);
                                                           break;
                                               case 'vec3':
                                                           this.gl.uniform3fv(loc, uniform.value as number[]);
                                                           break;
                                               case 'vec4':
                                                           this.gl.uniform4fv(loc, uniform.value as number[]);
                                                           break;
                                             }
      });
  }

  getProgram(): WebGLProgram | null {
        return this.program;
  }

  destroy(): void {
        if (this.program) {
                this.gl.deleteProgram(this.program);
                this.program = null;
        }
        this.uniforms.clear();
  }
}
