import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Rewards from './pages/Rewards';
import Admin from './pages/Admin';
import Leaderboard from './pages/Leaderboard';
import GlobalStyles from './styles/GlobalStyles';

// Main content container to prevent overlap with sidebar
const MainContent = styled.main`
  margin-left: 250px;
  padding: 2rem;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </MainContent>
    </Router>
  );
}
export default App;