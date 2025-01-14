import { useEffect, useState } from 'react';
import { get } from '../services/request';
import RoutesCards from '../components/routesCards';

export default function Routes() {
  const [apiResponse, setApiResponse] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await get('/routes');
      setApiResponse(data);
    }
    fetchData();
  }, []);
  console.log(apiResponse);
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
    >
      <div className="flex w-2/3 flex-col justify-center items-center h-full">
        <h1
          className="text-3xl mb-8"
        >
          Rotas
        </h1>
        <RoutesCards
          routes={ apiResponse }
        />
      </div>
    </div>
  );
}
