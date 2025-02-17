"use client";

import TextInput from "@/components/group/input/textInput";
import { useState } from "react";
import GroupAddError from "@/components/error/ErrorMessage";

interface GroupInputProps {
  label: string;
  placeholder: string;
  onValidate?: (value: string) => string | undefined;
  onStateChange: (value: string) => void;
}

const GroupInput = ({
  label,
  placeholder,
  onValidate,
  onStateChange,
}: GroupInputProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (onValidate) {
      const validationError = onValidate(newValue);
      setError(validationError);
    }

    onStateChange(newValue);
  };

  return (
    <div className="flex flex-col items-start mb-[30px] font-semibold">
      <span>{label}</span>
      <TextInput
        message={placeholder}
        width={100}
        value={value}
        onChange={handleChange}
      />
      {error && <GroupAddError errors={error} />}
    </div>
  );
};

export default GroupInput;
