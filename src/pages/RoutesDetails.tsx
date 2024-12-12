import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsFillTrash3Fill } from 'react-icons/bs';
import moment from 'moment';
import { get } from '../services/request';
import { RouteType } from '../types/Routes';
import { CollaboratorsType } from '../types/collaboratorsType';

export default function RoutesDetails() {
  const [data, setData] = useState<RouteType>();
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await get(`/routes/${params.id}`);
      setData(response);
    }
    fetchData();
  }, [params.id]);
  const convertedDate = data?.updatedAt ? moment(data.updatedAt).format('DD/MM/YYYY HH:mm') : '';
  if (data) {
    data.collaborators.sort((a, b) => {
      if (a.boardingTime > b.boardingTime) {
        return 1;
      }
      if (a.boardingTime < b.boardingTime) {
        return -1;
      }
      return 0;
    });
  }

  return (
    data
      ? (
        <div
          className="min-h-screen w-full flex flex-col justify-center items-center"
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
                    className="px-4 border border-black"
                  >
                    Motorista
                  </th>
                  <th
                    className="px-4 border border-black"
                  >
                    Máximo de colaboradores
                  </th>
                  <th
                    className="px-4 border border-black"
                  >
                    Lotação atual
                  </th>
                  <th>
                    Última atualização
                  </th>
                </tr>
                <tr className="text-center border border-black">
                  <td className="border border-black">{data.name}</td>
                  <td className="border border-black">{data.client}</td>
                  <td className="border border-black">{data.driver}</td>
                  <td className="border border-black">{data.maxCollaborators}</td>
                  <td className="border border-black">{data.collaborators.length}</td>
                  <td>{convertedDate }</td>

                </tr>
                <tr
                  className="border border-black"
                >
                  <th className="border border-black">Bairro</th>
                  <th className="border border-black">Posição</th>
                  <th className="border border-black">Colaboradores</th>
                  <th className="border border-black">Telefone</th>
                  <th className="border border-black">Departamento</th>
                  <th className="border border-black">Horário</th>
                </tr>
              </thead>
              <tbody
                className="text-center"
              >
                {data.collaborators.map((collaborator: any, index) => (
                  <tr
                    key={ collaborator.id }
                    className="border border-black"
                  >
                    <td className="border border-black">{collaborator.neighborhood}</td>
                    <td className="border border-black">{index + 1}</td>
                    <td className="border border-black">{collaborator.name}</td>
                    <td className="border border-black">{collaborator.phone}</td>
                    <td className="border border-black">{collaborator.department}</td>
                    <td className="border border-black">{collaborator.boardingTime}</td>
                    {isEditing ? (
                      <span
                        className="flex w-full"
                      >
                        <BsFillTrash3Fill
                          className="flex-grow cursor-pointer text-red-700 h-full text-center"
                        />
                      </span>

                    ) : null}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="flex mt-12 gap-x-8"
          >
            <button
              className={ `${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-md` }
              onClick={ () => setIsEditing(!isEditing) }
            >
              {isEditing ? 'Aplicar' : 'Editar'}
            </button>
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
