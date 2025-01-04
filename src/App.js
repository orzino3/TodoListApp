import logo from './logo.svg';
import './App.css';
import Item from "./components/Item";
import Homepage from "./components/pages/Homepage";
import TaskPage from "./components/pages/TaskPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/task" element={<TaskPage />} />
          </Routes>

      </Router>
    </div>
  );
}

export default App;
