import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { FormData } from '../types/FormData';
import { get, post } from '../services/request';
import Modal from '../components/modal';
import AuthContext from '../context/AuthContext';
import FormField from '../components/FormField';
import validateFields from '../utils/validateFields';
import CollaboratorsSearch from '../components/CollaboratorsSearch';
import SelectedCollaborators from '../components/SelectedCollaborators';
import { CollaboratorsType } from '../types/CollaboratorsType';

export default function RequestRoute() {
  const navigate = useNavigate();
  const costsCentre = [
    'Produção', 'Manutenção',
    'Administração',
    'Qualidade', 'HSE', 'Logística',
  ];
  const { user } = useContext(AuthContext);
  if (!user) {
    throw new Error('User not found');
  }
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    destination: '',
    costCenter: '',
    collaborators: [],
    date: new Date(),
    time: new Date().toLocaleTimeString().slice(0, 5),
    userId: user.id,
  });
  const [apiData, setApiData] = useState<CollaboratorsType[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);
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

  function formatData(form: FormData) {
    const collaborator = apiData.find((e) => form.collaborators.includes(e.name));

    if (!collaborator) return null;

    return {
      origin: form.origin,
      destination: form.destination,
      costCenter: form.costCenter,
      collaborators: [{ id: collaborator.id }],
      date: form.date,
      time: form.time,
      userId: form.userId,
    };
  }

  const handleRouteRequest = async (formDatatoDb: FormData) => {
    const errors = validateFields(formDatatoDb);
    if (errors.length) {
      setErroFields(errors);
      setInvalidInput(true);
      return;
    }
    const formattedData = formatData(formDatatoDb);
    if (!formattedData) return;
    const response = await post('/extra-routes', formattedData);
    console.log(response);
    navigate('/area-do-cliente');
  };

  useEffect(() => {
    async function fetchData() {
      const response = await get('/collaborators');
      setApiData(response);
      const collaboratorsName = response.map((employee: CollaboratorsType) => employee.name);
      setCollaborators(collaboratorsName);
    }
    fetchData();
  }, []);

  return (
    <div className="flex w-full items-center flex-col justify-center">
      <form
        className="flex flex-col bg-white w-1/2 xs:w-full items-center border border-black border-opacity-10  rounded-xl shadow-xl shadow-indigo-300 lg:mt-8 xl:mt-8 2xl:mt-8"
        onSubmit={ (e) => {
          e.preventDefault();
          handleRouteRequest(formData);
        } }
      >
        <h1 className="text-3xl my-8">Solicitar Rota</h1>
        <div className="w-5/6 flex flex-col space-y-4">
          <FormField
            label="Origem"
            name="origin"
            value={ formData.origin }
            onChange={ (e) => handleChange(e) }
          />

          <FormField
            label="Destino"
            name="destination"
            value={ formData.destination }
            onChange={ (e) => handleChange(e) }
          />

          <div className="flex flex-col">
            <label htmlFor="costCenter">Centro de Custo</label>
            <select
              name="costCenter"
              id="costCenter"
              value={ formData.costCenter }
              onChange={ (e) => handleChange(e) }
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {costsCentre.map((costCenter) => (
                <option key={ costCenter } value={ costCenter }>
                  {costCenter}
                </option>
              ))}
            </select>
          </div>

          <FormField
            label="Data"
            name="date"
            type="date"
            value={ formData.date.toString().slice(0, 10) }
            onChange={ (e) => handleChange(e) }
          />

          <FormField
            label="Hora"
            name="time"
            type="time"
            value={ formData.time }
            onChange={ (e) => handleChange(e) }
          />

          <CollaboratorsSearch
            collaborators={ collaborators }
            selected={ formData.collaborators }
            onAdd={ handleAddCollaborator }
          />

          <SelectedCollaborators
            selected={ formData.collaborators }
            onRemove={ handleRemoveCollaborator }
          />
        </div>

        <div className="w-3/4 flex xs:flex-col xs:items-center xs:w-full xs:space-y-8 justify-evenly mt-24 mb-32">
          <button
            type="button"
            className="bg-red-400 text-white py-2 rounded-lg w-32 hover:bg-red-700 transition-colors"
            onClick={ () => navigate('/') }
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg w-32 hover:bg-blue-700 transition-colors"
          >
            Solicitar Rota
          </button>
        </div>
      </form>
      <div />
      <Modal
        isVisible={ invalidInput }
        onClose={ () => setInvalidInput(false) }
        notFilledFields={ erroFields }
      />
    </div>
  );
}
