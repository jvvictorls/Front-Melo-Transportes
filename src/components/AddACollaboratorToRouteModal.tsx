import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import ConditionalRender from './ConditionalRender';
import { CollaboratorsRoutesType } from '../types/CollaboratorsType';
import { get, patch } from '../services/request';

type AddACollaboratorToRouteModalProps = {
  onClose: () => void;
  routeCollaborators: CollaboratorsRoutesType[];
};

function AddACollaboratorToRouteModal({ onClose, routeCollaborators }
: AddACollaboratorToRouteModalProps) {
  const [collaborators, setCollaborators] = useState<CollaboratorsRoutesType[]>([]);
  const [search, setSearch] = useState('');
  const [collaboratorToAdd, setCollaboratorToAdd] = useState<CollaboratorsRoutesType>();
  const [collaboratorToRemove, setCollaboratorToRemove] = useState<CollaboratorsRoutesType[]>(
    routeCollaborators,
  );
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await get('/collaborators');
      setCollaborators(response);
    }
    fetchData();
  }, []);
  console.log(collaboratorToRemove);
  function handleAddCollaborator() {
    if (!collaboratorToAdd) return;
    patch(`/routes/${params.id}/add/${collaboratorToAdd.id}`);
    window.alert('Colaborador adicionado com sucesso!');
    onClose();
    window.location.reload();
  }

  return (
    <form
      onSubmit={ (e) => e.preventDefault() }
      className="flex flex-col items-center justify-center fixed inset-0 bg-black bg-opacity-50"
    >
      <div
        className="relative bg-white p-4 rounded-lg h-3/4 w-3/4 flex flex-col items-center justify-center space-y-8"
      >
        <IoMdClose
          className="absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={ onClose }
        />
        <h1
          className="text-3xl text-center"
        >
          Buscar colaborador...
        </h1>
        <div
          className="w-full flex flex-col items-center justify-center"
        >
          <input
            className="h-8 w-3/4 rounded-2xl border border-black p-4"
            type="text"
            name="search"
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />
          <ConditionalRender
            condition={ search.length > 0 && !collaboratorToAdd }
          >
            <div className="w-3/4 overflow-auto max-h-32 border rounded-lg border-black">
              { collaborators
                .filter((collaborator) => collaborator.name.toLowerCase()
                  .includes(search.toLowerCase()))
                .map((collaborator) => (
                  <div
                    key={ collaborator.id }
                    className="flex flex-col items-center justify-center max-h-8 w-full px-4 py-4 border-b border-black"
                  >
                    <button
                      className=""
                      onClick={ () => setCollaboratorToAdd(collaborator) }
                    >
                      { collaborator.name }
                    </button>
                  </div>
                ))}
            </div>
          </ConditionalRender>
        </div>
        {collaboratorToAdd && (
          <div
            className="flex flex-col items-center justify-center w-3/4 border border-black p-4 rounded-lg"
          >
            <h2
              className="text-lg"
            >
              { collaboratorToAdd.name }
            </h2>
            <p>
              { collaboratorToAdd.neighborhood }
            </p>
          </div>
        )}
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"
          onClick={ () => handleAddCollaborator() }
        >
          Adicionar
        </button>
      </div>
    </form>
  );
}

export default AddACollaboratorToRouteModal;
