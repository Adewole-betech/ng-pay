"use client";

import { CustomButton } from "@/app/components/button";
import { StyledInput, StyledPasswordInput } from "@/app/components/inputs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-white p-6 2xl:p-8 flex flex-col items-center gap-8 rounded-xl lg:rounded-2xl">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex w-fit">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </div>
        <p className="font-bold text-[1.75rem] 2xl:text-3xl">
          Login to your account
        </p>
      </div>
      <div className="flex flex-col gap-5 2xl:gap-6">
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="email" className="w-fit font-medium">
            Email address
          </label>
          <StyledInput id="email" type="email" placeholder="Enter Email" />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="password" className="w-fit font-medium">
            Password
          </label>
          <StyledPasswordInput id="password" placeholder="Enter Password" />
        </div>
        <div className="flex md:w-[28rem] gap-2">
          <div className="flex items-center justify-between rounded-md border 2xl:border-2 border-neutral-300 w-2/5 focus-within:outline-none focus-within:border-primary-300 focus-within:shadow-primaryRing">
            <input
              id="capthaBox"
              placeholder="2440"
              className="focus-within:outline-none py-[0.625rem] px-3 w-[70%] autofill:!bg-transparent rounded-s-md"
            />
            <div
              onClick={() => {}}
              className="w-[30%] flex items-center justify-center hover:cursor-pointer text-neutral-500 text-2xl"
            >
              <LuRefreshCcw />
            </div>
          </div>
          <StyledInput
            id="captchaInput"
            type="text"
            placeholder="Type what you see to confirm"
          />
        </div>
        <div className="flex w-full justify-between items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              required
              className="accent-primary-main w-6 h-6 rounded-xl outline-1 lg:outline-[1.5px] outline-neutral-300"
            />
            <span className="">Remember me</span>
          </label>
          <Link
            href=""
            className="text-primary-main font-semibold hover:text-primary-800"
          >
            Forgotten your password?
          </Link>
        </div>
      </div>
      <CustomButton type="submit" className="w-full" primary>
        Log in
      </CustomButton>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-neutral-500 text-sm 2xl:text-base">
          Don&apos;t have an account?
        </p>
        <Link
          href={"/auth/registration"}
          className="w-full text-primary-main font-semibold text-sm 2xl:text-base flex justify-center hover:text-primary-800"
        >
          Sign up to NgPay
        </Link>
      </div>
    </div>
  );
}
