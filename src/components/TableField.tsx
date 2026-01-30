type TableFieldProps = {
  text: string | number;
  colspan?: number;
};
export default function TableField({ text, colspan = 1 }: TableFieldProps) {
  return (
    <td
      className="border px-4 py-2"
      colSpan={ colspan }
    >
      {text}
    </td>
  );
}
