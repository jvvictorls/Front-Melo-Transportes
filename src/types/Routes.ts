import { CollaboratorsType } from './collaboratorsType';

export type RouteType = {
  id: number;
  name: string;
  driver: string;
  client: string;
  collaborators: CollaboratorsType[];
  maxCollaborators: number;
  currentCollaborators: number;
  createdAt: string;
  updatedAt: string;
};
