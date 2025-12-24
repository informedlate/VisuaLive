// Audio Engine - Phase 2: Audio Input & Analysis
// Manages Web Audio API context and real-time frequency analysis

export interface AudioBands {
    bass: number;
    mid: number;
    high: number;
}

export class AudioEngine {
    private audioContext: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private dataArray: Uint8Array | null = null;
    private sourceNode: AudioNode | null = null;
    private isConnected = false;

  async initialize(): Promise<void> {
        if (this.audioContext) return;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.audioContext = audioContext;

      this.analyser = audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.analyser.connect(audioContext.destination);
  }

  async connectMicrophone(): Promise<void> {
        await this.initialize();

      const stream = await navigator.mediaDevices.getUserMedia({ 
                                                                     audio: { echoCancellation: true }
      });

      if (!this.audioContext) throw new Error('AudioContext not initialized');

      const source = this.audioContext.createMediaStreamAudioSource(stream);
        this.sourceNode = source;
        source.connect(this.analyser!);
        this.isConnected = true;
  }

  async connectFile(file: File): Promise<void> {
        await this.initialize();

      const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);

      const source = this.audioContext!.createBufferSource();
        source.buffer = audioBuffer;
        this.sourceNode = source;
        source.connect(this.analyser!);
        source.start();
        this.isConnected = true;
  }

  getFrequencyData(): Uint8Array {
        if (!this.analyser || !this.dataArray) {
                throw new Error('AudioEngine not initialized');
        }
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
  }

  getTimeDomainData(): Uint8Array {
        if (!this.analyser || !this.dataArray) {
                throw new Error('AudioEngine not initialized');
        }
        this.analyser.getByteTimeDomainData(this.dataArray);
        return this.dataArray;
  }

  getBands(): AudioBands {
        const data = this.getFrequencyData();
        const quarter = data.length / 4;

      const bass = data.slice(0, quarter).reduce((a, b) => a + b) / quarter;
        const mid = data.slice(quarter, quarter * 2).reduce((a, b) => a + b) / quarter;
        const high = data.slice(quarter * 2).reduce((a, b) => a + b) / (quarter * 2);

      return { bass, mid, high };
  }

  disconnect(): void {
        if (this.sourceNode) {
                this.sourceNode.disconnect();
        }
        this.isConnected = false;
  }

  getAudioContext(): AudioContext | null {
        return this.audioContext;
  }

  getAnalyser(): AnalyserNode | null {
        return this.analyser;
  }

  isPlaying(): boolean {
        return this.isConnected;
  }
}
