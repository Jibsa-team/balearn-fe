"use client";

import Image from "next/image";

function Page() {
  const onClickKakaoLogin = () => {
    // 카카오 로그인 경로로 리다이렉트
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[#C9D439] text-[2.2rem]">Balearn</h1>
        <Image src={"/logo.png"} alt={"로고 이미지"} width={150} height={150} />
        <div className="mt-[40px] w-[200px] flex justify-between">
          <Image
            src={"/kakao.webp"}
            alt="카카로 로그인 버튼"
            width={50}
            height={50}
            onClick={onClickKakaoLogin}
          />
          <Image
            src={"/google.png"}
            alt="구글 로그인 버튼"
            width={50}
            height={50}
          />
          <Image
            src={"/naver.png"}
            alt="네이버 로그인 버튼"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
