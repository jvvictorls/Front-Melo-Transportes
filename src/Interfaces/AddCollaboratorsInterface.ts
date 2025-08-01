import { CollaboratorsTypeForDb } from '../types/CollaboratorsType';

interface AddCollaboratorsInterface {
  collaboratorsToAdd: CollaboratorsTypeForDb[];
  setCollaboratorsToAdd: (value: CollaboratorsTypeForDb[]) => void;
}

export default AddCollaboratorsInterface;
