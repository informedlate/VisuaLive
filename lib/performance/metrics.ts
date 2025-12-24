lib/performance/metrics.tsexport interface PerformanceMetrics {
  fpsAverage: number;
  memoryUsage: number;
  renderTime: number;
  audioLatency: number;
  timestamp: number;
}

export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private metrics: PerformanceMetrics[] = [];

  measureFrame(): number {
    this.frameCount++;
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    if (deltaTime >= 1000) {
      const fps = (this.frameCount / deltaTime) * 1000;
      this.frameCount = 0;
      this.lastTime = currentTime;
      return Math.round(fps);
    }
    return 0;
  }

  recordMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric);
    if (this.metrics.length > 300) {
      this.metrics.shift();
    }
  }

  getAverageMetrics(): Partial<PerformanceMetrics> {
    if (this.metrics.length === 0) return {};

    const avg = {
      fpsAverage: 0,
      memoryUsage: 0,
      renderTime: 0,
      audioLatency: 0,
    };

    this.metrics.forEach((m) => {
      avg.fpsAverage += m.fpsAverage;
      avg.memoryUsage += m.memoryUsage;
      avg.renderTime += m.renderTime;
      avg.audioLatency += m.audioLatency;
    });

    const count = this.metrics.length;
    return {
      fpsAverage: avg.fpsAverage / count,
      memoryUsage: avg.memoryUsage / count,
      renderTime: avg.renderTime / count,
      audioLatency: avg.audioLatency / count,
    };
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  optimize(): void {
    // Reduce quality if FPS drops below 30
    const avgFps = this.getAverageMetrics().fpsAverage || 0;
    if (avgFps < 30 && avgFps > 0) {
      console.warn('Performance degradation detected, consider reducing quality');
    }
  }
}
