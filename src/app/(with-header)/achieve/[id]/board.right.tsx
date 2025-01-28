import React from "react";
import Image from "next/image";
import { RiMedalFill } from "react-icons/ri";

const users = [
  { id: 1, name: "이재인", image: "/Avatar.png", points: 100 },
  { id: 2, name: "황민우", image: "/Avatar.png", points: 90 },
  { id: 3, name: "장경우", image: "/Avatar.png", points: 80 },
];

function BoardRight() {
  return (
    <div className="mt-[30px] md:mt-[0px] w-full md:w-1/2 flex flex-col">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 font-semibold">
          <tr className="text-lg font-semibold ">
            <th className="p-4 text-center w-[20%]">순위</th>
            <th className="p-4 text-left w-[40%]">사용자</th>
            <th className="p-4 text-center w-[40%]">포인트</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="p-4 text-center font-medium flex items-center justify-center">
                <div className="mr-[10px] text-[1.2rem]">{index + 1}</div>
                {index < 3 ? (
                  <RiMedalFill
                    className={`text-[1.6rem] inline mr-2 ${
                      index === 0
                        ? "text-yellow-400"
                        : index === 1
                        ? "text-gray-400"
                        : "text-yellow-700"
                    }`}
                  />
                ) : null}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-start">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={30}
                    height={30}
                    className="rounded-full mr-3"
                  />
                  <span className="text-base">{user.name}</span>
                </div>
              </td>
              <td className="p-4 text-center font-medium">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardRight;
