const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("file"), (req, res) => {

  const inputPath = req.file.path;
  const outputDir = path.join(__dirname, "output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const command = `"D:\\Libre Office\\program\\soffice.exe" --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

  exec(command, (error, stdout, stderr) => {

    if (error) {
      console.error("Conversion error:", error);
      return res.status(500).send("PPT conversion failed");
    }

    const files = fs.readdirSync(outputDir);
    const pdfFile = files.find(f => f.endsWith(".pdf"));

    const pdfPath = path.join(outputDir, pdfFile);
    const pdfBuffer = fs.readFileSync(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);

  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
