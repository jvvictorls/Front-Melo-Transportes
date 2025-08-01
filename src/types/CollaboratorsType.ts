import { ReactNode } from 'react';

export type CollaboratorsTypeForDb = {
  name: string;
  admissionDate: string;
  shift: string;
  phone: string;
  neighborhood: string;
  street: string;
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
