"use client";

import Image from "next/image";

function Page() {
  const onClickKLogin = (word: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${word}`;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.8)]">
      <div className="flex flex-col items-center justify-center p-[100px] bg-white rounded-xl">
        <h1 className="text-[#C9D439] text-[2.2rem]">Balearn</h1>
        <Image src={"/logo.png"} alt={"로고 이미지"} width={150} height={150} />
        <div className="w-full flex items-center justify-between mt-[20px]">
          <div className="border-[1px] border-gray-300 w-1/3"></div>
          <div className="text-[0.9rem] text-gray-300 mx-[5px]">
            간련 로그인
          </div>
          <div className="border-[1px] border-gray-300 w-1/3"></div>
        </div>
        <div className="mt-[15px] w-[200px] flex justify-between">
          <Image
            src={"/kakao.webp"}
            alt="카카로 로그인 버튼"
            width={50}
            height={50}
            onClick={() => onClickKLogin("kakao")}
          />
          <Image
            src={"/google.png"}
            alt="구글 로그인 버튼"
            width={50}
            height={50}
            onClick={() => onClickKLogin("google")}
          />
          <Image
            src={"/naver.png"}
            alt="네이버 로그인 버튼"
            width={50}
            height={50}
            onClick={() => onClickKLogin("naver")}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
