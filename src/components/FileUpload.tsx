import { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string;
}

export function FileUpload({ onFileSelect, acceptedFormats = '.pdf,.ppt,.pptx' }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        setSelectedFile(files[0]);
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const clearFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <Upload className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Drop your file here
              </h3>
              <p className="text-gray-500 mb-4">
                or click to browse
              </p>
              <p className="text-sm text-gray-400">
                Supports PDF, PPT, and PPTX files
              </p>
            </div>

            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept={acceptedFormats}
                onChange={handleFileInput}
              />
              <span className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </span>
            </label>
          </div>
        </div>
      ) : (
        <div className="border-2 border-green-200 bg-green-50 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{selectedFile.name}</h4>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
