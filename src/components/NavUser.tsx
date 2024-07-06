import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

type NavUserProps = {
  Icon: IconType
  page: string
  text: string
};

function NavUser(props: NavUserProps) {
  const navigate = useNavigate();
  const { Icon } = props;
  const { text } = props;
  return (
    <div
      className="p-8 bg-white cursor-pointer
        flex items-center space-x-4 min-w-full hover:bg-gray-200"
        onClick={ () => navigate(`/${props.page}`) }
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
