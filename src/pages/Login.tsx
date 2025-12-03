import { useState, useContext } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/request';
import AuthContext from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const { accessToken } = await requestLogin('/auth/login', { email, password });
      setAccessToken(accessToken);
      setIsLogged(true);
      setLoginError(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsLogged(false);
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  };

  if (isLogged) return <Navigate to="/" />;

  return (
    <div className="flex flex-col h-dvh justify-center items-center w-full">
      <form
        className="flex flex-col items-center justify-evenly px-8 space-y-4 border rounded-lg h-[500px]"
        onSubmit={ (e) => e.preventDefault() }
      >
        <h1 className="text-3xl py-4 text-center">Área do usuário</h1>

        <input
          className="border border-gray-300 p-2 rounded-lg w-3/4"
          type="text"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          data-testid="login__login_input"
          placeholder="Login"
        />
        <input
          className="border border-gray-300 p-2 rounded-lg w-3/4"
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
          to="/signin"
        >
          Ainda não tenho conta
        </Link>
      </form>
    </div>
  );
}

export default Login;
