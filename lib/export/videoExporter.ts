lib/export/videoExporter.tsexport interface VideoExportOptions {
  width: number;
  height: number;
  fps: number;
  duration: number;
  bitrate?: number;
  format?: 'mp4' | 'webm';
}

export interface ExportProgress {
  currentFrame: number;
  totalFrames: number;
  percentage: number;
}

export class VideoExporter {
  private canvas: HTMLCanvasElement;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private options: VideoExportOptions;

  constructor(canvas: HTMLCanvasElement, options: VideoExportOptions) {
    this.canvas = canvas;
    this.options = options;
  }

  async startRecording(): Promise<void> {
    const stream = this.canvas.captureStream(this.options.fps);
    const videoTrack = stream.getVideoTracks()[0];

    if (!videoTrack) {
      throw new Error('Failed to capture canvas stream');
    }

    const mimeType = this.getSupportedMimeType();
    const mediaRecorderOptions: MediaRecorderOptions = {
      mimeType,
      videoBitsPerSecond: this.options.bitrate || 2500000,
    };

    this.mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);
    this.recordedChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
  }

  stopRecording(): Blob {
    if (!this.mediaRecorder) {
      throw new Error('Recording not started');
    }

    this.mediaRecorder.stop();
    const blob = new Blob(this.recordedChunks, { type: this.mediaRecorder.mimeType });
    return blob;
  }

  downloadVideo(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private getSupportedMimeType(): string {
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4',
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return 'video/webm';
  }

  getEstimatedSize(): number {
    const videoSeconds = this.options.duration;
    const bitratePerSecond = (this.options.bitrate || 2500000) / 8;
    return videoSeconds * bitratePerSecond;
  }
}
