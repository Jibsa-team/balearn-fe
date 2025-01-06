const GroupAddError = ({ errors }: { errors: string }) => {
  return (
    <span className="text-red-500 text-[0.8rem] mt-[5px] ml-[10px]">
      {errors}
    </span>
  );
};

export default GroupAddError;
