import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteUser } from '../../services/request';
import './User.css';

function User() {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const name = localStorage.getItem('name');
  const id = localStorage.getItem('id');

  if (!name) return <Navigate to="/" />;

  const deleteThisUser = async () => {
    try {
      await deleteUser(`/users/${id}`);
      localStorage.clear();
      setDeleted(true);
    } catch (error) {
      console.log('Não foi possível deletar o usuário.');
    }
  };

  if (deleted) return <Navigate to="/" />;

  return (
    <section className="user-container">
      <div
        className="user-container-div"
      >
        <h1>
          Olá,
          {' '}
          {name}
        </h1>
        <button
          onClick={ () => navigate(`/user/${id}/edit`) }
          className="user-container-button"
        >
          Editar usuário
        </button>
        <button
          className="user-container-button"
          onClick={ () => {
            localStorage.clear();
            navigate('/');
          } }
        >
          Fazer Logout
        </button>
        <button
          onClick={ deleteThisUser }
          className="delete-btn"
        >
          Deletar minha conta
        </button>
      </div>
    </section>
  );
}

export default User;
