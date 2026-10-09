'use client';

import React, { useRef } from 'react';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function ImageUploadInput({
  label,
  value,
  onChange,
  placeholder = 'Paste Image URL or click Upload...',
  className = '',
  required = false,
}: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WEBP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block">
          {label} {required && <span className="text-red-700">*</span>}
        </label>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="button"
          onClick={handleUploadClick}
          className="px-4 py-2 bg-secondary text-on-secondary font-label-caps text-[0.6875rem] uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm font-bold"
        >
          <span className="material-symbols-outlined text-[16px]">upload_file</span>
          Upload Image
        </button>
      </div>

      {/* Live Thumbnail Preview */}
      {value && (
        <div className="mt-2 p-2 bg-surface-container-low border border-surface-container-high flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={value}
              alt="Asset Preview"
              className="w-12 h-12 object-cover border border-surface-container-high bg-white flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="overflow-hidden text-ellipsis">
              <span className="font-label-caps text-[0.625rem] text-emerald-700 font-bold uppercase block">✓ Image Ready</span>
              <span className="font-mono text-[0.65rem] text-outline truncate block max-w-xs">{value.startsWith('data:') ? 'Local file uploaded (Base64)' : value}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 text-outline hover:text-red-700 transition-colors"
            title="Clear Image"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
