import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function RequestRoute() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    costCentre: '',
    date: '',
    time: ''
  });
  const [collaborators, setCollaborators] = useState('');

  const costsCentre = ['Selecione', 'Produção', 'Manutenção', 'Administração', 'Qualidade', 'HSE', 'Indústria', 'Atendimento ao Cliente', 'Logística']

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="container flex justify-center items-center h-screen">
      <form 
      className="flex flex-col border border-solid border-slate-500 h-5/6 w-5/6 items-center shadow-lg rounded-lg shadow-blue-500/50 p-4 bg-white justify-evenly"
      >

        <h1 
        className="text-center text-2xl font-bold p-2 "
        >
          Solicitar Rota 
        </h1>
      

          <input 
          placeholder="Origem"
          value={formData.origin}
          onChange={(e) => handleChange(e)}
          type="text"
          name="origin" 
          id="origin" 
          className=" p-2 border w-4/5 border-solid border-gray-500 rounded-lg"
          />
          
          <input
          placeholder="Destino" 
          type="text" 
          name="destination" 
          id="destination"
          className=" p-2 border w-4/5 border-solid border-gray-500 rounded-lg"
          />

          <select 
          name="costCentre"
          id="costCentre"
          value={formData.costCentre}
          onChange={(e) => handleChange(e)}
          className=" p-2 border w-4/5 border-solid border-gray-500 rounded-lg bg-white"
          >
            {costsCentre.map((costCentre) => (
              <option 
              key={costCentre} 
              value={costCentre}>
                {costCentre}
              </option>
            ))}
          </select>
        
        {formData.costCentre === 'Selecione' ? null :  (
          <select 
          name="collaborator" 
          id="collaborator"
          className="p-2 border w-4/5 border-solid border-gray-500 rounded-lg"
          >
            <option value="">Colaboradores gerado por map</option>
          </select>)
        }

          <input 
          type="date" 
          name="date" 
          id="date"
          className=" p-2 border w-4/5 border-solid border-gray-500 rounded-lg"
          />
          
          <input 
          type="time" 
          name="time" 
          id="time" 
          className=" p-2 cursor-pointer border w-4/5 border-solid border-gray-500 rounded-lg"
          />

        <button 
        type="submit"
        className="bg-blue-500 text-white p-1 rounded-lg w-4/5 hover:bg-blue-700"
        >
          Solicitar Rota
        </button>

        <button 
        className="bg-red-500 text-white p-1 rounded-lg w-4/5 hover:bg-red-700"
        onClick={() => <Navigate to='/dashboard' />}>
          Cancelar
        </button>

        <Link 
        to={'/Dashboard'}
        className="text-blue-500 hover:text-blue-700 p-1 rounded-lg w-4/5 text-center underline-offset-1 "
        >
          Obter relatório de rotas
        </Link>
      </form>
    </div>
  );
}