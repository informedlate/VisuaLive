components/export/ExportDialog.tsx'use client';
import React, { useState } from 'react';
import { VideoExporter } from '@/lib/export/videoExporter';
import { hasFeature, SubscriptionTier } from '@/lib/subscription/types';

interface ExportDialogProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isOpen: boolean;
  onClose: () => void;
  userTier: SubscriptionTier;
  onExportStart?: () => void;
  onExportComplete?: (blob: Blob) => void;
}

export function ExportDialog({
  canvasRef,
  isOpen,
  onClose,
  userTier,
  onExportStart,
  onExportComplete,
}: ExportDialogProps) {
  const [duration, setDuration] = useState<number>(30);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const canExport = hasFeature(userTier, 'videoExport');
  const maxDuration = { free: 0, pro: 600, enterprise: 3600 }[userTier];

  const handleExport = async () => {
    if (!canvasRef.current || !canExport) return;

    try {
      setIsExporting(true);
      onExportStart?.();
      setProgress(0);

      const canvas = canvasRef.current;
      const exporter = new VideoExporter(canvas, {
        width: canvas.width,
        height: canvas.height,
        fps: 30,
        duration,
        bitrate: 2500000,
      });

      await exporter.startRecording();

      // Simulate recording duration
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 100 / (duration * 30), 99));
      }, 1000);

      // Wait for duration
      await new Promise((resolve) => setTimeout(resolve, duration * 1000));
      clearInterval(interval);

      const blob = exporter.stopRecording();
      setProgress(100);

      exporter.downloadVideo(blob, `visualization-${Date.now()}.webm`);
      onExportComplete?.(blob);

      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 16px 0', color: '#fff' }}>Export Visualization</h2>

        {!canExport && (
          <div
            style={{
              backgroundColor: '#ff6b6b33',
              borderLeft: '3px solid #ff6b6b',
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '4px',
              color: '#ffcccc',
          }}
          >
            ⚠ Video export requires Pro or Enterprise tier
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>
            Duration (seconds): {duration}s
          </label>
          <input
            type="range"
            min="1"
            max={maxDuration || 60}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            disabled={!canExport || isExporting}
            style={{ width: '100%', cursor: canExport && !isExporting ? 'pointer' : 'not-allowed' }}
          />
          <small style={{ color: '#999' }}>Max: {maxDuration}s for {userTier} tier</small>
        </div>

        {isExporting && (
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                backgroundColor: '#333',
                borderRadius: '4px',
                height: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  backgroundColor: '#4ecdc4',
                  height: '100%',
                  width: `${progress}%`,
                  transition: 'width 0.2s ease',
                }}
              />
            </div>
            <small style={{ color: '#999', marginTop: '8px', display: 'block' }}>
              {Math.round(progress)}% complete
            </small>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            disabled={isExporting}
            style={{
              padding: '10px 20px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              opacity: isExporting ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={!canExport || isExporting}
            style={{
              padding: '10px 20px',
              backgroundColor: canExport ? '#4ecdc4' : '#666',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: canExport && !isExporting ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              opacity: canExport && !isExporting ? 1 : 0.5,
            }}
          >
            {isExporting ? 'Exporting...' : 'Export Video'}
          </button>
        </div>
      </div>
    </div>
  );
}
