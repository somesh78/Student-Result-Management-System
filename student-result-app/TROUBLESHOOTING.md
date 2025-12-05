# Troubleshooting Guide

## Common Issues and Solutions

---

## 🔴 Issue 1: "npm: command not found" or "node: command not found"

**Problem:** Node.js and npm are not installed or not in PATH

**Solution:**
1. Download and install Node.js from: https://nodejs.org/
2. Choose LTS (Long Term Support) version
3. Restart your terminal/PowerShell
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

---

## 🔴 Issue 2: Port 5000 Already in Use

**Problem:** Another application is using port 5000

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution 1 - Kill the Process:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution 2 - Use Different Port:**
```powershell
json-server --watch db.json --port 5001
```

Then update `src/services/studentService.js`:
```javascript
const API_URL = 'http://localhost:5001/students';
```

---

## 🔴 Issue 3: Port 3000 Already in Use

**Problem:** React default port is occupied

**Symptoms:**
```
? Something is already running on port 3000.
```

**Solution 1 - Use Different Port:**
- Just press `Y` when prompted
- React will run on port 3001 instead

**Solution 2 - Kill the Process:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 🔴 Issue 4: "Cannot find module" or Dependencies Error

**Problem:** node_modules not installed or corrupted

**Symptoms:**
```
Error: Cannot find module 'react'
Module not found: Can't resolve 'react-dom'
```

**Solution:**
```powershell
# Remove existing node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

## 🔴 Issue 5: JSON Server Not Starting

**Problem:** db.json file missing or malformed

**Symptoms:**
```
Error: ENOENT: no such file or directory
JSON parse error
```

**Solution:**
1. Check if `db.json` exists in project root
2. Verify JSON syntax is correct:
   ```json
   {
     "students": [
       {
         "id": 1,
         "name": "John Doe",
         "section": "A",
         "marks": 85,
         "grade": "B+"
       }
     ]
   }
   ```
3. Make sure you're in the correct directory:
   ```powershell
   cd "d:\Student Result Management\student-result-app"
   ```

---

## 🔴 Issue 6: Data Not Loading / Blank Page

**Problem:** API requests failing

**Symptoms:**
- Click "Load Students" but nothing happens
- Browser console shows errors
- Empty table

**Solution:**

**Step 1 - Check JSON Server:**
```powershell
# Make sure JSON Server is running
npm run server
```

**Step 2 - Test API Manually:**
Open browser and go to: `http://localhost:5000/students`
- Should see JSON data
- If not, JSON Server isn't running

**Step 3 - Check Browser Console:**
- Press F12
- Look for errors in Console tab
- Look for failed requests in Network tab

**Step 4 - Verify API URL:**
In `src/services/studentService.js`:
```javascript
const API_URL = 'http://localhost:5000/students';
```

---

## 🔴 Issue 7: CORS Error

**Problem:** Cross-Origin Resource Sharing error

**Symptoms:**
```
Access to fetch at 'http://localhost:5000/students' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
JSON Server has CORS enabled by default. This usually means:
1. JSON Server is not running
2. Wrong URL in API calls
3. Check both are running on localhost:
   - React: http://localhost:3000
   - JSON Server: http://localhost:5000

---

## 🔴 Issue 8: Changes Not Reflecting

**Problem:** Code changes don't appear in browser

**Solution:**

**For JavaScript/CSS Changes:**
1. Hard refresh: `Ctrl + Shift + R`
2. Clear cache: `Ctrl + Shift + Delete`

**For package.json Changes:**
```powershell
# Stop the server (Ctrl+C)
# Reinstall
npm install
# Restart
npm start
```

**For React Files:**
- React hot reload should work automatically
- If not, stop and restart: `Ctrl+C` then `npm start`

---

## 🔴 Issue 9: Build Errors / Compilation Errors

**Problem:** React app won't compile

**Symptoms:**
```
Failed to compile
Syntax error
```

**Solution:**

**Check for:**
1. Missing closing brackets `}`, `)`, `]`
2. Missing semicolons (not always required but can help)
3. Incorrect import statements
4. Typos in variable names

**Common Fixes:**
```javascript
// ❌ Wrong
import StudentList from './components/StudentList'

// ✅ Correct
import StudentList from './components/StudentList.jsx';
```

```javascript
// ❌ Wrong - missing closing brace
function MyComponent() {
  return <div>Hello</div>

// ✅ Correct
function MyComponent() {
  return <div>Hello</div>;
}
```

---

## 🔴 Issue 10: "npm ERR! code ELIFECYCLE"

**Problem:** npm script execution failed

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Remove and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 🔴 Issue 11: Data Not Persisting

**Problem:** Added students disappear after refresh

**Explanation:**
- This is normal! 
- You need to click "Load Students" after page refresh
- JSON Server persists data in `db.json`

**To Verify Data is Saved:**
1. Open `db.json` file
2. Check if new students are there
3. If yes, data is persisted correctly

---

## 🔴 Issue 12: Form Not Submitting

**Problem:** Click Add/Update button but nothing happens

**Checklist:**
1. Check browser console for errors (F12)
2. Make sure all fields are filled
3. Check if JSON Server is running
4. Verify form validation logic

**Debug:**
```javascript
// Add console.log to see if function is called
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted', { name, section, marks, grade });
  // rest of code...
};
```

---

## 🔴 Issue 13: Blank White Screen

**Problem:** React app shows blank page

**Solution:**

**Step 1 - Check Console:**
- Press F12
- Look for JavaScript errors

**Step 2 - Check index.html:**
Make sure it has:
```html
<div id="root"></div>
```

**Step 3 - Check index.js:**
Make sure it renders App:
```javascript
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Step 4 - Check App.jsx:**
Make sure it returns JSX:
```javascript
function App() {
  return (
    <div className="App">
      {/* content */}
    </div>
  );
}
export default App;
```

---

## 🔴 Issue 14: Styling Not Applied

**Problem:** CSS styles not working

**Solution:**

**Check Imports:**
```javascript
// In App.jsx
import './App.css';

// In index.js
import './index.css';
```

**Check Class Names:**
```javascript
// ✅ Correct (React uses className)
<div className="student-list">

// ❌ Wrong (don't use class)
<div class="student-list">
```

**Hard Refresh:**
```
Ctrl + Shift + R
```

---

## 🛠️ Debugging Tips

### 1. Use Console.log
```javascript
console.log('Students:', students);
console.log('Current View:', currentView);
```

### 2. Check Network Tab
- Open DevTools (F12)
- Go to Network tab
- See all API requests
- Check if they're successful (200 status)

### 3. React DevTools
Install React Developer Tools browser extension:
- Chrome: https://chrome.google.com/webstore
- Firefox: https://addons.mozilla.org/firefox
- Inspect component props and state

### 4. Check Terminal Output
Look for errors in both terminals:
- Terminal 1: JSON Server logs
- Terminal 2: React compilation logs

---

## 📞 Still Having Issues?

### Checklist Before Asking for Help:

- [ ] Node.js and npm are installed
- [ ] All dependencies installed (`npm install`)
- [ ] JSON Server is running (Terminal 1)
- [ ] React app is running (Terminal 2)
- [ ] Browser console has no errors
- [ ] API URL is correct (http://localhost:5000/students)
- [ ] db.json file exists and is valid JSON
- [ ] All required files are present

### Provide This Information:

1. **Error message** (copy exact error from console/terminal)
2. **What you were trying to do**
3. **What happened instead**
4. **Screenshots** (if applicable)
5. **Node/npm versions** (`node --version`, `npm --version`)

---

**Most issues can be fixed by reinstalling dependencies! 💡**

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

Good luck! 🚀
