import { useState } from 'react';
import { FormData } from '../types/FormData';

export default function useRequestRouteForm(userId: number) {
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    destination: '',
    costCenter: '',
    collaborators: [],
    date: new Date(),
    time: new Date().toLocaleTimeString().slice(0, 5),
    userId,
  });
  const [invalidInput, setInvalidInput] = useState(false);
  const [erroFields, setErroFields] = useState<string[] >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCollaborator = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, name],
    }));
  };

  const handleRemoveCollaborator = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((c) => c !== name),
    }));
  };

  return {
    formData,
    handleChange,
    handleAddCollaborator,
    handleRemoveCollaborator,
    invalidInput,
    setInvalidInput,
    erroFields,
    setErroFields,
  };
}
