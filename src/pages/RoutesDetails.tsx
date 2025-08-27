import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs';
import { get, patch } from '../services/request';
import { RouteFromDb } from '../types/RoutesTypes';
import sortRouteCollaborators from '../utils/sortRouteCollaborators';
import { CollaboratorsRoutesType } from '../types/CollaboratorsType';
import ConditionalRender from '../components/ConditionalRender';
import AddACollaboratorToRouteModal from '../components/AddACollaboratorToRouteModal';
import ModalEditCollaborator from '../components/ModalEditCollaborator';
import AuthContext from '../context/AuthContext';

export default function RoutesDetails() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<RouteFromDb>();
  const params = useParams();
  const editCondition = user?.type === 'driver' || user?.type === 'admin';
  const [removeCollaborator, setRemoveCollaborator] = useState(false);
  const [addCollaborator, setAddCollaborator] = useState(false);
  const [editCollaborator, setEditCollaborator] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<CollaboratorsRoutesType>(
    {} as CollaboratorsRoutesType,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response: RouteFromDb = await get(`/routes/${params.id}`);
        sortRouteCollaborators(response);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [editCollaborator, removeCollaborator, params.id]);

  const convertedDate = data?.updatedAt ? moment(data.updatedAt).format('DD/MM/YYYY HH:mm') : '';

  async function handleDelete(collaborator: CollaboratorsRoutesType) {
    setRemoveCollaborator(true);
    await patch(`/routes/${params.id}/remove/${collaborator.id}`);
    setRemoveCollaborator(false);
  }

  function handleEditUser(collaborator: CollaboratorsRoutesType) {
    setCollaboratorToEdit(collaborator);
    setEditCollaborator(true);
  }

  return data ? (
    <div className="min-h-screen max-w-full flex flex-col items-center py-12 px-4 bg-gray-100">
      {/* Card principal */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Detalhes da Rota</h1>
          <p className="text-sm text-gray-500">
            Última atualização:
            {' '}
            {convertedDate || '---'}
          </p>
        </div>

        {/* Informações principais da rota */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Identificação</p>
            <p className="text-lg font-semibold">{data.id}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Empresa</p>
            <p className="text-lg font-semibold">{data.client}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Motorista</p>
            <p className="text-lg font-semibold">{data.driver}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Máximo de Colaboradores</p>
            <p className="text-lg font-semibold">{data.maxCollaborators}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Lotação Atual</p>
            <p className="text-lg font-semibold">{data.collaborators.length}</p>
          </div>
        </div>

        {/* Tabela de colaboradores */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Bairro</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Posição</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Colaborador</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Telefone</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Departamento</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Horário</th>
                {editCondition && (
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {data.collaborators.map((collaborator, index) => (
                <tr key={ collaborator.id } className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{collaborator.neighborhood}</td>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{collaborator.name}</td>
                  <td className="px-4 py-3">{collaborator.phone}</td>
                  <td className="px-4 py-3">{collaborator.department}</td>
                  <td className="px-4 py-3">{collaborator.routes_collaborators.boardingTime}</td>
                  {editCondition && (
                    <td className="px-4 py-3 flex space-x-4 justify-center">
                      {' '}
                      <BsTrash
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={ () => handleDelete(collaborator) }
                      />
                      <BsPencil
                        className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                        onClick={ () => handleEditUser(collaborator) }
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botão de adicionar */}
        <ConditionalRender
          condition={
          editCondition && data.collaborators.length < data.maxCollaborators
          }
        >
          <div className="flex justify-center">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              onClick={ () => setAddCollaborator(true) }
            >
              <BsPlus className="mr-2" />
              {' '}
              Adicionar Colaborador
            </button>
          </div>
        </ConditionalRender>
      </div>

      {/* Modais */}
      <ConditionalRender condition={ addCollaborator }>
        <AddACollaboratorToRouteModal
          onClose={ () => setAddCollaborator(false) }
          routeCollaborators={ data.collaborators }
        />
      </ConditionalRender>
      <ModalEditCollaborator
        open={ editCollaborator }
        onClose={ () => setEditCollaborator(false) }
        collaborator={ collaboratorToEdit }
        setEditCollaborator={ setCollaboratorToEdit }
      />
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-600">Carregando...</p>
    </div>
  );
}
