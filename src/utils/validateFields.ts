import { FormData } from '../types/FormData';

function validateFields(form: FormData) {
  const errors = [];
  if (form.origin === form.destination) {
    errors.push('Origem e destino não podem ser iguais');
  }
  if (!form.origin.trim()) errors.push('Origem');
  if (!form.destination.trim()) errors.push('Destino');
  if (!form.costCenter) errors.push('Centro de Custo');
  if (!form.time) errors.push('Hora');
  if (!form.date) errors.push('Data');
  if (form.collaborators.length === 0) errors.push('Colaboradores');
  return errors;
}

export default validateFields;
