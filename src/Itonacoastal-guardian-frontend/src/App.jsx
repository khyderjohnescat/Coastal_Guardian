import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Rewards from './pages/Rewards';
import Admin from './pages/Admin';
import Leaderboard from './pages/Leaderboard';
import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, AuthContext } from './context/AuthContext';

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

// Protected Route component to guard authenticated routes
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Sidebar />
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                  </Routes>
                </MainContent>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;