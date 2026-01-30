import { IoCloseCircle } from 'react-icons/io5';

type SelectedCollaboratorsProps = {
  selected: string[];
  onRemove: (collaborator: string) => void;
};

export default function SelectedCollaborators({ selected, onRemove }: SelectedCollaboratorsProps) {
  return (
    <div
      className="xs:flex xs:flex-col xs:space-y-4 xs:w-full xs:items-center xs:justify-center lg:grid lg:grid-cols-2 lg:gap-4 lg:w-full xl:grid xl:grid-cols-4 xl:gap-4 xl:w-full space-y-2"
    >
      {selected.map((employee) => (
        <span
          className="w-full rounded-3xl border border-red-400 text-red-400 px-4 py-2 flex flex-row justify-between items-center  "
          key={ employee }
        >
          {employee}
          <button
            className="rounded-3xl ml-4 text-red-400"
            aria-label="close"
            onClick={ () => {
              onRemove(employee);
            } }
          >
            <IoCloseCircle />
          </button>
        </span>

      ))}
    </div>
  );
}
