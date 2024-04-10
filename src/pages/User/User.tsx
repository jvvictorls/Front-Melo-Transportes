function User() {
  return (
    <aside
      className="flex flex-cloumn justify-center max-w-sm border-4 border-black min-h-screen text-xl"
    >
      <div className="border-4 border-blue-400 h-auto w-5/6	">
        <div
          className=" p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg
           flex items-center space-x-4 border h-fit min-w-full"
        >
          <div>
            <img className="h-8" src="/src/public/user.png" alt="user-profile" />
          </div>
          <h1 className="font-semibold">
            Olá,
            {' '}
            João
          </h1>
        </div>
      </div>
    </aside>
  );
}

export default User;
