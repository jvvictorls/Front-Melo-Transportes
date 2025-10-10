import { useEffect, useState } from 'react';
import moment from 'moment';
import { LuReceipt } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { get } from '../services/request';
import { SuppliesType } from '../types/SuppliesType';

export default function Suplies() {
  const [supplies, setSupplies] = useState<SuppliesType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response: SuppliesType[] = await get('/supplies');
      setSupplies(response);
    }
    fetchData();
  }, []);
  return (
    // Removido `max-h-fit` pois pode causar problemas de scroll
    <div
      className="flex flex-col w-full items-center bg-gray-100"
    >
      <div className="w-full bg-white rounded">
        <h1 className="text-center font-bold mt-8">Abastecimentos</h1>

        {/* Resumo dos abastecimentos */}
        <div className="flex justify-center items-center mt-4">
          <div className="w-fit bg-gray-200 p-4 rounded flex items-center justify-around space-x-4 xs:flex-col sm:flex-col md:flex-col">
            <div className="flex flex-col items-center">
              <h2>Valor Total em abastecimentos</h2>
              <p className="text-2xl font-bold text-green-600">
                R$
                {' '}
                {supplies.reduce((acc, supply) => acc + Number(supply.total_price), 0).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h2>Litros Totais de gasolina</h2>
              <p className="text-2xl font-bold text-green-600">
                {supplies.filter((supply) => supply.name === 'gasolina')
                  .reduce((acc, supply) => acc + Number(supply.quantity), 0).toFixed(2)}
                {' '}
                {supplies.find((supply) => supply.name === 'gasolina')?.unity}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h2>Valor Total de Diesel</h2>
              <p className="text-2xl font-bold text-green-600">
                R$
                {' '}
                {supplies.filter((supply) => supply.name === 'diesel')
                  .reduce((acc, supply) => acc + Number(supply.total_price), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabela de abastecimentos */}
        {/* Adicionando padding aqui para centralizar o contêiner da tabela */}
        <div className="p-4 overflow-x-auto">
          <div className="mb-4 flex items-center justify-between">
            <button className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700">
              Novo Abastecimento
            </button>
          </div>
          <div />
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2">Data</th>
                <th className="p-2">Veículo</th>
                <th className="p-2">Placa</th>
                <th className="p-2">Combustível</th>
                <th className="p-2">Valor por Litro</th>
                <th className="p-2">Litragem</th>
                <th className="p-2">Valor Total</th>
                <th className="p-2">Nota Fiscal</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply: SuppliesType) => (
                <tr key={ supply.id } className="border-b border-gray-300 text-center">
                  <td className="p-2">{moment(supply.created_at).format('DD/MM/YYYY HH:mm')}</td>
                  <td>{supply.vehicle.model}</td>
                  <td className="p-2">{supply.vehicle.plate}</td>
                  <td>{supply.name}</td>
                  <td className="p-2">{supply.unity_price}</td>
                  <td className="p-2">
                    {supply.quantity}
                    {' '}
                    {supply.unity}
                  </td>
                  <td className="p-2">{supply.total_price}</td>
                  <td className="p-2">
                    <Link
                      to={ supply.fiscal_note }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center justify-center"
                    >
                      <LuReceipt />
                      <span className="sr-only">{supply.fiscal_note}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
