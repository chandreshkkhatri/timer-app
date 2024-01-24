import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Timer from './Timer';
import WorldClock from './WorldClock';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/timer">Timer</Link></li>
          <li><Link to="/world-clock">World Clock</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/timer" exact element={<Timer />} />
        <Route path="/world-clock" element={<WorldClock />} />
      </Routes>
    </Router>
  );
}

export default App;
