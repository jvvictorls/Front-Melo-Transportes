import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { CollaboratorsType } from '../types/collaboratorsType';
import { put } from '../services/request';

type ModalEditCollaboratorProps = {
  open: boolean;
  onClose: () => void;
  collaborator: CollaboratorsType;
};

function ModalEditCollaborator(props: ModalEditCollaboratorProps) {
  const { collaborator, open, onClose } = props;
  const [editCollaborator, setEditCollaborator] = useState<CollaboratorsType>(collaborator);
  useEffect(() => {
    setEditCollaborator(collaborator);
  }, [collaborator]);
  if (!open) {
    return null;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditCollaborator({ ...collaborator, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    await put(`/collaborators/${collaborator.id}`, editCollaborator);
  }

  return (
    <div
      className="absolute min-h-screen inset-0 bg-opacity-50 bg-black  flex justify-center items-center "
    >
      <div className="flex w-full h-full items-center justify-center">
        <div
          className="flex flex-col justify-center bg-white w-3/4 h-3/4 p-4 rounded-lg"
        >
          <button
            className="place-items-end top-0 right-0"
            onClick={ onClose }
          >
            {' '}
            <IoMdClose />
          </button>
          <h1
            className="text-lg font-bold text-center p-4"
          >
            Editar colaborador
          </h1>
          <div
            className="flex h-full flex-col justify-between items-center"
          >
            <div
              className="flex flex-col w-11/12 h-full space-y-10 "
            >
              <div
                className="flex flex-col"
              >
                <label
                  className="p-2"
                  htmlFor="name"
                >
                  Nome:
                </label>
                <input
                  className="border border-gray-400 rounded-md pl-4 py-2 cursor-not-allowed"
                  type="text"
                  id="name"
                  value={ editCollaborator.name }
                  disabled
                />
              </div>
              <div className="flex flex-col">

                <label htmlFor="neighborhood">
                  Bairro:
                </label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md pl-4 py-2 cursor-text"
                  id="neighborhood"
                  name="neighborhood"
                  value={ editCollaborator.neighborhood }
                  onChange={ (e) => handleChange(e) }
                />
              </div>
              <div className="flex flex-col">

                <label htmlFor="number">
                  Numero:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="border border-gray-400 rounded-md pl-4 py-2 cursor-text"
                  value={ editCollaborator.phone }
                  onChange={ (e) => {
                    handleChange(e);
                  } }
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="flex flex-col">

                <label
                  htmlFor="boardingTime"
                >
                  Horário:
                </label>
                <input
                  type="time"
                  id="boardingTime"
                  name="boardingTime"
                  className="text-center border border-gray-400 rounded-md pl-4 py-2 cursor-pointer place-items-center"
                  value={ editCollaborator.boardingTime }
                  onChange={ (e) => handleChange(e) }
                />
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={ () => handleSave() }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditCollaborator;
