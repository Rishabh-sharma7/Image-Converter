# 📄 PPT / PDF to Image Converter

A web application that converts **PPT, PPTX, and PDF files into images (PNG/JPG)** using a **React (Vite) frontend** and a **Node.js backend**.
The backend uses **LibreOffice** to convert PowerPoint files into PDF, and the frontend converts PDF pages into images.

---

# 🚀 Features

* Upload **PPT, PPTX, or PDF files**
* Convert **PPT/PPTX → PDF** using LibreOffice
* Convert **PDF pages → images**
* Download images individually
* Fast client-side PDF rendering
* Simple and clean interface

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* pdfjs-dist

## Backend

* Node.js
* Express
* Multer
* libreoffice-convert
* CORS

---

# 📦 Software Requirements

| Software       | Purpose                |
| -------------- | ---------------------- |
| Node.js (v18+) | Run frontend & backend |
| npm            | Install dependencies   |
| LibreOffice    | Convert PPT/PPTX → PDF |
| VS Code        | Code editor            |
| Chrome         | Test the application   |

---

# 📂 Project Structure

```
project
│
├── backend
│   ├── server.js
│   └── package.json
│
├── src
│   ├── App.jsx
│   ├── main.jsx
│
├── public
│
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Navigate to Project Folder

```bash
cd "D:\Project 2026\Image Converter_Updated\Image Converter\project"
```

---

## 2️⃣ Create Backend Folder

```bash
mkdir backend
cd backend
```

---

## 3️⃣ Initialize Backend

```bash
npm init -y
```

---

## 4️⃣ Install Backend Dependencies

```bash
npm install express multer libreoffice-convert cors
```

---

## 5️⃣ Start Backend Server

```bash
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

## 6️⃣ Start Frontend

Open a **new terminal**

```bash
cd "D:\Project 2026\Image Converter_Updated\Image Converter\project"
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔄 Application Workflow

1. User uploads **PPT / PPTX / PDF**
2. If **PPT/PPTX** → frontend sends file to backend
3. Backend converts **PPT → PDF** using LibreOffice
4. Frontend converts **PDF pages → images**
5. Images are displayed and available for download

---

# 📸 Future Improvements

* Download **all images as ZIP**
* Drag & drop file upload
* Image quality selection
* Dark mode UI
* Progress indicator

#

---
