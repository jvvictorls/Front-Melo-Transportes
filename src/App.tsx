import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp/SignUp';
import User from './pages/User/User';
import EditUser from './pages/EditUser/EditUser';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RequestRoute from './pages/RequestRoutes/RequestRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/login" element={ <Login /> } />
        <Route path="dashboard" element={ <Dashboard /> } />
        <Route path="register" element={ <SignUp /> } />
        <Route path="/user/:id" element={ <User /> } />
        <Route path="/request" element={ <RequestRoute /> } />
        <Route path="/user/:id/edit" element={ <EditUser /> } />
      </Route>
    </Routes>
  );
}

export default App;
