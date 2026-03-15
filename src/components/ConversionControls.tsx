import { Zap, Settings } from 'lucide-react';

interface ConversionControlsProps {
  format: 'png' | 'jpeg';
  onFormatChange: (format: 'png' | 'jpeg') => void;
  onConvert: () => void;
  isConverting: boolean;
  disabled?: boolean;
}

export function ConversionControls({
  format,
  onFormatChange,
  onConvert,
  isConverting,
  disabled = false,
}: ConversionControlsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Conversion Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Output Format
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => onFormatChange('png')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  format === 'png'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                PNG
              </button>
              <button
                onClick={() => onFormatChange('jpeg')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  format === 'jpeg'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                JPEG
              </button>
            </div>
          </div>

          <button
            onClick={onConvert}
            disabled={disabled || isConverting}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
              disabled || isConverting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
            }`}
          >
            <Zap className="w-6 h-6" />
            {isConverting ? 'Converting...' : 'Start Conversion'}
          </button>
        </div>
      </div>
    </div>
  );
}
