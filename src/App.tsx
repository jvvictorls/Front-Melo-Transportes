import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RequestRoute from './pages/RequestRoute';
import RoutesPage from './pages/Routes';
import CollaboratorRegister from './pages/CollaboratorRegister';
import RoutesDetails from './pages/RoutesDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/routes" element={ <RoutesPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/dashboard" index element={ <Dashboard /> } />
        <Route path="/request" element={ <RequestRoute /> } />
        <Route path="/collaborator/register" element={ <CollaboratorRegister /> } />
        <Route path="/routes/:id" element={ <RoutesDetails /> } />
      </Route>
    </Routes>
  );
}

export default App;
