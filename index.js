const { convertPPTtoPDF } = require("./convert");

convertPPTtoPDF("presentation.pptx")
  .then((pdfPath) => {
    console.log("PDF created at:", pdfPath);
  })
  .catch((err) => {
    console.error("Conversion failed:", err);
  });