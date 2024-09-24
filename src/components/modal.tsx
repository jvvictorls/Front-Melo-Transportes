interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  notFilledFields: string[] ;
}

function Modal({ isVisible, onClose, notFilledFields }: ModalProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex
    items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="bg-white rounded-lg p-6 max-w-sm w-full
        flex flex-col justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">Campos não preenchidos</h2>
        <p className="mb-4 text-justify">
          Os campos:
          {' '}
          {notFilledFields.filter((element) => element !== '')
            .map((field, index, array) => (
              index === array.length - 1 ? (
                <span key={ index } className="font-semibold">
                  {` e ${field}`}
                </span>
              ) : (
                <span key={ index } className="font-semibold">
                  {` ${field}, `}
                </span>
              )))}
          {' '}
          não foram preenchidos coretamente. Por favor, preencha-os para continuar.
        </p>
        <button onClick={ onClose } className="bg-blue-500 text-white px-4 py-2 rounded">
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;
