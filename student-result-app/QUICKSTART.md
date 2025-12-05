# Quick Start Guide

## Getting Started in 4 Easy Steps

### 1️⃣ Open Terminal and Navigate to Project

```powershell
cd "d:\Student Result Management\student-result-app"
```

### 2️⃣ Install All Dependencies

```powershell
npm install
```

Wait for installation to complete...

### 3️⃣ Start JSON Server (Backend)

**Open Terminal 1:**

```powershell
npm run server
```

You should see:
```
JSON Server is running on http://localhost:5000
```

✅ Keep this terminal running!

### 4️⃣ Start React App (Frontend)

**Open Terminal 2:**

```powershell
npm start
```

Browser will automatically open at: `http://localhost:3000`

✅ Keep this terminal running too!

---

## Using the Application

### First Time Setup

1. **Click "Load Students"** - This fetches the initial 3 students from the database
2. You should see a table with student data

### Testing CRUD Operations

#### ✅ **ADD** a new student:
1. Click "Add Student"
2. Fill in all fields
3. Click "Add Student" button
4. Click "Load Students" to see the new entry

#### ✅ **VIEW** student details:
1. Click "View" button next to any student
2. See all information
3. Click "Back to List"

#### ✅ **EDIT** a student:
1. Click "Edit" button next to any student
2. Modify the information
3. Click "Update Student"
4. Click "Load Students" to see changes

#### ✅ **DELETE** a student:
1. Click "Delete" button next to any student
2. Confirm deletion
3. Student is removed from the list

---

## Common Issues & Solutions

### ❌ Port Already in Use

**Problem:** Port 5000 or 3000 is already in use

**Solution:**
```powershell
# For Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### ❌ Cannot Find Module

**Problem:** Missing dependencies

**Solution:**
```powershell
# Delete and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### ❌ Data Not Loading

**Problem:** API requests failing

**Solution:**
- Check if JSON Server is running (Terminal 1)
- Verify URL: `http://localhost:5000/students`
- Open browser console (F12) to see errors

---

## Project File Checklist

Make sure you have all these files:

```
✅ package.json
✅ db.json
✅ src/App.jsx
✅ src/App.css
✅ src/index.js
✅ src/index.css
✅ src/components/StudentList.jsx
✅ src/components/StudentForm.jsx
✅ src/components/StudentDetails.jsx
✅ src/services/studentService.js
✅ public/index.html
```

---

## Testing Your Implementation

### Test Checklist

- [ ] Can load students successfully
- [ ] Can add a new student
- [ ] Can view student details
- [ ] Can edit existing student
- [ ] Can delete a student
- [ ] Form validation works
- [ ] All buttons work correctly
- [ ] Data persists after refresh (if you click Load Students again)

---

## Need Help?

1. **Check the README.md** for detailed documentation
2. **Open browser console** (F12) to see errors
3. **Check both terminals** for error messages
4. **Verify JSON Server** by visiting: http://localhost:5000/students

---

## Next Steps (Optional Enhancements)

Once the basic functionality works, try adding:

1. Search by name
2. Sort by marks or grade
3. Better error messages
4. Loading spinners
5. Form validation (marks 0-100)
6. Responsive design improvements

---

**You're all set! Happy coding! 🎉**
