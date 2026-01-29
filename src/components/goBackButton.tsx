import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

type GoBackButtonProps = {
  className?: string;
};

export default function GoBackButton({ className = '' }: GoBackButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      aria-label="Go back"
      onClick={ () => navigate(-1) }
      className={ `mb-8 ${className}` }
    >
      <IoArrowBackCircleSharp size={ 24 } />
    </button>
  );
}
