import React, { useState } from 'react';

function StudentForm({ student, onSave, onCancel, isEdit }) {
  // Initialize form state with existing student data (for edit) or empty values (for add)
  const [name, setName] = useState(student ? student.name : '');
  const [section, setSection] = useState(student ? student.section : '');
  const [marks, setMarks] = useState(student ? student.marks : '');
  const [grade, setGrade] = useState(student ? student.grade : '');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !section || !marks || !grade) {
      alert('Please fill in all fields');
      return;
    }

    // Create student object
    const studentData = {
      name,
      section,
      marks: Number(marks),
      grade,
    };

    // If editing, include the ID
    if (isEdit && student) {
      studentData.id = student.id;
    }

    // Call the save function passed from parent
    onSave(studentData);
  };

  return (
    <div className="student-form">
      <h2>{isEdit ? 'Edit Student' : 'Add New Student'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="Enter section (e.g., A, B, C)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            id="marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter marks (0-100)"
            min="0"
            max="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Enter grade (e.g., A+, A, B+, B)"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
