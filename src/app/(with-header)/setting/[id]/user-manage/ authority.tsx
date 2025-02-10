"use client";

import { expelTeamUser } from "@/app/api/userManage";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useToast } from "@/hooks/use-toast";
import { useDashboard } from "@/hooks/useDashboard";
import { useUserMe } from "@/hooks/useUserManager";
import { TeamUser } from "@/types/dashboard/dashboard";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const getRoleLabel = (role: string) => {
  switch (role) {
    case "관리자":
      return "leader";
    case "팀원":
      return "member";
  }
};

const validateAuthorityChange = ({
  selectedUser,
  selectedRole,
  toast,
}: {
  selectedUser: TeamUser | undefined;
  selectedRole: string;
  toast: ReturnType<typeof useToast>["toast"];
}) => {
  if (!selectedUser || !selectedRole) {
    toast({
      title: "권한 변경 실패",
      description: "회원과 권한을 모두 선택해주세요.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

const updateUserAuthority = async (
  id: string,
  selectedUser: TeamUser,
  selectedRole: string
) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}/user/${
      selectedUser.id
    }?role=${getRoleLabel(selectedRole)}`,
    { method: "PUT" }
  );

  return await response.json();
};

function UserAuthority() {
  const [selectedUser, setSelectedUser] = useState<TeamUser | undefined>(
    undefined
  );
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isError } = useDashboard(id);
  const { data: userData } = useUserMe(id);

  if (isError) return <div>오류가 발생했습니다.</div>;

  const teamUsers = (data?.result?.teamUser || []).filter(
    (user) => user.userId !== userData?.userId
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
    if (!validateAuthorityChange({ selectedUser, selectedRole, toast })) return;

    try {
      setUpdateLoading(true);
      const result = await updateUserAuthority(id, selectedUser!, selectedRole);

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

  const handleUserDelete = async (teamUserId: string) => {
    if (!selectedUser) {
      toast({
        title: "방출 실패",
        description: "선택된 회원이 없습니다.",
        variant: "destructive",
      });
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await expelTeamUser(id, teamUserId);
      const result = await response.json();

      if (result.responseCode === "SUCCESS") {
        toast({
          title: "방출 성공",
          description: "회원이 성공적으로 팀에서 방출되었습니다.",
          variant: "default",
        });

        queryClient.invalidateQueries({
          queryKey: ["dashboardData", id],
        });

        setSelectedUser(undefined);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast({
        title: "방출 실패",
        description:
          err instanceof Error ? err.message : "오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  console.log(userData, selectedUser);

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
                  <div className="w-[25px] h-[25px] rounded-full relative mr-[10px]">
                    <Image
                      src={selectedUser.imgUrl || "/Avatar.png"}
                      alt="user image"
                      layout="fill"
                      objectFit="cover"
                      className="absolute rounded-full mr-[10px]"
                    />
                  </div>
                )}
                <span className="sm:text-[1rem] text-[0.9rem] text-gray-600 ">
                  {(selectedUser && selectedUser.nickname) || "선택하세요"}
                </span>
              </div>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>

            {isUserOpen &&
              (isLoading ? (
                <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
                  <div className="p-4 text-center text-gray-500">
                    <ClipLoader color="gray" size={15} />
                  </div>
                </div>
              ) : (
                <div className="absolute top-[100%] left-0 w-full bg-white border-[1px] border-gray-300 mt-1 rounded-md shadow-lg z-10">
                  {teamUsers.length > 0 ? (
                    teamUsers.map((user) => (
                      <div
                        key={user.id}
                        className="cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)]"
                        onClick={() => handleSelectUser(user)}
                      >
                        <div className="flex items-center">
                          {teamUsers && (
                            <div className="w-[25px] h-[25px] rounded-full relative mr-[10px]">
                              <Image
                                src={user.imgUrl || "/Avatar.png"}
                                alt="user image"
                                layout="fill"
                                objectFit="cover"
                                className="absolute rounded-full"
                              />
                            </div>
                          )}
                          <span className="sm:text-[1rem] text-[0.9rem] text-gray-600 ">
                            {(teamUsers && user.nickname) || "선택하세요"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-gray-500 mb-2">
                        현재 팀에 다른 멤버가 없습니다.
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
                <span className="sm:text-[1rem] text-[0.9rem] text-gray-600 ">
                  {selectedRole || "선택하세요"}
                </span>
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
          <button
            onClick={() =>
              selectedUser?.userId && handleUserDelete(String(selectedUser.id))
            }
            className="w-[45%] bg-red-600 text-white py-[5px] rounded-lg cursor-pointer"
            disabled={deleteLoading}
          >
            {deleteLoading ? "방출중.." : "방출"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserAuthority;
