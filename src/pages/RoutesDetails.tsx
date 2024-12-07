import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../services/request';
import { RouteType } from '../types/Routes';
import { CollaboratorsType } from '../types/collaboratorsType';

export default function RoutesDetails() {
  const [data, setData] = useState<RouteType>();
  const params = useParams();
  console.log(data);
  useEffect(() => {
    async function fetchData() {
      const response = await get(`/routes/${params.id}`);
      setData(response);
    }
    fetchData();
  }, [params.id]);
  return (
    data
      ? (
        <div
          className="min-h-screen w-full flex justify-center items-center"
        >
          <div
            className=" overflow-x-auto flex w-full justify-center h-3/5 xs:justify-normal"
          >

            <table
              className="table-auto border-collapse border border-black w-5/6"
            >
              <thead>
                <tr className="border border-black">
                  <th
                    className="px-4 border border-black"
                  >
                    Identificação
                  </th>
                  <th
                    className="px-4 border border-black"
                  >
                    Empresa
                  </th>
                  <th
                    className="px-4"
                  >
                    Motorista
                  </th>
                  <th
                    className="px-4"
                  >
                    Máximo de colaboradores
                  </th>
                  <th
                    className="px-4"
                  >
                    Lotação atual
                  </th>
                </tr>
                <tr className="text-center">
                  <td>{data.name}</td>
                  <td>{data.client}</td>
                  <td>{data.driver}</td>
                  <td>{data.maxCollaborators}</td>
                  <td>{data.collaborators.length}</td>

                </tr>
                <tr
                  className=""
                >
                  <th>Bairro</th>
                  <th>Posição</th>
                  <th>Colaboradores</th>
                  <th>Telefone</th>
                  <th>Departamento</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody
                className="text-center"
              >
                {data.collaborators.map((collaborator: CollaboratorsType, index) => (
                  <tr key={ collaborator.id }>
                    <td>{collaborator.neighborhood}</td>
                    <td>{index + 1}</td>
                    <td>{collaborator.name}</td>
                    <td>{collaborator.phone}</td>
                    <td>{collaborator.department}</td>
                    <td>{(collaborator.createdAt).toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>)
      : (
        <div
          className="min-h-screen flex justify-center items-center w-full"
        >
          <p>Carregando...</p>
        </div>
      )
  );
}
