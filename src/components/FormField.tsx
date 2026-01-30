type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  type?: string;
};

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={ name }>{label}</label>

      <input
        id={ name }
        name={ name }
        type={ type }
        value={ value }
        onChange={ onChange }
        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
