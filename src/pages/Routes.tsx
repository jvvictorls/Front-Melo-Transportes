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
      className="flex flex-col justify-center items-center h-screen w-full justify- "
    >
      <h1
        className="text-3xl"
      >
        Rotas
      </h1>
      <RoutesCards
        routes={ apiResponse }
      />
    </div>
  );
}
