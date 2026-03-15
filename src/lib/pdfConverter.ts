import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export interface ConvertedImage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
}

export async function convertPdfToImages(
  file: File,
  format: "png" | "jpeg" = "png",
  quality: number = 0.95
): Promise<ConvertedImage[]> {

  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer
  }).promise;

  const images: ConvertedImage[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

    const page = await pdf.getPage(pageNum);

    const viewport = page.getViewport({
      scale: 2
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas context not available");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport
    } as any).promise;

    const mimeType =
      format === "png" ? "image/png" : "image/jpeg";

    const dataUrl = canvas.toDataURL(mimeType, quality);

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (b) => resolve(b as Blob),
        mimeType,
        quality
      );
    });

    images.push({
      pageNumber: pageNum,
      dataUrl,
      blob
    });
  }

  return images;
}