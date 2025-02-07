"use client";

import Image from "next/image";

function Page() {
  const onClickKLogin = (word: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${word}`;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center md:bg-[rgba(0,0,0,0.1)] bg-white">
      <div className="flex flex-col justify-between bg-white rounded-xl w-full md:w-auto md:min-w-[450px] h-full md:h-auto min-h-[750px] p-[30px] shadow-xl">
        <header className="text-[1.7rem] font-bold">
          <h1 className="text-[#C9D439] md:text-[2.2rem] text-[1.8rem]">
            Balearn
          </h1>
        </header>
        <section className="flex justify-center">
          <Image
            src={"/icons/logo.png"}
            alt="로고 이미지"
            width={230}
            height={230}
          />
        </section>
        <div>
          <div className="text-[1rem] text-gray-400 mx-[5px] flex justify-center">
            <span>SNS 계정으로 간편 가입하기</span>
          </div>
          <div className="mt-[15px] w-full flex justify-evenly">
            <Image
              src={"/kakao.webp"}
              alt="카카로 로그인 버튼"
              width={45}
              height={45}
              onClick={() => onClickKLogin("kakao")}
            />
            <Image
              src={"/google.png"}
              alt="구글 로그인 버튼"
              width={45}
              height={45}
              onClick={() => onClickKLogin("google")}
            />
            <Image
              src={"/naver.png"}
              alt="네이버 로그인 버튼"
              width={45}
              height={45}
              onClick={() => onClickKLogin("naver")}
            />
          </div>
          <div className="flex justify-center">
            <button className="text-gray-500 border-[1px] border-gray-300 px-[20px] py-[10px] rounded-full mt-[70px] cursor-pointer">
              로그인에 어려움이 있나요?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
