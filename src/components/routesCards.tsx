type RoutesCardsProps = {
  routes: never[]
};
export default function routesCards({ routes }: RoutesCardsProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-3 2xl:grid 2xl:grid-cols-3">
      {routes.map((route: any) => (
        <div
          key={ route.id }
          className="w-full flex justify-center h-full"
        >
          <div
            className="p-4 border border-sm shadow-sm xs:w-11/12 md:w-11/12 lg:w-11/12"
          >
            <h1
              className="text-center border-b-2"
            >
              {route.name}
            </h1>
            <h2 className="p-4">
              Motorista:
              {' '}
              {route.driver}
            </h2>
            <p className="p-4">
              Lotação Máxima:
              {' '}
              {route.maxCollaborators}
            </p>
            <p className="p-4">
              Lotação atual:
              {' '}
              {route.currentCollaborators}
            </p>
            <div
              className="w-full flex justify-center"
            >
              <button
                className="bg-blue-500 w-2/3 md:w-2/3 text-center text-white hover:bg-blue-300 rounded-lg p-2 m-2"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
