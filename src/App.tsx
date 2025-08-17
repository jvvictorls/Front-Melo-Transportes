import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Home from './pages/Home';
import RequestRoute from './pages/RequestRoute';
import RoutesPage from './pages/Routes';
import CollaboratorRegister from './pages/CollaboratorRegister';
import RoutesDetails from './pages/RoutesDetails';
import ManyCollaboratorRegister from './pages/ManyCollaboratorsRegister';
import ProtectedRoutes from './components/ProtectedRoutes';
import Unauthorized from './pages/Unauthorized';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/" index element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/routes" element={ <RoutesPage /> } />
        <Route
          path="/request"
          element={
            <ProtectedRoutes allowedTypes={ ['admin', 'supervisor', 'coordinator', 'manager', 'superadmin'] }>
              <RequestRoute />
            </ProtectedRoutes>
        }
        />
        <Route path="/collaborator/register" element={ <CollaboratorRegister /> } />
        <Route path="/collaborators/register/checkout" element={ <ManyCollaboratorRegister /> } />
        <Route path="/routes/:id" element={ <RoutesDetails /> } />
        <Route path="/unauthorized" element={ <Unauthorized /> } />
        <Route path="/contact" element={ <Contact /> } />
      </Route>
    </Routes>
  );
}

export default App;
