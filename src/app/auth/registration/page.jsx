"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuEye, LuEyeOff, LuRefreshCcw } from "react-icons/lu";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-white p-6 2xl:p-8 flex flex-col items-center gap-8 rounded-xl lg:rounded-2xl">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex w-fit">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </div>
        <p className="font-bold text-[1.75rem] 2xl:text-3xl">Create Account</p>
      </div>
      <div className="flex flex-col gap-5 2xl:gap-6">
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="name" className="w-fit font-medium">
            Full name
          </label>
          <input
            id="name"
            placeholder="Enter Full Name"
            className="rounded-md border 2xl:border-2 border-neutral300 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input autofill:!bg-transparent"
          />
        </div>
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
          <label htmlFor="number" className="w-fit font-medium">
            Phone number
          </label>
          <input
            id="number"
            placeholder="+234"
            className="rounded-md border 2xl:border-2 border-neutral300 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input autofill:!bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="businessName" className="w-fit font-medium">
            Business name
          </label>
          <input
            id="businessName"
            placeholder="Enter Business Name"
            className="rounded-md border 2xl:border-2 border-neutral300 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input autofill:!bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="businessType" className="w-fit font-medium">
            Business type
          </label>
          <select
            id="businessType"
            placeholder="Choose Business Type"
            className="rounded-md border 2xl:border-2 border-neutral300 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary300 focus-within:shadow-input autofill:!bg-transparent"
          >
            <option disabled value={""} className="text-neutral400">
              Choose Business Type
            </option>
          </select>
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
          <p className="text-neutral500">
            Password must contain at least 8 characters
          </p>
        </div>
        <p className="text-neutral700 text-xs 2xl:text-sm text-center">
          By signing up, I agree to the{" "}
          <Link href={""} className="underline hover:text-primary">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href={""} className="underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium text-2xl"
      >
        Create My Account
      </button>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-neutral500 text-sm 2xl:text-base">
          Already have an account?
        </p>
        <Link
          href={"/auth/login"}
          className="w-full text-primary600 font-semibold text-sm 2xl:text-base flex justify-center hover:text-primary"
        >
          Log in to NgPay
        </Link>
      </div>
    </div>
  );
}
