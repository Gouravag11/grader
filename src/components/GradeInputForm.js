
import React, { useState } from 'react';

const gradeToPoint = {
  'S': 10,
  'A': 9,
  'B': 8,
  'C': 7,
  'D': 6,
  'E': 5,
  'F': 0,
  'N': 0,
};

function GradeInputForm({ onAddSemester }) {
  // Initialize 10 courses with default values set to null
  const [semesterGrades, setSemesterGrades] = useState(
    Array(10).fill({ grade: null, credit: null })
  );

  // State to manage warnings
  const [showWarnings, setShowWarnings] = useState(false);
  const [warnings, setWarnings] = useState(Array(10).fill({ gradeWarning: false, creditWarning: false }));

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedGrades = [...semesterGrades];
    
    // Update only the specific course at the given index
    updatedGrades[index] = {
      ...updatedGrades[index],
      [name]: value === "null" ? null : value,
    };
    
    setSemesterGrades(updatedGrades);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Determine warnings based on incomplete grade or credit fields
    const updatedWarnings = semesterGrades.map((entry) => ({
      gradeWarning: entry.grade && !entry.credit,
      creditWarning: entry.credit && !entry.grade,
    }));

    setWarnings(updatedWarnings);
    setShowWarnings(true);

    // Filter out invalid courses (missing either grade or credit)
    const formattedGrades = semesterGrades
      .filter((item) => item.grade !== null && item.credit !== null)
      .map((item) => ({
        gradePoint: gradeToPoint[item.grade],
        credit: parseFloat(item.credit),
      }));

    // Pass the valid grades to the parent component
    onAddSemester(formattedGrades);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Semester Grades</h2>
      {semesterGrades.map((grade, index) => (
        <div key={index} style={{ marginBottom: '0px' }}>
          {/* Display warning for grade above the select */}
          {showWarnings && warnings[index].gradeWarning && (
            <div className="warning">
              This course has been ignored  due to missing Credit:

            </div>
          )}
          {/* Display warning for credit above the select */}
          {showWarnings && warnings[index].creditWarning && (
              <div className="warning">
                This course has been ignored  due to missing Grade:
              </div>
            )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select
              name="grade"
              value={grade.grade || "null"}
              onChange={(e) => handleInputChange(index, e)}
              required
              style={{ width: '45%' }} // Adjust width for better spacing
            >
              <option value="null">Select Grade</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="N">N</option>
            </select>

            
            <select
              name="credit"
              value={grade.credit || "null"}
              onChange={(e) => handleInputChange(index, e)}
              required
              style={{ width: '45%' }} // Adjust width for better spacing
            >
              <option value="null">Select Credit</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      ))}
      <button type="submit">Calculate GPA</button>
    </form>
  );
}

export default GradeInputForm;
