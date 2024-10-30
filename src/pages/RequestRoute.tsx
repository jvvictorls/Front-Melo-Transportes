/* eslint-disable max-lines */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormData } from '../types/FormData';
import { get, post } from '../services/request';
import Modal from '../components/modal';

export default function RequestRoute() {
  const [user, setUser] = useState({
    name: '',
    id: '',
    role: '',
  });
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [collaborators, setCollaborators] = useState(['']);
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    destination: '',
    costCenter: '',
    collaborators: [],
    date: new Date(),
    time: new Date().toLocaleTimeString().slice(0, 5),
    userId: user.id,
  });
  // const [collaborators, setCollaborators] = useState([]);
  const [originInput, setOriginInput] = useState(false);
  const [destinationInput, setDestinationInput] = useState(false);
  const costsCentre = [
    'Produção', 'Manutenção',
    'Administração',
    'Qualidade', 'HSE', 'Indústria', 'Atendimento ao Cliente', 'Logística',
  ];
  const [collaborator, setCollaborator] = useState('');
  const [filteredCollaborators, setFilteredCollaborators] = useState<string[]>([]);
  const [errorOriginDestionation, setErrorOriginDestination] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [erroFields, setErroFields] = useState<string[] >([]);
  const RESIDENCIA = 'Residência';

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCollaboratorChange = (e: any) => {
    const { value } = e.target;
    setCollaborator(value);
    const filterCollaborators = collaborators.filter((employee) => {
      return employee.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCollaborators(filterCollaborators);
  };

  function validateFields(formDatatoDb: FormData) {
    if (formDatatoDb.origin === formDatatoDb.destination) {
      setErrorOriginDestination(true);
      setTimeout(() => {
        setErrorOriginDestination(false);
      }, 3000);
    }
    if (formDatatoDb.origin === ''
    || formDatatoDb.destination === ''
    || formDatatoDb.costCenter === ''
    || !formDatatoDb.date
    || formDatatoDb.time === ''
    || formDatatoDb.collaborators.length === 0) {
      setErroFields([
        formDatatoDb.origin === '' ? 'Origem' : '',
        formDatatoDb.destination === '' ? 'Destino' : '',
        formDatatoDb.costCenter === '' ? 'Centro de Custo' : '',
        !formDatatoDb.date ? 'Data' : '',
        formDatatoDb.time === '' ? 'Hora' : '',
        formDatatoDb.collaborators.length === 0 ? 'Colaboradores' : '',
      ]);
      setInvalidInput(true);
      return true;
    }
    setInvalidInput(false);
    return false;
  }

  function formatData(formDatatoDb: FormData) {
    const collaboratorsIds = apiData.filter((employee: any) => formDatatoDb
      .collaborators.includes(employee.name)).map((employee: any) => employee.id);
    const onFormat = collaboratorsIds.map((id: string) => {
      const data = {
        origin: formDatatoDb.origin,
        destination: formDatatoDb.destination,
        costCenter: formDatatoDb.costCenter,
        collaborators: [{
          id,
        }],
        date: formDatatoDb.date,
        time: formDatatoDb.time,
        userId: formDatatoDb.userId,
      };
      return data;
    });
    return onFormat[0];
  }

  const handleRouteRequest = async (formDatatoDb: FormData) => {
    const hasErrors = validateFields(formDatatoDb);
    if (hasErrors) return;
    if (erroFields.length > 0) return;
    const formattedData = formatData(formDatatoDb);
    const { status } = await post('/extra-routes', formattedData);
    if (status === 201) navigate('/dashboard');
  };

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (!userId) navigate('/login');
    handleChange({ target: { name: 'userId', value: userId } });
    async function fetchData() {
      const response = await get('/collaborators');
      setApiData(response);
      const collaboratorsName = response.map((employee: any) => employee.name);
      setCollaborators(collaboratorsName);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const updatedCollaborators = collaborators
      .filter((employee) => !formData.collaborators.includes(employee));
    setCollaborators(updatedCollaborators);

    if (formData.origin === 'Outro') {
      setOriginInput(true);
    }
    if (formData.origin === 'Fábrica' || formData.origin === RESIDENCIA) {
      setOriginInput(false);
    }
    if (formData.destination === 'Fábrica' || formData.destination === RESIDENCIA) {
      setDestinationInput(false);
    }
    if (formData.destination === 'Outro') {
      setDestinationInput(true);
    }
  }, [formData.origin, formData.destination, formData.collaborators]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-row lg:mt-10">
      <form
        className="w-5/6 flex flex-col items-center space-y-6 justify-center py-8"
        onSubmit={ (e) => e.preventDefault() }
      >
        <h1 className="text-3xl font-semibold text-gray-800">Solicitar Rota</h1>

        <div className="w-5/6 flex flex-col space-y-12">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <select
                value={ formData.origin }
                onChange={ (e) => handleChange(e) }
                name="origin"
                id="origin"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                hidden={ originInput }
              >
                <option value="" disabled selected hidden>Origem</option>
                <option value="Residência">Residência</option>
                <option value="Fábrica">Fábrica</option>
                <option value="Outro">Outro...</option>
              </select>

              {(formData.origin !== 'Fábrica' && formData.origin !== RESIDENCIA) && (
                <div className="flex justify-evenly">
                  <input
                    type="text"
                    name="origin"
                    id="origin"
                    placeholder="Qual?"
                    value={ formData.origin }
                    onChange={ (e) => handleChange(e) }
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    hidden={ !originInput }
                    onClick={ () => setFormData({ ...formData, origin: '' }) }
                  />
                </div>
              )}
            </div>

            <div className="w-1/2">
              <select
                name="destination"
                id="destination"
                value={ formData.destination }
                onChange={ (e) => handleChange(e) }
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                hidden={ destinationInput }
              >
                <option value="" disabled selected hidden>Destino</option>
                <option value="Residência">Residência</option>
                <option value="Fábrica">Fábrica</option>
                <option value="Outro">Outro...</option>
              </select>
              {
                formData.destination !== 'Fábrica'
                 && formData.destination !== 'Residência' && (
                   <div className="flex justify-evenly">
                     <input
                       type="text"
                       name="destination"
                       id="destination"
                       placeholder="Qual?"
                       value={ formData.destination }
                       onChange={ (e) => handleChange(e) }
                       onClick={ () => setFormData({ ...formData, destination: '' }) }
                       className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                       hidden={ !destinationInput }
                     />
                   </div>
                )
              }
            </div>
          </div>

          {errorOriginDestionation && (
            <span
              className=" rounded-3xl border border-red-400 text-red-400 px-4 py-2 text-gray-700 flex flex-row justify-between items-center "
            >
              Origem e destino não podem ser iguais
            </span>
          )}

          <div className="flex flex-col space-y-4">
            <select
              name="costCenter"
              id="costCenter"
              value={ formData.costCenter }
              onChange={ (e) => handleChange(e) }
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" hidden selected>Centro de Custo</option>
              {costsCentre.map((costCenter) => (
                <option key={ costCenter } value={ costCenter }>
                  {costCenter}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <input
                type="text"
                name="collaborators"
                id="collaborators"
                placeholder="Buscar um colaborador..."
                value={ collaborator }
                onChange={ (e) => handleCollaboratorChange(e) }
                className="w-full border border-gray-300 rounded-lg px-4 py-2
                text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {filteredCollaborators.length > 0 && (
                <div
                  className="w-full max-h-40 overflow-y-scroll border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filteredCollaborators.map((employee, index) => (
                    <option
                      className="w-full border-gray-300 p-2 hover:bg-gray-200 cursor-pointer rounded"
                      key={ index }
                      onClick={ () => {
                        setFormData({ ...formData,
                          collaborators: [...formData.collaborators, employee] });
                        setCollaborator('');
                        setFilteredCollaborators([]);
                      } }
                    >
                      {employee}
                    </option>
                  ))}
                </div>
              )}
            </div>
          </div>
          {formData.collaborators.length > 0 && (
            <div
            // Quando for telas pequenas, colocar flex, flex-col, space-y-4
              className="xs:flex xs:flex-col xs:space-y-4 xs:w-full xs:items-center xs:justify-center lg:grid lg:grid-cols-2 lg:gap-4 lg:w-full xl:grid xl:grid-cols-4 xl:gap-4 xl:w-full"
            >
              {formData.collaborators.map((employee, index) => (
                <span
                  className="w-full rounded-3xl border border-red-400 text-red-400 px-4 py-2 text-gray-700 flex flex-row justify-between items-center  "
                  key={ index }
                >
                  {employee}
                  <button
                    className="rounded-3xl ml-4 text-red-400 text-gray-700"
                    onClick={
                    () => {
                      const updatedCollaborators = formData.collaborators
                        .filter((item) => item !== employee);
                      setFormData({ ...formData, collaborators: updatedCollaborators });
                      const returnCollaborator = formData.collaborators[index];
                      setCollaborators([...collaborators, returnCollaborator]);
                    }
                    }
                  >
                    x
                  </button>
                </span>

              ))}
            </div>)}

          <div className="flex space-x-4">
            <input
              type="date"
              value={ formData.date.toString().slice(0, 10) }
              onChange={ (e) => handleChange(e) }
              name="date"
              id="date"
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="time"
              value={ formData.time }
              onChange={ (e) => handleChange(e) }
              id="time"
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="w-3/4 flex justify-evenly space-x-8">
          <button
            type="button"
            className="bg-red-400 text-white rounded-lg w-32 hover:bg-red-700 transition-colors"
            onClick={ () => navigate('/') }
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg w-32 hover:bg-blue-700 transition-colors"
            onClick={ () => handleRouteRequest(formData) }
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
