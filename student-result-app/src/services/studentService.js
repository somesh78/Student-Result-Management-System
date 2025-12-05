// Base URL for JSON Server
const API_URL = 'http://localhost:5000/students';

// GET - Fetch all students
export const getAllStudents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// GET - Fetch single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch student');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};

// POST - Add new student
export const addStudent = async (student) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error('Failed to add student');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

// PUT - Update existing student
export const updateStudent = async (id, student) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error('Failed to update student');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// DELETE - Remove student
export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete student');
    }
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};
