"use client";

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useToast } from "@/hooks/use-toast";
import { DashboardType, TeamUser } from "@/types/dashboard/dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const fetchMemberData = async (
  groupId: string | string[]
): Promise<DashboardType> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${groupId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch member details");
  }
  return response.json();
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case "관리자":
      return "leader";
    case "팀원":
      return "member";
  }
};

function UserAuthority() {
  const [selectedUser, setSelectedUser] = useState<TeamUser>();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardData", id],
    queryFn: () => fetchMemberData(id),
  });

  const { data: userData } = useQuery({
    queryKey: ["teamUserMe", id],
    queryFn: () =>
      fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}/me`
      ).then((res) => res.json()),
  });

  if (isError) return <div>오류가 발생했습니다.</div>;

  const teamUsers = (data?.result?.teamUser || []).filter(
    (user) => user.userId !== userData?.result?.userId
  );

  const handleSelectUser = (user: TeamUser) => {
    setSelectedUser(user);
    setIsUserOpen(false);
  };

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    setIsRoleOpen(false);
  };

  const handleAuthority = async () => {
    if (!selectedUser || !selectedRole) {
      toast({
        title: "권한 변경 실패",
        description: "회원과 권한을 모두 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUpdateLoading(true);
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}/user/${
          selectedUser.id
        }?role=${getRoleLabel(selectedRole)}`,
        {
          method: "PUT",
        }
      );

      const result = await response.json();

      if (result.responseCode === "SUCCESS") {
        toast({
          title: "권한 변경 성공",
          description: "회원 권한이 성공적으로 변경되었습니다.",
          variant: "default",
        });

        queryClient.invalidateQueries({
          queryKey: ["dashboardData", id],
        });
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast({
        title: "권한 변경 실패",
        description:
          err instanceof Error ? err.message : "오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <div className="md:w-[50%] w-full">
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
                    src={selectedUser.imgUrl || "/Avatar.png"}
                    alt="user image"
                    width={30}
                    height={30}
                    className="rounded-full mr-[10px]"
                  />
                )}
                <span>
                  {(selectedUser && selectedUser.nickname) || "선택하세요"}
                </span>
              </div>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>

            {isUserOpen && (
              <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
                {teamUsers.map((user) => (
                  <div
                    key={user.id}
                    className="cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)]"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="flex items-center">
                      <Image
                        src={user.imgUrl || "/Avatar.png"}
                        alt="user image"
                        width={30}
                        height={30}
                        className="rounded-full mr-[10px]"
                      />
                      <span>{user.nickname}</span>
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
                {["관리자", "팀원"].map((role) => (
                  <div
                    key={role}
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
          <button
            onClick={handleAuthority}
            disabled={updateLoading}
            className={`w-[45%] ${
              updateLoading
                ? "bg-[#2DA44E]/50 text-white cursor-not-allowed"
                : "bg-[#2DA44E] text-white cursor-pointer"
            } py-[5px] rounded-lg`}
          >
            {updateLoading ? "변경중.." : "변경"}
          </button>
          <button className="w-[45%] bg-[#B52324] text-white py-[5px] rounded-lg cursor-pointer">
            방출
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserAuthority;
