import { FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { GrBus, GrPlan, GrUserPolice } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { PiSteeringWheelFill } from 'react-icons/pi';

function Dashboard() {
  return (
    <div className="w-full bg-slate-100 flex flex-col items-center justify-center pb-8">
      <div
        className="w-full h-[75vh] flex items-center justify-center pb-8"
      >
        <img
          className="object-cover h-full w-full"
          src="src/public/teste1.jpg"
          alt="Imagem de exemplo"
        />
      </div>
      <div
        className="xs:w-11/12 lg:w-11/12 w-1/2 flex flex-col justify-evenly min-h-[75vh] space-y-8"
      >

        <div className="h-fit  bg-white flex flex-col items-center">
          <h2 className="p-4 text-2xl text-cyan-950 font-bold w-full">Benefícios</h2>
          <div className="p-4 grid xs:grid-rows-2 xs:grid-cols-2 sm:grid-rows-2 sm:grid-cols-2 grid-cols-4 gap-4 w-5/6">
            <div className="w-fit text-center flex flex-col items-center">
              <FaCheckCircle className="text-3xl " />
              <p className="text-lg">Pontualidade Garantida</p>
            </div>
            <div className="w-fit text-center flex flex-col items-center">
              <GrBus className="text-3xl " />
              <p className="text-lg">Frota Moderna e Confiável</p>
            </div>
            <div className="w-fit text-center flex flex-col items-center">
              <GrUserPolice className="text-3xl " />
              <p className="text-lg">
                Motoristas Profissionais
              </p>
            </div>
            <div className="w-fit text-center flex flex-col items-center">
              <FaMapMarkerAlt className="text-3xl " />
              <p className="text-lg">Cobertura Regional Ampla</p>
            </div>
          </div>
        </div>

        <div className="h-fit bg-white flex flex-col items-center">
          <h2 className="p-8 text-2xl text-cyan-950 font-bold w-full">Como funciona</h2>
          <div className="p-4 grid xs:grid-rows-2 xs:grid-cols-2 sm:grid-rows-2 sm:grid-cols-2 grid-cols-4 gap-4 w-5/6">
            <div className=" text-center flex flex-col items-center">
              <MdEmail className="text-3xl " />
              <p className="text-lg">Solicitação</p>
            </div>
            <div className=" text-center flex flex-col items-center">
              <GrPlan className="text-3xl " />
              <p className="text-lg">Planejamento</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <FaCheckCircle className="text-3xl " />
              <p className="text-lg min-w-full">
                Aprovação
              </p>
            </div>
            <div className=" text-center flex flex-col items-center">
              <PiSteeringWheelFill className="text-3xl " />
              <p className="text-lg">Implementação</p>
            </div>
          </div>
        </div>
      </div>

      <div className="xs:w-11/12 lg:w-11/12 w-1/2 flex flex-col justify-evenly my-8 bg-red-700">
        <div className="h-1/2 bg-white">
          <h2 className="p-8 text-2xl">Sobre</h2>
          <div>
            <img
              className="h-300 w-300"
              src="src/public/teste3.jpg"
              alt="foto sobre a empresa"
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
