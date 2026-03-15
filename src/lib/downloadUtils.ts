import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ConvertedImage } from './pdfConverter';

export async function downloadAllAsZip(
  images: ConvertedImage[],
  filename: string,
  format: 'png' | 'jpeg'
): Promise<void> {
  const zip = new JSZip();
  const extension = format === 'png' ? 'png' : 'jpg';

  images.forEach((image) => {
    const fileName = `slide-${image.pageNumber}.${extension}`;
    zip.file(fileName, image.blob);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  const baseName = filename.replace(/\.[^/.]+$/, '');
  saveAs(content, `${baseName}-converted.zip`);
}

export function downloadSingleImage(
  image: ConvertedImage,
  filename: string,
  format: 'png' | 'jpeg'
): void {
  const extension = format === 'png' ? 'png' : 'jpg';
  const baseName = filename.replace(/\.[^/.]+$/, '');
  const fileName = `${baseName}-slide-${image.pageNumber}.${extension}`;
  saveAs(image.blob, fileName);
}
