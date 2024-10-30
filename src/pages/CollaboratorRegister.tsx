import { useState } from 'react';

export default function CollaboratorRegister() {
  const [form, setForm] = useState({
    name: '',
    neighborhood: '',
    street: '',
    number: '',
    city: '',
    phone: '',
    company: '',
    department: '',
    position: '',
  });
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(form);
  }
  return (
    <div
      className="min-h-screen w-full items-center flex flex-col space-y-4 justify-evenly"
    >
      <form className="w-5/6 xl:w-1/2 2xl:w-1/2">
        <h1
          className="bold text-center text-2xl"
        >
          Cadastro
        </h1>
        <div
          className="grid xs:gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-8 xl:gap-y-10 2xl:gap-y-10 mt-4 h-full"
        >
          <input
            type="text"
            name="name"
            id="name"
            value={ form.name }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Nome"
          />
          <input
            type="text"
            name="neighborhood"
            id="neighborhood"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ form.neighborhood }
            onChange={ (e) => handleFormChange(e) }
            placeholder="Bairro"
          />
          <input
            type="text"
            name="street"
            id="street"
            value={ form.street }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Rua"
          />
          <input
            type="text"
            name="number"
            id="number"
            value={ form.number }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Nº"
          />
          <input
            type="text"
            name="city"
            id="city"
            value={ form.city }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Cidade"
          />
          <input
            type="number"
            name="phone"
            id="phone"
            value={ form.phone }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Telefone"
          />
          <input
            type="text"
            name="company"
            id="company"
            value={ form.company }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Empresa"
          />
          <input
            type="text"
            name="department"
            id="department"
            value={ form.department }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Departamento"
          />
          <input
            type="text"
            name="position"
            id="position"
            value={ form.position }
            onChange={ (e) => handleFormChange(e) }
            className="w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cargo"
          />
        </div>

      </form>
      <div
        className="w-full flex justify-evenly p-4 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2"
      >
        <button
          className="w-1/3 bg-red-700 p-1 px-4 md:p-4 rounded-xl text-white hover:bg-red-500"
        >
          Cancelar
        </button>
        <button
          className="w-1/3 bg-blue-700 p-1 px-4 rounded-xl text-white hover:bg-blue-500"
          onClick={ (e) => handleSubmit(e) }
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
