"use client";

import Image from "next/image";
import { BsImageAlt } from "react-icons/bs";

// 프로필 이미지 타입을 명확히 정의
type ProfileImage = File | null;

interface GroupProfileProps {
  profileImage: ProfileImage;
  setProfileImage: (newImage: File | null) => void;
}

const GroupProfile = ({ profileImage, setProfileImage }: GroupProfileProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="flex flex-col items-start mb-[20px] font-semibold">
      <span>모임 프로필</span>
      <div className="flex items-center rounded-full">
        {/* 이미지 버튼 */}
        <label
          htmlFor="profileImage"
          className="cursor-pointer bg-gray-100 p-[10px] rounded-full flex items-center justify-center"
        >
          {profileImage ? (
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden relative">
              <Image
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <span className="bg-gray-200  w-[150px] h-[150px] rounded-full flex items-center justify-center">
              <BsImageAlt className="text-2xl text-gray-500" />
            </span>
          )}
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default GroupProfile;
