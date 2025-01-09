"use client";

import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function CalendarGoal() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);

  const users = ["황민우", "장경우", "임대영", "이승준"];
  const role = ["관리자", "멤버"];

  const handleSelectUser = (user: string) => {
    setSelectedUser(user);
    setIsUserOpen(false);
  };

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setIsRoleOpen(false);
  };
  return (
    <div>
      <div className="w-[50%]">
        <h2 className="text-[1.1rem] font-semibold mb-[20px]">권한</h2>
        <div className="mb-[30px]">
          <span>회원 선택</span>

          <div className="relative w-[100%] mt-2">
            <div
              className="cursor-pointer border-[1px] border-gray-300 p-[10px] rounded-md flex justify-between items-center"
              onClick={() => setIsUserOpen((prev) => !prev)}
            >
              <div className="flex items-center">
                {selectedUser && (
                  <Image
                    src={"/Avatar.png"}
                    alt="user image"
                    width={30}
                    height={30}
                    className="rounded-full mr-[10px]"
                  />
                )}
                <span>{selectedUser || "선택하세요"}</span>
              </div>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>

            {isUserOpen && (
              <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
                {users.map((user) => (
                  <div
                    key={user}
                    className="cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)]"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="flex items-center">
                      <Image
                        src={"/Avatar.png"}
                        alt="user image"
                        width={30}
                        height={30}
                        className="rounded-full mr-[10px]"
                      />
                      <span>{user}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-[30px]">
          <span>권한 선택</span>

          <div className="relative w-[100%] mt-2">
            <div
              className="cursor-pointer border-[1px] border-gray-300 p-[10px] rounded-md flex justify-between items-center"
              onClick={() => setIsRoleOpen((prev) => !prev)}
            >
              <div className="flex items-center">
                <span>{selectedRole || "선택하세요"}</span>
              </div>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>

            {isRoleOpen && (
              <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
                {role.map((role, i) => (
                  <div
                    key={i}
                    className="cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)]"
                    onClick={() => handleSelectRole(role)}
                  >
                    <div className="flex items-center">
                      <span>{role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="w-[45%] bg-[#2DA44E] text-white py-[5px] rounded-lg cursor-pointer">
            변경
          </button>
          <button className="w-[45%] bg-[#B52324] text-white py-[5px] rounded-lg cursor-pointer">
            방출
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarGoal;
