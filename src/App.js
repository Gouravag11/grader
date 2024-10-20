import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GpaCalculatorPage from './pages/gpa_calc';
import { ThemeProvider, useTheme } from './ThemeContext';


const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{ margin: '20px' }}>
      Toggle Theme
    </button>
  );
};


function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>GPA Calculator</h1>
        <ThemeToggleButton />
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<GpaCalculatorPage />} />
          </Routes>
        </Router>
        {/* Other components like GpaCalculatorPage */}
      </div>
    </ThemeProvider>
    
  );
}

export default App;
