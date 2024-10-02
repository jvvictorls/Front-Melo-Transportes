type RoutesCardsProps = {
  routes: []
};
export default function routesCards({ routes }: RoutesCardsProps) {
  return (
    <div className="flex flex-col h-full space-y-4 justify-center w-full">
      {routes.map((route: any) => (
        <div
          key={ route.id }
          className="w-full flex justify-center w-full"
        >
          <div
            className="p-4 border border-sm shadow-sm w-3/4 space-y-2"
          >
            <h1
              className="text-center border-b-2"
            >
              {route.name}
            </h1>
            <h2>
              Motorista:
              {' '}
              {route.driver}
            </h2>
            <p>
              Capacideade Máxima:
              {' '}
              {route.maxCollaborators}
            </p>
            <p>
              Lotação atual:
              {' '}
              {route.currentCollaborators}
            </p>
            <button
              className="bg-blue-700 w-full text-center text-white hover:bg-blue-500 rounded-lg"
            >
              Ver detalhes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
