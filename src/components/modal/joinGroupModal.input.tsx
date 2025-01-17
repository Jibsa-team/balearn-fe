"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPControlled() {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-2 w-full flex flex-col items-center justify-center">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        className="w-full"
      >
        <InputOTPGroup className="w-full">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">코드를 입력해주세요</div>
    </div>
  );
}
