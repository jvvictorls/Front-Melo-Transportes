import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/request';

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState(false);
  const [sucess, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="flex w-1/2 xs:w-5/6 md:w-11/12 lg:w-3/4 xl:w-4/6 flex-col items-center h-full py-16">
        {/* Add your sign-in form or components here */}
        <form
          onSubmit={ (e) => e.preventDefault() }
          className="bg-white p-8 rounded-lg shadow-md max-w-md flex flex-col items-center space-y-6 border border-gray-300 "
        >
          <h1>Cadastre-se!</h1>
          <input
            type="text"
            value={ formData.name }
            name="name"
            onChange={ (e) => handleChange(e) }
            placeholder="Nome"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required

          />
          <input
            type="email"
            value={ formData.email }
            name="email"
            onChange={ (e) => handleChange(e) }
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && (
            <p className="text-red-500 text-sm">
              Email já cadastrado. Tente novamente.
            </p>
          )}
          <input
            type="password"
            value={ formData.password }
            name="password"
            onChange={ (e) => handleChange(e) }
            placeholder="Senha"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={ () => post('/users/register', formData)
              .then((response) => {
                if (response.status === 201) {
                  setSuccess(true);
                  setTimeout(() => {
                    navigate('/login');
                  }, 3000);
                }
              }).catch((fetchingError) => {
                if (fetchingError.response.status === 409) {
                  setError(true);
                  setTimeout(() => {
                    setError(false);
                  }, 3000);
                }
              }) }
          >
            Entrar
          </button>
          <Link
            to="/login"
            className="text-blue-600 hover:underline mt-4"
          >
            Já possui uma conta? Faça login
          </Link>
          {sucess && (
            <div
              className="absolute min-h-screen inset-0 bg-opacity-50 bg-black  flex justify-center items-center w-full "
            >
              <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md xs:w-5/6 md:w-11/12 lg:w-3/4 xl:w-4/6">
                <p className="text-sm">
                  Cadastro realizado com sucesso! Redirecionando para o login...
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
