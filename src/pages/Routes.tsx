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
      <div className="flex flex-col xs:mt-24 md:mt-24 lg:mt-32 xl:w-5/6 xl:mt-32 2xl:w-5/6 2xl:mt-32 items-center h-full">
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
