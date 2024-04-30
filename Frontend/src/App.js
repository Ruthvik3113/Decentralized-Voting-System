import './App2.css';
// import Voter fro./pages/constants/Voter.js
import Voter from "./pages/Voter"
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import ManCandidates from "./pages/ManCandidates.js";
import ManVoters from "./pages/ManVoters.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/voter" element={<Voter />} />
          <Route path="/manage-candidates" element={<ManCandidates />} />
          <Route path="/manage-voters" element={<ManVoters />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
