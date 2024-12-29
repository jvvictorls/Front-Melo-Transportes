import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import { get, patch } from '../services/request';
import { RouteType } from '../types/Routes';
import sortRouteCollaborators from '../utils/sortRouteCollaborators';
import { CollaboratorsType } from '../types/collaboratorsType';
import ConditionalRender from '../components/ConditionalRender';
import AddACollaboratorToRouteModal from '../components/AddACollaboratorToRouteModal';
import ModalEditCollaborator from '../components/ModalEditCollaborator';

export default function RoutesDetails() {
  const [data, setData] = useState<RouteType>();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const editCondition = user.type === 'driver' || user.type === 'admin';
  const [removeCollaborator, setRemoveCollaborator] = useState(false);
  const [addCollaborator, setAddCollaborator] = useState(false);
  const [editCollaborator, setEditCollaborator] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<CollaboratorsType>(
    {} as CollaboratorsType,
  );
  useEffect(() => {
    async function fetchData() {
      const response = await get(`/routes/${params.id}`);
      setData(response);
    }
    fetchData();
  }, [editCollaborator, removeCollaborator, params.id]);
  const convertedDate = data?.updatedAt ? moment(data.updatedAt).format('DD/MM/YYYY HH:mm') : '';

  if (data) {
    sortRouteCollaborators(data);
  }

  function handleEditUser(collaborator: CollaboratorsType) {
    setCollaboratorToEdit(collaborator);
    setEditCollaborator(true);
  }
  async function handleDelete(collaborator: CollaboratorsType) {
    setRemoveCollaborator(true);
    await patch(`/routes/${params.id}/remove/${collaborator.id}`);
    setRemoveCollaborator(false);
  }
  return (
    data
      ? (
        <div
          className="min-h-screen w-full flex flex-col justify-center items-center relative mb-4"
        >
          <div
            className=" overflow-x-auto flex w-full justify-center h-3/5 xs:justify-normal"
          >

            <table
              className="table-auto border-collapse w-5/6"
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
                  <th
                    colSpan={ 3 }
                  >
                    Última atualização
                  </th>
                </tr>
                <tr className="text-center border border-black">
                  <td className="border border-black">{data.name}</td>
                  <td className="border border-black">{data.client}</td>
                  <td className="border border-black">{data.driver}</td>
                  <td className="border border-black">{data.maxCollaborators}</td>
                  <td className="border border-black">{data.collaborators.length}</td>
                  <td className="">{convertedDate }</td>

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
                  <ConditionalRender
                    condition={ editCondition }
                  >
                    <th className="border border-black">Remover</th>
                  </ConditionalRender>
                  <ConditionalRender
                    condition={ editCondition }
                  >
                    <th className="border border-black">Editar</th>
                  </ConditionalRender>

                </tr>
              </thead>
              <tbody
                className="text-center"
              >
                {data.collaborators.map((collaborator: CollaboratorsType, index) => (
                  <tr
                    key={ collaborator.id }
                    className=""
                  >
                    <td className="border border-black">{collaborator.neighborhood}</td>
                    <td className="border border-black">{index + 1}</td>
                    <td className="border border-black">{collaborator.name}</td>
                    <td className="border border-black">{collaborator.phone}</td>
                    <td className="border border-black">{collaborator.department}</td>
                    <td className="border border-black">{collaborator.boardingTime}</td>
                    <ConditionalRender
                      condition={ editCondition }
                    >
                      <td
                        className="border border-black place-items-center"
                      >
                        {' '}
                        <BsTrash
                          className="text-red-700 cursor-pointer"
                          onClick={
                            () => handleDelete(collaborator)
                          }
                        />
                      </td>
                    </ConditionalRender>
                    <ConditionalRender
                      condition={ editCondition }
                    >
                      <td
                        className="border border-black place-items-center"
                      >
                        {' '}
                        <BsPencil
                          className="text-yellow-700 cursor-pointer"
                          onClick={ () => handleEditUser(collaborator) }
                        />
                      </td>
                    </ConditionalRender>

                  </tr>
                ))}
                <ConditionalRender
                  condition={ editCondition }
                >
                  { data.collaborators.length < data.maxCollaborators && (
                    <tr className="h-20">
                      <td className="" colSpan={ 6 }>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={ () => setAddCollaborator(true) }
                        >
                          {' '}
                          <BsPlus />
                        </button>
                      </td>
                    </tr>
                  )}
                </ConditionalRender>

              </tbody>
            </table>
          </div>
          <AddACollaboratorToRouteModal
            isOpen={ addCollaborator }
            onClose={ () => setAddCollaborator(false) }
          />
          <ModalEditCollaborator
            open={ editCollaborator }
            onClose={ () => setEditCollaborator(false) }
            collaborator={ collaboratorToEdit }
          />
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
