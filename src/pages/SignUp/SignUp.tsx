import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { requestRegister } from '../../services/request';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [register, setRegister] = useState<boolean>(false);
  const signUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const { data } = await requestRegister('/users/signup', { name, email, password });
      console.log(data);
      setRegister(true);
    } catch (error) {
      setRegister(false);
    }
  };

  if (register) return <Navigate to="/" />;

  return (
    <div className="signup-container">
      <section className="signup-section">
        <h1
          className="signup-title"
        >
          Cadastre-se!
        </h1>
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              className="signup-input"
              type="text"
              data-testid="signup__input-name"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              className="signup-input"
              type="email"
              data-testid="signup__input-email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              className="signup-input"
              type="password"
              data-testid="signup__input-password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
          <button
            className="signup-button"
            type="submit"
            data-testid="signup__button"
            onClick={ (e) => signUp(e) }
          >
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
