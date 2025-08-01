import { useState } from 'react';
import AddCollaboratorsFromFileModal from '../components/AddCollaboratorsFromFileModal';
import AddCollaboratorForm from '../components/AddColaboratorForm';

export default function CollaboratorRegister() {
  const [modal, setModal] = useState(false);
  return (
    <div
      className="min-h-screen w-full items-center flex flex-col space-y-4 justify-evenly  p-4"
    >
      <AddCollaboratorForm
        setModal={ () => setModal(true) }
      />
      <div>
        <AddCollaboratorsFromFileModal
          onClose={ () => setModal(false) }
          modal={ modal }
        />
      </div>
    </div>
  );
}
