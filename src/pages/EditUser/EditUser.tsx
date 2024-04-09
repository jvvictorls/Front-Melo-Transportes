import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { requestUpdateUser } from '../../services/request';
import './EditUser.css';

function EditUser() {
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [updated, setUpdated] = useState(false);
  const updateUser = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const { data } = await requestUpdateUser(`/users/${id}`, { name, email, password });
      setUpdated(true);
    } catch (error) {
      console.log('Não foi possível atualizar o usuário.');
      setUpdated(false);
    }
  };
  if (updated) return <Navigate to={ `/user/${id}` } />;
  return (
    <div
      className="edit-container"
    >
      <form
        className="edit-form"
      >
        <h1
          className="edit-title
      "
        >
          Olá,
          {' '}
          {userName}
        </h1>
        <label htmlFor="name">
          Nome:
          <input
            className="edit-input"
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            className="edit-input"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            className="edit-input"
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          className="edit-btn"
          type="submit"
          onClick={ (event) => updateUser(event) }
        >
          Editar usuário
        </button>
        <button
          className="cancel-edit-btn"
          onClick={ () => navigate(`/user/${id}`) }
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditUser;
