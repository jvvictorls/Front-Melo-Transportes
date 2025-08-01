import { createContext } from 'react';
import AddCollaboratorsInterface from '../Interfaces/AddCollaboratorsInterface';

const AddCollaboratorsContext = createContext<AddCollaboratorsInterface>(
  {} as AddCollaboratorsInterface,
);

export default AddCollaboratorsContext;
