import { useEffect, useState } from 'react';
import { get } from '../services/request';

export default function ClientArea() {
  const [extraRoutes, setExtraRoutes] = useState([]);
  const tableHeaders = ['Nº', 'Origem', 'Destino', 'Data', 'Status', 'Colaboradores', 'Solicitante', 'Preço'];
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/extra-routes');
        setExtraRoutes(response);
      } catch (error) {
        console.error('Erro ao buscar dados da área do cliente:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="h-screen w-1/2 flex flex-col items-start">
      <div>
        <h1 className="py-8 text-2xl font-bold">Área do Cliente</h1>
        <h2 className="">Bem-vindo à sua área de monitoramento</h2>
      </div>
      <div className="overflow-x-auto w-full my-8">
        <h1 className="pt-8 text-2xl font-bold">Rotas Extras Pedidas</h1>
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

    </div>
  );
}
