import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getAllStudents, addStudent, updateStudent, deleteStudent } from './services/studentService';
import './App.css';

function App() {
  // State management
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit', 'details'
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Load all students from JSON Server
  const handleLoadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
      alert('Students loaded successfully!');
    } catch (error) {
      alert('Failed to load students. Make sure JSON Server is running on port 5000.');
    }
  };

  // Switch to Add Student view
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setCurrentView('add');
  };

  // Switch to Edit Student view
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setCurrentView('edit');
  };

  // Switch to Student Details view
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setCurrentView('details');
  };

  // Delete a student
  const handleDeleteStudent = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    try {
      await deleteStudent(id);
      alert('Student deleted successfully! Click "Load Students" to refresh the list.');
      // Optionally, remove from local state without reloading
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      alert('Failed to delete student.');
    }
  };

  // Save student (Add or Update)
  const handleSaveStudent = async (studentData) => {
    try {
      if (currentView === 'add') {
        // Add new student
        await addStudent(studentData);
        alert('Student added successfully! Click "Load Students" to see the updated list.');
      } else if (currentView === 'edit') {
        // Update existing student
        await updateStudent(selectedStudent.id, studentData);
        alert('Student updated successfully! Click "Load Students" to see the updated list.');
      }
      setCurrentView('list');
      setSelectedStudent(null);
    } catch (error) {
      alert('Failed to save student.');
    }
  };

  // Cancel form and go back to list
  const handleCancel = () => {
    setCurrentView('list');
    setSelectedStudent(null);
  };

  // Back to list from details
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStudent(null);
  };

  // Render different views based on currentView state
  return (
    <div className="App">
      <div className="container">
        {currentView === 'list' && (
          <StudentList
            students={students}
            onLoadStudents={handleLoadStudents}
            onAddStudent={handleAddStudent}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onViewDetails={handleViewDetails}
          />
        )}

        {(currentView === 'add' || currentView === 'edit') && (
          <StudentForm
            student={selectedStudent}
            onSave={handleSaveStudent}
            onCancel={handleCancel}
            isEdit={currentView === 'edit'}
          />
        )}

        {currentView === 'details' && selectedStudent && (
          <StudentDetails
            student={selectedStudent}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
