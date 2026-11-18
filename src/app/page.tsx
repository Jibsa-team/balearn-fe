"use client";

import { useViewport } from "@/hooks/useViewport";
import Image from "next/image";

const loginProviders = (process.env.NEXT_PUBLIC_LOGIN_PROVIDERS ?? "kakao,google")
  .split(",").map((provider) => provider.trim());

function Page() {
  useViewport();
  const onClickKLogin = (word: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${word}`;
  };

  return (
    <div
      className="w-full flex justify-center items-center bg-white"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="flex flex-col justify-between bg-white rounded-xl sm:border sm:border-gray-100 w-full md:w-auto md:min-w-[400px] h-full p-[30px] shadow-xl">
        <header className="text-[1.7rem] font-bold">
          <h1 className="text-[#C9D439] sm:text-[1.8rem] text-[1.5rem]">
            Balearn
          </h1>
        </header>
        <section className="flex justify-center">
          <Image
            src={"/icons/logo.png"}
            alt="로고 이미지"
            width={400}
            height={400}
          />
        </section>
        <div>
          <div className="text-[1rem] text-gray-600 mx-[5px] flex justify-center">
            <span className="text-[0.9rem]">계정으로 로그인</span>
          </div>
          <div className="mt-[15px] w-full flex flex-col items-center ">
            {loginProviders.includes("kakao") && (
            <div
              className="w-full relative bg-[#FEE501] flex justify-center p-[8px] rounded-md mb-[7px] cursor-pointer"
              onClick={() => onClickKLogin("kakao")}
            >
              <svg
                width="20"
                height="20"
                className="absolute left-2 top-[10px]"
              >
                <defs>
                  <symbol id="kakao" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 4.27 0 9.5c0 3.23 2.15 6.06 5.37 7.68L4 21.5l5.5-3.63c.82.15 1.67.23 2.5.23 6.63 0 12-4.27 12-9.5S18.63 0 12 0z" />
                  </symbol>
                </defs>
                <use href="#kakao" />
              </svg>
              <span className="text-[0.9rem]">카카오 로그인</span>
            </div>
            )}
            {loginProviders.includes("google") && (
            <div
              className="w-full relative bg-white border border-gray-200 flex justify-center p-[8px] rounded-md mb-[7px] cursor-pointer"
              onClick={() => onClickKLogin("google")}
            >
              <svg
                width="20"
                height="20"
                className="absolute left-[5px] top-[10px]"
              >
                <defs>
                  <symbol id="google" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </symbol>
                </defs>
                <use href="#google" />
              </svg>
              <span className="text-[0.9rem]">구글 로그인</span>
            </div>
            )}

            {loginProviders.includes("github") && (
              <button type="button" className="mb-2 w-full rounded-md border p-2 text-sm"
                onClick={() => onClickKLogin("github")}>GitHub 로그인</button>
            )}
            {loginProviders.includes("oidc") && (
              <button type="button" className="mb-2 w-full rounded-md border p-2 text-sm"
                onClick={() => onClickKLogin("oidc")}>조직 계정으로 로그인</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
