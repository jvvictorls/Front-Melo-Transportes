import { ReactNode } from 'react';

export type CollaboratorsTypeForDb = {
  admissionDate: string;
  name: string;
  shift?: string;
  phone?: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  company: string;
  department?: string;
  position?: string;
};

export type CollaboratorsType = {
  id: number;
  name: string;
  neighborhood: string;
  city: string;
  street: string;
  number: string;
  phone: string;
  boardingTime: string;
  company: string;
  department: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  length: ReactNode;
};

export type CollaboratorsRoutesType = {
  id: number;
  name: string;
  neighborhood: string;
  phone: string;
  department: string;
  routes_collaborators: {
    boardingTime: string;
  };
};

export type CollaboratorsTypeForEdit = {
  id: number;
  name: string;
  neighborhood: string;
  phone: string;
  department: string;
  boarding_time: string;
};
