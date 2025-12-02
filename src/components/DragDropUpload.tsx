import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

import { motion } from 'framer-motion';
import { Upload, File, X } from 'lucide-react';

interface DragDropUploadProps {
  onFileUpload: (text: string, fileName: string) => void;
}

export const DragDropUpload = ({ onFileUpload }: DragDropUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileUpload(text, file.name);
    };
    reader.readAsText(file);
  };

  const clearFile = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.doc,.docx,.pdf"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />

        {fileName ? (
          <div className="flex items-center justify-center gap-4">
            <File className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-medium">{fileName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">File uploaded successfully</p>
            </div>
            <button
              onClick={clearFile}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Drop your resume here
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              or click to browse files
            </p>
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              Supports: TXT, DOC, DOCX, PDF
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
