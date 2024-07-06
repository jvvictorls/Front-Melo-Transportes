import {
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineCar,
  AiOutlineMenu } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import NavUser from '../../components/NavUser';

const name = 'João';
const email = 'joao@dev.com';
function User() {
  return (
    <aside
      className="flex flex-cloumn justify-center
      max-w-sm border-4 border-black min-h-screen text-xl"
    >
      <div className=" mt-8 h-1/2 w-5/6">
        <button className="p-4">
          <AiOutlineMenu size={ 30 } />
        </button>
        <div
          className="p-4 bg-white rounded-xl shadow-lg
        flex items-center space-x-4 border min-w-full"
        >
          <div>
            <AiOutlineUser size={ 30 } />
          </div>
          <div>
            <h1 className="font-semibold">
              Olá,
              {' '}
              { name }
            </h1>
            <p className="text-slate-500">{email}</p>
          </div>
        </div>
        <div className="mt-16 flex border-black justify-between ">
          <div
            className="flex justify-center items-center w-1/4  "
          >
            <AiOutlineSearch size={ 30 } />
          </div>
          <input
            className="p-4 w-3/4 focus:outline-none "
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <div className="mt-16">
          <NavUser Icon={ AiOutlineHome } page='' text="Home" />
          <NavUser Icon={ AiOutlineUser } page='' text="Perfil"/>
          <NavUser Icon={ AiOutlineCar } page='request' text="Solicitar Rota" />
          <NavUser Icon={ BsCurrencyDollar } page='' text="Relatório de Rotas" />
        </div>
      </div>
      <div />
    </aside>
  );
}

export default User;
