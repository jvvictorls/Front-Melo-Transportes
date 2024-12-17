import { CollaboratorsType } from './collaboratorsType';

export type RouteType = {
  id: number;
  name: string;
  driver: string;
  client: string;
  collaborators: CollaboratorsType[];
  maxCollaborators: number;
  createdAt: string;
  updatedAt: Date;
};
