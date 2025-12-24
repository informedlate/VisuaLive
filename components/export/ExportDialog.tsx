'use client';

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
    const maxDuration = { free: 8, pro: 600, enterprise: 3600 }[userTier];

    const handleExport = async () => {
          if (!canvasRef.current) return;
          setIsExporting(true);
          onExportStart?.();

          try {
                  const exporter = new VideoExporter(canvasRef.current);
                  const blob = await exporter.export(duration * 1000, (p) =>
                            setProgress(Math.round(p * 100))
                                                           );
                  onExportComplete?.(blob);
          } finally {
                  setIsExporting(false);
                  setProgress(0);
                  onClose();
          }
    };

    if (!isOpen) return null;

    return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold text-white mb-4">Export Video</h2>h2>
                
                  {!canExport ? (
                      <div className="bg-yellow-900/20 border border-yellow-600 rounded p-3 mb-4">
                                  <p className="text-yellow-200 text-sm">
                                                Video export is available on Pro and Enterprise plans
                                  </p>p>
                      </div>div>
                    ) : (
                      <>
                                  <div className="mb-4">
                                                <label className="block text-sm text-gray-300 mb-2">
                                                                Duration (seconds): {duration}
                                                </label>label>
                                                <input
                                                                  type="range"
                                                                  min="5"
                                                                  max={maxDuration}
                                                                  value={duration}
                                                                  onChange={(e) => setDuration(Number(e.target.value))}
                                                                  className="w-full"
                                                                />
                                  </div>div>
                      
                        {isExporting && (
                                      <div className="mb-4">
                                                      <div className="w-full bg-gray-700 rounded h-2">
                                                                        <div
                                                                                              className="bg-blue-500 h-2 rounded transition-all"
                                                                                              style={{ width: `${progress}%` }}
                                                                                            />
                                                      </div>div>
                                                      <p className="text-gray-400 text-sm mt-2">{progress}%</p>p>
                                      </div>div>
                                  )}
                      
                                  <button
                                                  onClick={handleExport}
                                                  disabled={isExporting}
                                                  className="w-full bg-blue-600 text-white rounded py-2 font-medium disabled:opacity-50"
                                                >
                                    {isExporting ? 'Exporting...' : 'Export'}
                                  </button>button>
                      </>>
                    )}
                
                        <button
                                    onClick={onClose}
                                    className="w-full mt-3 bg-gray-700 text-white rounded py-2 font-medium hover:bg-gray-600"
                                  >
                                  Close
                        </button>button>
                </div>div>
          </div>div>
        );
}</></div>
