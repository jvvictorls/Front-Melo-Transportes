import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="flex h-screen bg-gray-200 flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Acesso não autorizado</h1>
      <p className="mb-4">Você não tem permissão para acessar esta página. Se você acha que isso é um erro, contate o administrador do sistema.</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Voltar à página inicial
      </Link>
    </div>
  );
}
