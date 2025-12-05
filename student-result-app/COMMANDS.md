# Helpful Commands Reference

## Installation Commands

### Install Dependencies
```powershell
npm install
```

### Install Individual Packages (if needed)
```powershell
npm install react react-dom react-scripts
npm install json-server --save-dev
```

---

## Running the Application

### Start JSON Server (Port 5000)
```powershell
npm run server
```

### Start React App (Port 3000)
```powershell
npm start
```

### Run Both (if you want to set up concurrent)
First install:
```powershell
npm install concurrently --save-dev
```

Add to package.json scripts:
```json
"dev": "concurrently \"npm run server\" \"npm start\""
```

Then run:
```powershell
npm run dev
```

---

## Build Commands

### Create Production Build
```powershell
npm run build
```

### Test the Build Locally
```powershell
npm install -g serve
serve -s build
```

---

## Troubleshooting Commands

### Check Node and npm Versions
```powershell
node --version
npm --version
```

### Clear npm Cache
```powershell
npm cache clean --force
```

### Delete and Reinstall Dependencies
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Check Running Processes on Ports
```powershell
# Check port 3000
netstat -ano | findstr :3000

# Check port 5000
netstat -ano | findstr :5000
```

### Kill Process on Port
```powershell
# Find the PID from above command, then:
taskkill /PID <PID_NUMBER> /F
```

---

## Git Commands (for version control)

### Initialize Git Repository
```powershell
git init
git add .
git commit -m "Initial commit: Student Result Management System"
```

### Create .gitignore (if not exists)
```powershell
echo "node_modules" >> .gitignore
echo "build" >> .gitignore
echo ".env" >> .gitignore
```

### Commit Changes
```powershell
git add .
git commit -m "Your commit message"
```

---

## Testing API with PowerShell

### Test GET All Students
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/students" -Method Get
```

### Test GET Single Student
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/students/1" -Method Get
```

### Test POST (Add Student)
```powershell
$body = @{
    name = "Test Student"
    section = "C"
    marks = 88
    grade = "B+"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/students" -Method Post -Body $body -ContentType "application/json"
```

### Test PUT (Update Student)
```powershell
$body = @{
    name = "Updated Name"
    section = "A"
    marks = 95
    grade = "A+"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/students/1" -Method Put -Body $body -ContentType "application/json"
```

### Test DELETE
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/students/1" -Method Delete
```

---

## Testing API with curl (alternative)

### GET All Students
```bash
curl http://localhost:5000/students
```

### GET Single Student
```bash
curl http://localhost:5000/students/1
```

### POST (Add Student)
```bash
curl -X POST http://localhost:5000/students ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test Student\",\"section\":\"C\",\"marks\":88,\"grade\":\"B+\"}"
```

### PUT (Update Student)
```bash
curl -X PUT http://localhost:5000/students/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Updated Name\",\"section\":\"A\",\"marks\":95,\"grade\":\"A+\"}"
```

### DELETE
```bash
curl -X DELETE http://localhost:5000/students/1
```

---

## Useful Browser Commands

### Open Browser Developer Tools
```
F12 or Ctrl+Shift+I
```

### View Console
```
F12 → Console Tab
```

### View Network Requests
```
F12 → Network Tab
```

### Clear Browser Cache
```
Ctrl+Shift+Delete
```

---

## JSON Server Advanced Commands

### Start with Custom Port
```powershell
json-server --watch db.json --port 3001
```

### Start with Delay (simulate slow network)
```powershell
json-server --watch db.json --port 5000 --delay 1000
```

### Start with Custom Host
```powershell
json-server --watch db.json --port 5000 --host 0.0.0.0
```

---

## Package.json Scripts Explanation

```json
{
  "scripts": {
    "start": "react-scripts start",      // Starts React dev server
    "build": "react-scripts build",      // Creates production build
    "test": "react-scripts test",        // Runs tests
    "eject": "react-scripts eject",      // Ejects from create-react-app
    "server": "json-server --watch db.json --port 5000"  // Starts JSON Server
  }
}
```

---

## Quick Reference: Project Structure

```
student-result-app/
├── db.json                     ← Database file
├── package.json                ← Dependencies
├── public/
│   └── index.html             ← HTML template
└── src/
    ├── components/            ← React components
    │   ├── StudentList.jsx
    │   ├── StudentForm.jsx
    │   └── StudentDetails.jsx
    ├── services/              ← API calls
    │   └── studentService.js
    ├── App.jsx                ← Main app
    ├── App.css                ← Styles
    ├── index.js               ← Entry point
    └── index.css              ← Global styles
```

---

## Environment Variables (Optional)

Create `.env` file in root:

```env
REACT_APP_API_URL=http://localhost:5000
PORT=3000
```

Use in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

---

**Keep this file handy for quick reference! 📝**
