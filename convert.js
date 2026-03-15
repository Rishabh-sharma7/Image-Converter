// convert.js
const { exec } = require("child_process");

function convertPPTtoPDF(inputFile) {
  return new Promise((resolve, reject) => {
    const command = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf "${inputFile}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
        return;
      }

      const pdfFile = inputFile.replace(/\.(ppt|pptx)$/i, ".pdf");
      resolve(pdfFile);
    });
  });
}

module.exports = { convertPPTtoPDF };