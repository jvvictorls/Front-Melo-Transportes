import { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import ConditionalRender from './ConditionalRender';
import { CollaboratorsType } from '../types/collaboratorsType';
import { get } from '../services/request';

type AddACollaboratorToRouteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function AddACollaboratorToRouteModal({ isOpen, onClose }: AddACollaboratorToRouteModalProps) {
  const [collaborators, setCollaborators] = useState<CollaboratorsType[]>([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    async function fetchData() {
      const response = await get('/collaborators');
      setCollaborators(response);
    }
    fetchData();
  });
  if (!isOpen) return null;

  function handleAddCollaborator() {
    console.log('Adicionar colaborador');
    onClose();
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
          className="text-3xl border-l"
        >
          Buscar colaborador...
        </h1>
        <div
          className="w-full flex flex-col items-center justify-center"
        >
          <input
            className="h-8 w-3/4 rounded-lg border border-black"
            type="text"
            name="search"
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />
          <ConditionalRender
            condition={ search.length > 0 }
          >
            <div className="w-3/4 bg-red-700 overflow-auto space-y-4 max-h-32">
              { collaborators
                .filter((collaborator) => collaborator.name.toLowerCase()
                  .includes(search.toLowerCase()))
                .map((collaborator) => (
                  <div
                    key={ collaborator.id }
                    className="flex flex-col items-center justify-center max-h-8 w-full px-4 py-4 rounded"
                  >
                    <p>{ collaborator.name }</p>
                  </div>
                ))}
            </div>
          </ConditionalRender>
        </div>
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
