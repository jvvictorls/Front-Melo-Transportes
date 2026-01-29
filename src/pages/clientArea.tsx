import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../services/request';
import ConditionalRender from '../components/ConditionalRender';
import RoutesCards from '../components/routesCards';
import AuthContext from '../context/AuthContext';
import { RouteFromDb } from '../types/RoutesTypes';
import GoBackButton from '../components/goBackButton';

async function filtRoutesByUser(userId: number | undefined): Promise<RouteFromDb[]> {
  if (!userId || userId <= 0) {
    return [];
  }
  const user = await get(`users/${userId}`);
  const filteredRoutes = await get(`routes/username/${user.name}`);
  if (filteredRoutes.length === 0) {
    return [];
  }
  return filteredRoutes;
}

export default function ClientArea() {
  const { user } = useContext(AuthContext);
  const [extraRoutes, setExtraRoutes] = useState([]);
  const [routes, setRoutes] = useState<RouteFromDb[]>([]);
  const tableHeaders = ['Nº', 'Origem', 'Destino', 'Data', 'Status', 'Colaboradores', 'Solicitante', 'Preço'];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const extraRoutesFromDb = await get('/extra-routes');
        const routesFromDb = await get('/routes');
        if (user?.type !== 'admin' && user?.type !== 'superadmin') {
          const filtRoutes = await filtRoutesByUser(user?.id);
          setRoutes(filtRoutes);
          return;
        }
        setRoutes(routesFromDb);
        setExtraRoutes(extraRoutesFromDb);
      } catch (error) {
        console.error('Erro ao buscar dados da área do cliente:', error);
      }
    }
    fetchData();
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen my-8 w-1/2 xs:w-5/6 md:w-5/6 lg:w-5/6 flex flex-col items-start">
      <GoBackButton
        className=" my-4"
      />
      <div className="my-8">
        <h1 className="text-2xl font-bold">Área do Cliente</h1>
        <p className="mt-8">
          Olá, Bem-vindo à sua área de
          {' '}
          {user?.type === 'admin' ? 'monitoramento' : 'acompanhamento'}
        </p>
      </div>
      <ConditionalRender condition={ user?.type === 'admin' || user?.type === 'superadmin' }>
        <div className="mt-8 w-full flex flex-row justify-between">
          <h2 className="text-2xl font-bold">Rotas Extras</h2>
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={ () => navigate('rotas-extras') }
          >
            Solicitar Rota Extra
          </button>

        </div>
        <div className="overflow-x-auto w-full my-8">
          <table className="">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={ header } className="border px-4 py-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {extraRoutes.map((route: any) => (
                <tr key={ route.id }>
                  <td className="border px-4 py-2">{route.id}</td>
                  <td className="border px-4 py-2">{route.origin}</td>
                  <td className="border px-4 py-2">{route.destination}</td>
                  <td className="border px-4 py-2">{new Date(route.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{route.status}</td>
                  <td className="border px-4 py-2">{route.collaborators.map((collaborator: any) => collaborator.name).join(', ')}</td>
                  <td className="border px-4 py-2">{route.user.name}</td>
                  <td className="border px-4 py-2">{route.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={ 7 } className="border px-4 py-2 text-center font-semibold">Total</td>
                <td className="border px-4 py-2 font-semibold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    extraRoutes
                      .reduce((total: number, route: any) => total + Number(route?.price || 0), 0),
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ConditionalRender>

      <div
        className="w-full"
      >
        <div className="flex justify-between">
          <h2 className="py-8 text-2xl font-bold">Suas Rotas</h2>
          <ConditionalRender condition={ user?.type === 'admin' || user?.type === 'superadmin' }>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500 h-10 self-center"
              onClick={ () => navigate('/area-do-cliente/rotas') }
            >
              Ir para página de Rotas
            </button>
          </ConditionalRender>

        </div>

        <RoutesCards
          routes={ routes }
        />

      </div>

    </div>
  );
}
