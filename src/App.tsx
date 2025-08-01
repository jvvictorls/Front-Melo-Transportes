import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Home from './pages/Home';
import RequestRoute from './pages/RequestRoute';
import RoutesPage from './pages/Routes';
import CollaboratorRegister from './pages/CollaboratorRegister';
import RoutesDetails from './pages/RoutesDetails';
import ManyCollaboratorRegister from './pages/ManyCollaboratorsRegister';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/" index element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/routes" element={ <RoutesPage /> } />
        <Route path="/request" element={ <RequestRoute /> } />
        <Route path="/collaborator/register" element={ <CollaboratorRegister /> } />
        <Route path="/collaborators/register/checkout" element={ <ManyCollaboratorRegister /> } />
        <Route path="/routes/:id" element={ <RoutesDetails /> } />
      </Route>
    </Routes>
  );
}

export default App;
