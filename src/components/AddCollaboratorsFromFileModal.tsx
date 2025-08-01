import { MdCancel } from 'react-icons/md';
import { read, utils } from 'xlsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollaboratorsTypeForDb } from '../types/CollaboratorsType';
import { FromXLSType } from '../types/FromXlsType';
import AddCollaboratorsContext from '../context/AddCollaboratorsContext';

type AddCollaboratorsFromFileModalProps = {
  onClose: () => void;
  modal: boolean;
};

async function handleFileAsync() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (!file) return;
  const data = await file.arrayBuffer();
  const workbook = read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet, { header: 1 }) as FromXLSType[];
  const tabledData: CollaboratorsTypeForDb[] = jsonData.slice(1).map((row: FromXLSType) => ({
    admissionDate: row[0],
    name: row[1],
    shift: row[2],
    phone: row[3],
    street: row[4],
    neighborhood: row[5],
    company: row[6],
    department: row[7],
    position: row[8],
  }));
  return tabledData;
}

function AddCollaboratorsFromFileModal({
  onClose,
  modal,
}: AddCollaboratorsFromFileModalProps) {
  const { setCollaboratorsToAdd } = useContext(AddCollaboratorsContext);
  const navigate = useNavigate();

  return (
    <div className={ `${modal ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40` }>
      <div className="bg-white rounded-xl p-8 w-[95%] max-w-lg shadow-xl">
        {/* Header com botão de fechar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Adicionar Colaboradores por Arquivo
          </h2>
          <button
            onClick={ onClose }
            aria-label="Fechar"
            className="text-red-500 hover:text-red-700"
          >
            <MdCancel className="text-2xl" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Selecione um arquivo
          {' '}
          <strong>.XLS</strong>
          {' '}
          ou
          {' '}
          <strong>.XLSX</strong>
          {' '}
          com os dados dos colaboradores.
        </p>

        <div className="space-y-4">
          <input
            type="file"
            accept=".xlsx, .xls"
            id="fileInput"
            className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
          />

          <div className="flex justify-end space-x-3 pt-2">
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition"
              onClick={ () => {
                handleFileAsync()
                  .then((data) => {
                    if (data) {
                      setCollaboratorsToAdd(data);
                      navigate('/collaborators/register/checkout');
                      onClose();
                    }
                  })
                  .catch((error) => console.error('Error reading file:', error));
              } }
            >
              Prosseguir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCollaboratorsFromFileModal;
