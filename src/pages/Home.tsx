import { FaCheckCircle, FaBus } from 'react-icons/fa';

function Dashboard() {
  return (
    <div className="w-full bg-[#E7E9EB] flex flex-col items-center justify-center absolute top-0 left-0">
      <img
        src="src/public/teste.jpg"
        alt="Imagem de exemplo"
        className="max-h-[1920]"
      />
      <div
        className="w-1/2 flex flex-col justify-evenly h-[75vh] space-y-8"
      >
        <div className="h-1/3  bg-white">
          <h2 className="p-8 text-2xl text-cyan-950 font-bold">Benefícios</h2>
          <div className="grid grid-cols-1 gap-4 w-5/6">
            <div className=" bg-red-700 w-full justify-around">
              <FaCheckCircle className="text-2xl" />
              <p className="text-lg">Benefício 1</p>
            </div>
          </div>
        </div>
        <div className="h-1/4 bg-white">
          <h2 className="p-8 text-2xl">Outra Seção</h2>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-evenly h-[75vh] my-8 bg-red-700">
        <div className="h-1/2 bg-white">
          <h2 className="p-8 text-2xl">Mais uma seção</h2>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
