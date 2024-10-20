import React, { useState } from 'react';
import GradeInputForm from '../components/GradeInputForm';
import GPAResult from '../components/GPAResult';
import  './gpa_calc.css';


function GpaCalculatorPage() {
  const [gpa, setGpa] = useState(0);

  const handleAddSemester = (semesterGrades) => {
    const semesterGPA = calculateGPA(semesterGrades);
    setGpa(semesterGPA);
  };

  const calculateGPA = (semesterGrades) => {
    const totalPoints = semesterGrades.reduce((acc, grade) => acc + grade.gradePoint * grade.credit, 0);
    const totalCredits = semesterGrades.reduce((acc, grade) => acc + grade.credit, 0);
    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  return (
    <div className="GpaCalculatorPage">
      <h1>Semester GPA Calculator</h1>
      <GradeInputForm onAddSemester={handleAddSemester} />
      <GPAResult gpa={gpa} />
    </div>
  );
}

export default GpaCalculatorPage;
