import { useEffect, useState } from 'react';
import { get } from '../services/request';
import RoutesCards from '../components/routesCards';
import { RouteFromDb } from '../types/RoutesTypes';

export default function Routes() {
  const [apiResponse, setApiResponse] = useState<RouteFromDb[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data: RouteFromDb[] = await get('/routes');
      setApiResponse(data);
    }
    fetchData();
  }, []);
  return (
    <div
      className="w-full flex flex-col justify-center items-center"
    >
      <div className="flex w-1/2 xs:w-5/6 md:w-11/12 lg:w-3/4 xl:w-4/6 flex-col items-center h-full py-16 ">
        <h1
          className="text-3xl mb-9"
        >
          Rotas
        </h1>
        <div
          className="w-full flex justify-center mb-32"
        >
          <RoutesCards
            routes={ apiResponse }
          />
        </div>
      </div>
    </div>
  );
}
