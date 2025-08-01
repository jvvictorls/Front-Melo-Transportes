import { useState } from 'react';
import AddCollaboratorsContext from './AddCollaboratorsContext';
import { CollaboratorsTypeForDb } from '../types/CollaboratorsType';

export default function AddCollaboratorsProvider({ children }: { children: React.ReactNode }) {
  const [collaboratorsToAdd, setCollaboratorsToAdd] = useState<CollaboratorsTypeForDb[]>([]);

  return (
    <AddCollaboratorsContext.Provider
      value={ { collaboratorsToAdd, setCollaboratorsToAdd } }
    >
      {children}
    </AddCollaboratorsContext.Provider>
  );
}
