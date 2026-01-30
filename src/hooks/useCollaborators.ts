import { useEffect, useState } from 'react';
import { get } from '../services/request';
import { CollaboratorsType } from '../types/CollaboratorsType';

export default function useCollaborators() {
  const [apiData, setApiData] = useState<CollaboratorsType[]>([]);
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await get('/collaborators');
      setApiData(response);
      const collaboratorsName = response.map((employee: CollaboratorsType) => employee.name);
      setNames(collaboratorsName);
    }
    fetchData();
  }, []);

  return { apiData, names };
}
