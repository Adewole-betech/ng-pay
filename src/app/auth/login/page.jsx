"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuEye, LuEyeOff, LuRefreshCcw } from "react-icons/lu";

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
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            className="rounded-md border 2xl:border-2 border-neutral300 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input autofill:!bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="password" className="w-fit font-medium">
            Password
          </label>
          <div className="flex items-center justify-between rounded-md border 2xl:border-2 border-neutral300 md:w-[28rem] focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="focus-within:outline-none py-[0.625rem] px-3 w-[90%] autofill:!bg-transparent rounded-s-md"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="w-[10%] flex items-center justify-center hover:cursor-pointer text-neutral500"
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
        </div>
        <div className="flex md:w-[28rem] gap-2">
          <div className="flex items-center justify-between rounded-md border 2xl:border-2 border-neutral300 w-2/5 focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input">
            <input
              id="capthaBox"
              placeholder="2440"
              className="focus-within:outline-none py-[0.625rem] px-3 w-[70%] autofill:!bg-transparent rounded-s-md"
            />
            <div
              onClick={() => {}}
              className="w-[30%] flex items-center justify-center hover:cursor-pointer text-neutral500 text-2xl"
            >
              <LuRefreshCcw />
            </div>
          </div>
          <input
            id="captchaInput"
            type="text"
            placeholder="Type what you see to confirm"
            className="rounded-md border 2xl:border-2 border-[#D1D5DB} py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input autofill:!bg-transparent"
          />
        </div>
        <div className="flex w-full justify-between items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              required
              className="accent-primary w-6 h-6 rounded-xl outline-1 lg:outline-[1.5px] outline-neutral300"
            />
            <span className="">Remember me</span>
          </label>
          <Link href="" className="text-primary600 font-semibold hover:text-primary">
            Forgotten your password?
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium text-2xl"
      >
        Log in
      </button>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-neutral500 text-sm 2xl:text-base">Don&apos;t have an account?</p>
        <Link href={"/auth/registration"} className="w-full text-primary600 font-semibold text-sm 2xl:text-base flex justify-center hover:text-primary">
          Sign up to NgPay
        </Link>
      </div>
    </div>
  );
}
