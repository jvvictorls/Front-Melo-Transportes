import { IconType } from 'react-icons';

type NavUserProps = {
  Icon: IconType
  text: string
};

function NavUser(props: NavUserProps) {
  const { Icon } = props;
  const { text } = props;
  return (
    <div
      className="p-8 bg-white cursor-pointer
        flex items-center space-x-4 min-w-full hover:bg-gray-200"
    >
      <div>
        <Icon size={ 30 } />
      </div>
      <h1 className="">
        { text }
      </h1>
    </div>
  );
}

export default NavUser;
