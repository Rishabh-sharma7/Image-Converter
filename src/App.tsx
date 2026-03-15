import { useState } from 'react';
import { Presentation, ArrowLeft } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { ConversionControls } from './components/ConversionControls';
import { ImageGallery } from './components/ImageGallery';
import { Stats } from './components/Stats';
import { convertPdfToImages, ConvertedImage } from './lib/pdfConverter';
import { supabase } from './lib/supabase';
// @ts-ignore
import { pptx2pdf } from "pptx2pdf";
function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setConvertedImages([]);
    setError(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setError(null);

    try {
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();

      if (fileType === 'pdf') {
        const images = await convertPdfToImages(selectedFile, format);
        setConvertedImages(images);

        await supabase.from('conversions').insert({
          filename: selectedFile.name,
          file_type: fileType,
          total_slides: images.length,
          output_format: format,
        });
      } else if (fileType === "ppt" || fileType === "pptx") {

  const formData = new FormData();
  formData.append("file", selectedFile);

  const response = await fetch("http://localhost:5000/convert", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("PPT conversion failed");
  }

  const pdfBlob = await response.blob();

  const pdfFile = new File(
    [pdfBlob],
    selectedFile.name.replace(/\.(ppt|pptx)$/i, ".pdf"),
    { type: "application/pdf" }
  );

  const images = await convertPdfToImages(pdfFile, format);

  setConvertedImages(images);
}  else {
        setError('Unsupported file format. Please upload a PDF, PPT, or PPTX file.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setConvertedImages([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <Presentation className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Slide2Image
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert your presentations and documents into high-quality images instantly
          </p>
        </header>

        <Stats />

        {convertedImages.length === 0 ? (
          <div className="space-y-8">
            <FileUpload onFileSelect={handleFileSelect} />

            {selectedFile && (
              <ConversionControls
                format={format}
                onFormatChange={setFormat}
                onConvert={handleConvert}
                isConverting={isConverting}
              />
            )}

            {error && (
              <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
                Convert Another File
              </button>
            </div>

            {selectedFile && (
              <ImageGallery
                images={convertedImages}
                filename={selectedFile.name}
                format={format}
              />
            )}
          </div>
        )}

        <footer className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            Supports PDF files • High-quality image conversion • Fast and secure
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
