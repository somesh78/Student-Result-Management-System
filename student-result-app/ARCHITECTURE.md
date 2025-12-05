# Project Architecture & Flow

## 📊 Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (User)                        │
│                  http://localhost:3000                   │
└─────────────────────────────────────────────────────────┘
                           │
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   React Application                      │
│                      (Frontend)                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              App.jsx (Main State)                │   │
│  │  - students: []                                  │   │
│  │  - currentView: 'list'/'add'/'edit'/'details'   │   │
│  │  - selectedStudent: null                         │   │
│  └─────────────────────────────────────────────────┘   │
│                           │                              │
│         ┌─────────────────┼─────────────────┐          │
│         │                 │                 │            │
│         ▼                 ▼                 ▼            │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│  │ Student  │    │ Student  │    │ Student  │         │
│  │   List   │    │   Form   │    │ Details  │         │
│  └──────────┘    └──────────┘    └──────────┘         │
└─────────────────────────────────────────────────────────┘
                           │
                    Fetch API Calls
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              studentService.js (API Layer)               │
│  - getAllStudents()                                      │
│  - getStudentById(id)                                    │
│  - addStudent(student)                                   │
│  - updateStudent(id, student)                            │
│  - deleteStudent(id)                                     │
└─────────────────────────────────────────────────────────┘
                           │
                    HTTP Requests
                 (GET, POST, PUT, DELETE)
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    JSON Server                           │
│                     (Backend)                            │
│                http://localhost:5000                     │
│                                                           │
│              REST API Endpoints:                         │
│  GET    /students      → Get all students               │
│  GET    /students/:id  → Get one student                │
│  POST   /students      → Create student                 │
│  PUT    /students/:id  → Update student                 │
│  DELETE /students/:id  → Delete student                 │
└─────────────────────────────────────────────────────────┘
                           │
                    Reads/Writes
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      db.json                             │
│                   (Database File)                        │
│  {                                                       │
│    "students": [                                         │
│      {                                                   │
│        "id": 1,                                          │
│        "name": "John Doe",                              │
│        "section": "A",                                   │
│        "marks": 85,                                      │
│        "grade": "B+"                                     │
│      }                                                   │
│    ]                                                     │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 CRUD Operations Flow

### 1️⃣ CREATE (Add Student)

```
User clicks "Add Student"
       ↓
App.jsx sets currentView = 'add'
       ↓
StudentForm component renders
       ↓
User fills form and clicks "Add Student"
       ↓
StudentForm calls onSave(studentData)
       ↓
App.jsx calls handleSaveStudent()
       ↓
Calls studentService.addStudent(data)
       ↓
Fetch POST request to http://localhost:5000/students
       ↓
JSON Server adds to db.json
       ↓
Success! Alert shown
       ↓
User clicks "Load Students" to see new data
```

---

### 2️⃣ READ (View Students)

```
User clicks "Load Students"
       ↓
App.jsx calls handleLoadStudents()
       ↓
Calls studentService.getAllStudents()
       ↓
Fetch GET request to http://localhost:5000/students
       ↓
JSON Server returns all students from db.json
       ↓
App.jsx updates students state with data
       ↓
StudentList component re-renders with new data
       ↓
Table displays all students
```

---

### 3️⃣ UPDATE (Edit Student)

```
User clicks "Edit" button
       ↓
App.jsx calls handleEditStudent(student)
       ↓
Sets selectedStudent = student
Sets currentView = 'edit'
       ↓
StudentForm renders with student data pre-filled
       ↓
User modifies data and clicks "Update Student"
       ↓
StudentForm calls onSave(updatedData)
       ↓
App.jsx calls handleSaveStudent()
       ↓
Calls studentService.updateStudent(id, data)
       ↓
Fetch PUT request to http://localhost:5000/students/:id
       ↓
JSON Server updates db.json
       ↓
Success! Alert shown
       ↓
User clicks "Load Students" to see updated data
```

---

### 4️⃣ DELETE (Remove Student)

```
User clicks "Delete" button
       ↓
App.jsx calls handleDeleteStudent(id)
       ↓
Confirmation dialog shown
       ↓
User confirms
       ↓
Calls studentService.deleteStudent(id)
       ↓
Fetch DELETE request to http://localhost:5000/students/:id
       ↓
JSON Server removes from db.json
       ↓
Success! Alert shown
       ↓
Student removed from local state
       ↓
StudentList re-renders without deleted student
```

---

### 5️⃣ VIEW DETAILS (Read Single Student)

```
User clicks "View" button
       ↓
App.jsx calls handleViewDetails(student)
       ↓
Sets selectedStudent = student
Sets currentView = 'details'
       ↓
StudentDetails renders with student data
       ↓
Shows all information in card format
       ↓
User clicks "Back to List"
       ↓
Returns to list view
```

---

## 🎯 Component Responsibilities

### App.jsx
**Role:** Main Controller
- ✅ Holds all application state
- ✅ Manages view switching
- ✅ Handles all CRUD operations
- ✅ Passes data and callbacks to child components

### StudentList.jsx
**Role:** Display Component
- ✅ Shows all students in a table
- ✅ Provides action buttons
- ✅ Receives students array as prop
- ✅ Calls parent functions via callbacks

### StudentForm.jsx
**Role:** Input Component
- ✅ Manages form field states (useState)
- ✅ Handles form validation
- ✅ Used for both Add and Edit
- ✅ Calls parent save function

### StudentDetails.jsx
**Role:** Display Component
- ✅ Shows single student details
- ✅ Read-only view
- ✅ Simple layout with back button

### studentService.js
**Role:** API Layer
- ✅ Abstracts all HTTP requests
- ✅ Provides reusable API functions
- ✅ Handles errors
- ✅ Returns promises

---

## 📦 Data Flow

### Props Down, Events Up Pattern

```
┌─────────────────────────────────────┐
│           App.jsx (State)            │
│                                      │
│  students = [...]                   │
│  currentView = 'list'               │
│                                      │
│  Functions:                          │
│  - handleLoadStudents()             │
│  - handleAddStudent()               │
│  - handleEditStudent(student)       │
│  - handleDeleteStudent(id)          │
│  - handleViewDetails(student)       │
└─────────────────────────────────────┘
           │
           │ Props ↓ (data flows down)
           │
           ▼
┌─────────────────────────────────────┐
│       StudentList.jsx                │
│                                      │
│  Receives:                           │
│  - students (prop)                  │
│  - onLoadStudents (callback)        │
│  - onAddStudent (callback)          │
│  - onEditStudent (callback)         │
│  - onDeleteStudent (callback)       │
│  - onViewDetails (callback)         │
│                                      │
│  When button clicked:               │
│  - Calls callback function          │
└─────────────────────────────────────┘
           │
           │ Events ↑ (events flow up)
           │
           ▼
   Back to App.jsx to handle
```

---

## 🔀 View State Management

```
┌─────────────────────────────────────┐
│       currentView State              │
└─────────────────────────────────────┘
           │
           │
    ┌──────┴──────┬──────┬─────────┐
    │             │      │         │
    ▼             ▼      ▼         ▼
  'list'       'add'  'edit'  'details'
    │             │      │         │
    │             │      │         │
    ▼             ▼      ▼         ▼
┌────────┐  ┌────────┐ ┌────────┐ ┌────────┐
│Student │  │Student │ │Student │ │Student │
│ List   │  │ Form   │ │ Form   │ │Details │
└────────┘  └────────┘ └────────┘ └────────┘
```

---

## 🗂️ File Dependencies

```
index.js
  └── imports App.jsx
         └── imports StudentList.jsx
         └── imports StudentForm.jsx
         └── imports StudentDetails.jsx
         └── imports studentService.js
                └── makes HTTP requests to JSON Server
                       └── reads/writes db.json
```

---

## 🌊 Typical User Journey

```
Start Application
       ↓
See empty table
       ↓
Click "Load Students" → [READ]
       ↓
See 3 default students
       ↓
Click "Add Student" → [CREATE]
       ↓
Fill form, submit
       ↓
Alert: Success!
       ↓
Click "Load Students"
       ↓
See 4 students now
       ↓
Click "View" on one student → [READ]
       ↓
See detailed information
       ↓
Click "Back to List"
       ↓
Click "Edit" on a student → [UPDATE]
       ↓
Modify marks and grade
       ↓
Submit form
       ↓
Alert: Success!
       ↓
Click "Load Students"
       ↓
See updated information
       ↓
Click "Delete" on a student → [DELETE]
       ↓
Confirm deletion
       ↓
Student removed immediately
```

---

## 🔧 Technical Stack

```
┌────────────────────────────────────┐
│         User Interface              │
│         HTML + CSS + JSX            │
└────────────────────────────────────┘
                 ↓
┌────────────────────────────────────┐
│        React Components             │
│    (Functional Components)          │
└────────────────────────────────────┘
                 ↓
┌────────────────────────────────────┐
│        State Management             │
│         useState Hook               │
└────────────────────────────────────┘
                 ↓
┌────────────────────────────────────┐
│         HTTP Requests               │
│          Fetch API                  │
└────────────────────────────────────┘
                 ↓
┌────────────────────────────────────┐
│          REST API                   │
│        JSON Server                  │
└────────────────────────────────────┘
                 ↓
┌────────────────────────────────────┐
│          Database                   │
│          db.json                    │
└────────────────────────────────────┘
```

---

## 💡 Key Concepts Used

1. **Component-Based Architecture** - Modular, reusable components
2. **Props** - Passing data from parent to child
3. **Callbacks** - Passing functions as props
4. **State Management** - Using useState for local state
5. **Conditional Rendering** - Showing different views based on state
6. **Form Handling** - Controlled components
7. **Async Operations** - Using async/await with Fetch API
8. **REST API** - Standard HTTP methods (GET, POST, PUT, DELETE)
9. **Manual Data Loading** - Button-triggered data fetching (no useEffect)

---

This architecture provides a clear separation of concerns and makes the code easy to understand and maintain! 🎉
