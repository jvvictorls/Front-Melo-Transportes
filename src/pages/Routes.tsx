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
      className="mt-20 flex flex-col justify-center items-center w-full content"
    >
      <h1
        className="text-3xl mb-8"
      >
        Rotas
      </h1>
      <RoutesCards
        routes={ apiResponse }
      />
    </div>
  );
}
