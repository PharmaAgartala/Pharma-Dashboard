import './App.css';
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        
      </Routes>
    </div>
  );
}

export default App;
