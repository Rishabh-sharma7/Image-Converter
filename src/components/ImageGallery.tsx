import { Download, Image as ImageIcon } from 'lucide-react';
import { ConvertedImage } from '../lib/pdfConverter';
import { downloadSingleImage, downloadAllAsZip } from '../lib/downloadUtils';

interface ImageGalleryProps {
  images: ConvertedImage[];
  filename: string;
  format: 'png' | 'jpeg';
}

export function ImageGallery({ images, filename, format }: ImageGalleryProps) {
  const handleDownloadAll = async () => {
    await downloadAllAsZip(images, filename, format);
  };

  const handleDownloadSingle = (image: ConvertedImage) => {
    downloadSingleImage(image, filename, format);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Converted Images ({images.length})
          </h2>
        </div>
        <button
          onClick={handleDownloadAll}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          Download All as ZIP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.pageNumber}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
                src={image.dataUrl}
                alt={`Slide ${image.pageNumber}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Slide {image.pageNumber}
              </span>
              <button
                onClick={() => handleDownloadSingle(image)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
