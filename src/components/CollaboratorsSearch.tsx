import { useState } from 'react';
import FormField from './FormField';

type CollaboratorsSearchProps = {
  collaborators: string[];
  selected: string[];
  onAdd: (collaborator: string) => void;
};

export default function CollaboratorsSearch({ collaborators,
  selected, onAdd }: CollaboratorsSearchProps) {
  const [collaborator, setCollaborator] = useState('');

  const handleCollaboratorChange = (e: any) => {
    const { value } = e.target;
    setCollaborator(value);
  };
  const filteredCollaborators = collaborators.filter((employee) => employee
    .toLowerCase()
    .includes(collaborator.toLowerCase()) && !selected.includes(employee));

  return (
    <div className="flex space-x-4">
      <div className="w-full">
        <FormField
          label="Colaboradores"
          name="collaborators"
          value={ collaborator }
          onChange={ (e) => handleCollaboratorChange(e) }
          type="text"
        />
        {collaborator.length > 0 && (
          <div
            className="w-full max-h-40 overflow-y-scroll border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filteredCollaborators.map((employee, index) => (
              <option
                className="w-full border-gray-300 p-2 hover:bg-gray-200 cursor-pointer rounded"
                key={ index }
                onClick={ () => {
                  onAdd(employee);
                  setCollaborator('');
                } }
              >
                {employee}
              </option>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
