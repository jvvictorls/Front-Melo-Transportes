import { CollaboratorsType, CollaboratorsRoutesType, CollaboratorsTypeForEdit } from './CollaboratorsType';

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

export type RouteFromDb = {
  id: number;
  name: string;
  driver: string;
  client: string;
  maxCollaborators: number;
  shift: string;
  period: string;
  createdAt: string;
  updatedAt: Date;
  collaborators: CollaboratorsRoutesType[];
};

export type RouteForDb = {
  id: number;
  name: string;
  driver: string;
  client: string;
  maxCollaborators: number;
  shift: string;
  period: string;
  createdAt: string;
  updatedAt: Date;
  collaborators: CollaboratorsTypeForEdit[];
};
