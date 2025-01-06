const TextInput = ({
  message,
  width,
  value,
  onChange,
}: {
  message: string;
  width: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      placeholder={message}
      value={value}
      onChange={onChange}
      className="mt-[10px] border-[1px] border-logoColor px-[20px] py-[7px] rounded-xl text-gray-500 text-[0.9rem] placeholder:text-gray-500 placeholder:text-[0.8rem]"
      style={{ width: `${width}%` }}
    />
  );
};

export default TextInput;
