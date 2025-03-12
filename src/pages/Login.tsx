import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { requestLogin } from '../services/request';
import { setAccessToken } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const login = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const { accessToken } = await requestLogin('/auth/login', { email, password });
      setAccessToken(accessToken);
      setIsLogged(true);
      setLoginError(false);
    } catch (error) {
      console.log(error);
      setIsLogged(false);
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  };

  if (isLogged) return <Navigate to="/dashboard" />;

  return (
    <div className="w-full">
      <div
        className="flex h-screen bg-gray-200 flex-col items-center xs:justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-center 2xl:justify-center"
        onSubmit={ (e) => e.preventDefault() }
      >
        <form
          className="bg-white flex flex-col items-center justify-evenly border border-gray-300 p-8 rounded-lg shadow-md w-2/8 h-2/4 lg:w-2/6 lg:h-2/4 xl:w-2/6 xl:h-3/4 2xl:w-2/6 2xl:h-3/4"
        >

          <h1 className="text-3xl">Área do usuário</h1>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="login__login_input"
            placeholder="Login"
          />
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type={ seePassword ? 'text' : 'password' }
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            data-testid="login__password_input"
            placeholder="Senha"
          />
          { loginError && <p className="login-error">Email ou senha inválidos.</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={ (event) => login(event) }
          >
            Entrar
          </button>
          <Link
            className="text-blue-500 hover:text-blue-700 underline"
            to="/register"
          >
            Ainda não tenho conta
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
