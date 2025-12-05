import React from 'react';

function StudentList({ students, onLoadStudents, onAddStudent, onEditStudent, onDeleteStudent, onViewDetails }) {
  return (
    <div className="student-list">
      <h2>Student Result Management System</h2>
      
      <div className="action-buttons">
        <button onClick={onLoadStudents} className="btn btn-primary">
          Load Students
        </button>
        <button onClick={onAddStudent} className="btn btn-success">
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <p className="no-data">No students found. Click "Load Students" to fetch data.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Section</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.section}</td>
                <td>{student.marks}</td>
                <td>{student.grade}</td>
                <td>
                  <button
                    onClick={() => onViewDetails(student)}
                    className="btn btn-info btn-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEditStudent(student)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteStudent(student.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
