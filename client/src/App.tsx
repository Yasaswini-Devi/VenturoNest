import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import InvestorDashboard from './pages/InvestorDashboard';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import Profile from './pages/Profile';
import Entrepreneurs from './pages/Entrepreneurs';
import Investors from './pages/Investors';
import Settings from './pages/Settings';
import ChatPage from './pages/ChatPage';
import Layout from './components/Layout';
import { UserProvider, useUser } from './context/UserContext';
import './styles/App.css';

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useUser();
  
  if (!user) {
    return <Login />;
  }
  
  if (user.role === 'entrepreneur') {
    return <EntrepreneurDashboard userType="entrepreneur" />;
  } else {
    return <InvestorDashboard userType="investor" />;
  }
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <Layout>
                <DashboardRouter />
              </Layout>
            } />
            <Route path="/profile" element={
              <Layout>
                <Profile />
              </Layout>
            } />
            <Route path="/entrepreneurs" element={
              <Layout>
                <Entrepreneurs />
              </Layout>
            } />
            <Route path="/investors" element={
              <Layout>
                <Investors />
              </Layout>
            } />
            <Route path="/settings" element={
              <Layout>
                <Settings />
              </Layout>
            } />
            <Route path="/chat" element={
              <Layout>
                <ChatPage />
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
