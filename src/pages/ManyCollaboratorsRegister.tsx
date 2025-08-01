import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCollaboratorsContext from '../context/AddCollaboratorsContext';

function ManyCollaboratorsToAddCheckoutSection() {
  const { collaboratorsToAdd } = useContext(AddCollaboratorsContext);
  const navigate = useNavigate();
  return (
    <section className="w-full mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Colaboradores a serem adicionados
      </h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border border-gray-200 text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 border">Nome</th>
              <th className="px-4 py-3 border">Endereço</th>
              <th className="px-4 py-3 border">Telefone</th>
              <th className="px-4 py-3 border">Empresa</th>
              <th className="px-4 py-3 border">Departamento</th>
              <th className="px-4 py-3 border">Cargo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {collaboratorsToAdd.map((collaborator, idx) => (
              <tr key={ idx } className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{collaborator.name}</td>
                <td className="px-4 py-2 border whitespace-normal break-words">
                  {`${collaborator.street}, ${collaborator.neighborhood}`}
                </td>
                <td className="px-4 py-2 border">{collaborator.phone}</td>
                <td className="px-4 py-2 border">{collaborator.company}</td>
                <td className="px-4 py-2 border">{collaborator.department}</td>
                <td className="px-4 py-2 border">{collaborator.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold shadow transition"
            onClick={ () => navigate('/collaborator/register') }
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition"

          >
            Confirmar
          </button>
        </div>
      </div>
    </section>
  );
}

export default ManyCollaboratorsToAddCheckoutSection;
