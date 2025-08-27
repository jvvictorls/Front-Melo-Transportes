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
import SignInPage from './pages/SignInPage';
import InConstructionPage from './components/InConstructionPage';

const adminTypes = ['admin', 'supervisor', 'coordinator', 'manager', 'superadmin'];
const allTypes = ['admin', 'supervisor', 'coordinator', 'manager', 'superadmin', 'user', 'driver'];
function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/" index element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signin" element={ <SignInPage /> } />
        <Route
          path="/routes"
          element={
            <ProtectedRoutes
              allowedTypes={ allTypes }
            >
              <RoutesPage />
            </ProtectedRoutes>
        }
        />
        <Route
          path="/request"
          element={
            <ProtectedRoutes allowedTypes={ adminTypes }>
              <RequestRoute />
            </ProtectedRoutes>
        }
        />
        <Route
          path="collaborators"
          element={
            <ProtectedRoutes allowedTypes={ adminTypes }>
              <InConstructionPage />
            </ProtectedRoutes>
        }
        />

        <Route
          path="/collaborator/register"
          element={
            <ProtectedRoutes allowedTypes={ adminTypes }>
              <CollaboratorRegister />
            </ProtectedRoutes>
        }
        />

        <Route
          path="/collaborators/register/checkout"
          element={
            <ProtectedRoutes
              allowedTypes={ adminTypes }
            >
              <ManyCollaboratorRegister />
            </ProtectedRoutes>
            }
        />
        <Route
          path="/routes/:id"
          element={
            <ProtectedRoutes
              allowedTypes={ allTypes }
            >
              <RoutesDetails />
            </ProtectedRoutes>
        }
        />
        <Route path="/unauthorized" element={ <Unauthorized /> } />
        <Route path="/contact" element={ <Contact /> } />
      </Route>
    </Routes>
  );
}

export default App;
