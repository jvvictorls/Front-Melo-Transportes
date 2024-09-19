import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function RequestRoute() {
  const [collaborators, setCollaborators] = useState(['julia', 'maria', 'joão', 'Robert', 'Ned', 'Arya', 'Sansa', 'Bran', 'Jon', 'Daenerys', 'Tyrion', 'Cersei', 'Jaime', 'Brienne', 'Podrick', 'Sam', 'Gilly', 'Davos', 'Melisandre', 'Varys', 'Grey Worm', 'Missandei', 'Jorah', 'Theon', 'Yara', 'Euron', 'The Hound', 'The Mountain', 'Beric', 'Tormund', 'Gendry', 'Bronn', 'Qyburn', 'Lyanna', 'Mormont', 'Beric', 'Edd']);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    costCentre: '',
    collaborators: [''],
    date: '',
    time: ''
  });
  // const [collaborators, setCollaborators] = useState([]);
  const [originInput, setOriginInput] = useState(false);
  const [destinationInput, setDestinationInput] = useState(false);
  const costsCentre = [ 'Produção', 'Manutenção', 'Administração', 'Qualidade', 'HSE', 'Indústria', 'Atendimento ao Cliente', 'Logística']
  const [collaborator, setCollaborator] = useState('');
  const [filteredCollaborators, setFilteredCollaborators] = useState<string[]>([]);
  
  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value });
    
  };

  const handleCollaboratorChange = (e: any) => {
    const { value } = e.target;
    setCollaborator(value);
    const filteredCollaborators = collaborators.filter((collaborator) => {
      return collaborator.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCollaborators(filteredCollaborators);
  }
  
  useEffect(() => {
    if(formData.origin === 'Outro') {
      setOriginInput(true)
    }
    if(formData.origin === 'Fábrica' || formData.origin === 'Residência' ) {
      setOriginInput(false);
    }
    if (formData.destination === "Fábrica" || formData.destination === 'Residência') {
      setDestinationInput(false);
    }
    if(formData.destination === 'Outro') {
      setDestinationInput(true)
  }
}, [formData.origin, formData.destination]);

  return (
    <div className="flex h-screen mt-4 items-center justify-center bg-gray-100 flex-row">
      <form 
        className="w-full h-full bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-6"
        onSubmit={(e)=> e.preventDefault()}
      >
        <h1 className="text-3xl font-semibold text-gray-800">Solicitar Rota</h1>

        <div className="w-5/6 flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <select
                value={formData.origin}
                onChange={(e) => handleChange(e)}
                name="origin"
                id="origin"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                hidden={originInput}
              >
                <option value="" disabled selected hidden>Origem</option>
                <option value="Residência">Residência</option>
                <option value="Fábrica">Fábrica</option>
                <option value="Outro">Outro...</option>
              </select>

              {(formData.origin !== 'Fábrica' && formData.origin !== 'Residência')  && (
                <div className="flex justify-evenly">
                  <input
                    type="text"
                    name="origin"
                    id="origin"
                    placeholder="Qual?"
                    value={formData.origin}
                    onChange={(e) => handleChange(e)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    hidden={!originInput}
                    onClick={() => setFormData({...formData, origin: ''})}
                  />
                </div>
              )}
            </div>
           
            <div className="w-1/2">
              <select
                name="destination"
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange(e)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                hidden={destinationInput}
              >
                <option disabled selected hidden>Destino</option>
                <option value="Residência">Residência</option>
                <option value="Fábrica">Fábrica</option>
                <option value="Outro">Outro...</option>
              </select>
              {
                formData.destination !== 'Fábrica' && formData.destination != 'Residência' && (
                  <div className="flex justify-evenly">
                    <input
                      type="text"
                      name="destination"
                      id="destination"
                      placeholder="Qual?"
                      value={formData.destination}
                      onChange={(e) => handleChange(e)}
                      onClick={() => setFormData({...formData, destination: ''})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      hidden={!destinationInput}
                    />
                  </div>
                )
              }
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <select
              name="costCentre"
              id="costCentre"
              value={formData.costCentre}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" hidden selected>Centro de Custo</option>
              {costsCentre.map((costCentre) => (
                <option key={costCentre} value={costCentre}>
                  {costCentre}
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
                value={collaborator}
                onChange={(e) => handleCollaboratorChange(e)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {filteredCollaborators.length > 0 && (
                <ul
                className="w-full border border-l-0 border-gray-300 rounded-md py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filteredCollaborators.map((collaborator, index) => (
                    <li 
                    className=" w-full p-2 hover:bg-gray-200 cursor-pointer rounded"
                    key={index}
                    onClick={() => {
                      setFormData({...formData, collaborators: [...formData.collaborators, collaborator]});
                      setCollaborator('');
                      setFilteredCollaborators([]);}
                    }
                    >
                      {collaborator}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div
      className="w-1/2 flex w-full space-x-4">
            {formData.collaborators.map((collaborator, index) => (
              <span
              className="rounded bg-red-700" key={index}>{collaborator}</span>
            ))}
        </div>

          <div className="flex space-x-4">
            <input
              type="date"
              name="date"
              id="date"
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="time"
              id="time"
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="w-3/4 flex justify-evenly space-x-8">
          <button
            type="button"
            className="bg-red-500 text-white  rounded-lg w-32 hover:bg-red-700 transition-colors"
            onClick={() => <Navigate to="/dashboard" />}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg w-32 hover:bg-blue-700 transition-colors"
            onClick={() => console.log(formData, `isso é um teste ${collaborator}` )}
          >
            Solicitar Rota
          </button>
        </div>
      </form>
    <div>
  </div>
</div>
  );
}