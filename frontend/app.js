import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Herbs from "./pages/Herbs";
import HerbDetail from "./pages/HerbDetail";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Herbs />} />
        <Route path="/herbs/:id" element={<HerbDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

import HerbList from "./components/HerbList";

function App() {
  return (
    <div>
      <h1>HerbaMatch</h1>
      <HerbList />
    </div>
  );
}


export default App;
