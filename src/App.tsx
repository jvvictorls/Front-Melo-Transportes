import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp/SignUp';
import User from './pages/User/User';
import EditUser from './pages/EditUser/EditUser';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RequestRoute from './pages/RequestRoute';
import RoutesPage from './pages/Routes';
import CollaboratorRegister from './pages/CollaboratorRegister';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/routes" element={ <RoutesPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="dashboard" element={ <Dashboard /> } />
        <Route path="register" element={ <SignUp /> } />
        <Route path="/user/:id" element={ <User /> } />
        <Route path="/request" element={ <RequestRoute /> } />
        <Route path="/user/:id/edit" element={ <EditUser /> } />
        <Route path="/collaborator/register" element={ <CollaboratorRegister /> } />
      </Route>
    </Routes>
  );
}

export default App;
