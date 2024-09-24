import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { requestLogin } from '../../services/request';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const login = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const { data } = await requestLogin('/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      setIsLogged(true);
      setLoginError(false);
    } catch (error) {
      setIsLogged(false);
      setLoginError(true);
    }
  };

  if (isLogged) return <Navigate to="/dashboard" />;

  return (
    <div className="">
      <div
        className="flex bg-gray-200 flex-col items-center justify-center h-screen"
        onSubmit={ (e) => e.preventDefault() }
      >
        <form
          className="bg-gray-white flex flex-col items-center justify-evenly border border-gray-300 p-8 rounded-lg
          shadow-lg shadow-gray-300 w-2/4 h-3/4"
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
            className=""
            onClick={ (event) => login(event) }
          >
            Entrar
          </button>
          <Link to="/register">Ainda não tenho conta</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
