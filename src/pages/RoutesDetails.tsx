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

function handleColSpan(head: string | null | number, data?: string, editCondition?: boolean) {
  if (head === 'Última atualização' && editCondition) {
    return 3;
  }
  if (head === 'Ações') {
    return 2;
  }
  if (head === data && editCondition) {
    return 3;
  }
}

export default function RoutesDetails() {
  const [data, setData] = useState<RouteType>();
  const params = useParams();
  const editCondition = false;
  const [removeCollaborator, setRemoveCollaborator] = useState(false);
  const [addCollaborator, setAddCollaborator] = useState(false);
  const [editCollaborator, setEditCollaborator] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<CollaboratorsType>(
    {} as CollaboratorsType,
  );
  const tableHead = [
    'Identificação',
    'Empresa',
    'Motorista',
    'Máximo de colaboradores',
    'Lotação atual',
    'Última atualização',
  ];
  const tableSubHead = [
    'Bairro',
    'Posição',
    'Colaboradores',
    'Telefone',
    'Departamento',
    'Horário',
    editCondition ? 'Ações' : null,
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get(`/routes/${params.id}`);
        console.log(response);
        setData(response);
      } catch (error) {
        console.log(error);
      }
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
          className="min-h-screen w-full flex flex-col justify-center items-center"
        >
          <div
            className="p-2 my-16 h-3/4 w-1/2 overflow-x-auto flex items-center justify-center bg-white rounded-xl shadow-xl xs:w-11/12 xs:h-1/2 xs:justify-normal sm:justify-normal sm:w-5/6 sm:h-5/6 md:w-3/4 md:h-3/4 md:justify-center lg:w-3/4 lg:h-3/4 lg:justify-center"
          >

            <table
              className="table-auto border-collapse w-full h-full "
            >
              <thead>
                <tr>
                  {tableHead.map((head) => (
                    <th
                      key={ head }
                      className="border border-black"
                      colSpan={ handleColSpan(head, undefined, editCondition) }
                    >
                      {head}
                    </th>
                  ))}
                </tr>
                <tr className="text-center ">
                  {[data.id, data.client, data.driver, data.maxCollaborators,
                    data.collaborators.length, convertedDate].map((item) => (
                      <td
                        key={ item }
                        className="border border-black"
                        colSpan={ handleColSpan(item, convertedDate, editCondition) }
                      >
                        {item }
                      </td>
                  ))}
                </tr>
                <tr>
                  {tableSubHead.map((head) => (
                    <th
                      key={ head }
                      className={ head === null ? 'border-none' : 'border border-black' }
                      colSpan={ handleColSpan(head) }
                    >
                      {head === null ? null : head }
                    </th>
                  ))}
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
          <ConditionalRender
            condition={ addCollaborator }
          >

            <AddACollaboratorToRouteModal
              onClose={ () => setAddCollaborator(false) }
              routeCollaborators={ data.collaborators }
            />
          </ConditionalRender>
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
