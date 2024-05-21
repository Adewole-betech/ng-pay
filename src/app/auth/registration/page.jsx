"use client";

import { CustomButton } from "@/app/components/button";
import {
  StyledInput,
  StyledPasswordInput,
  StyledSelectInput,
} from "@/app/components/inputs";
import Image from "next/image";
import Link from "next/link";

export default function Registration() {
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
          <StyledInput id="name" placeholder="Enter Full Name" />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="email" className="w-fit font-medium">
            Email address
          </label>
          <StyledInput id="email" type="email" placeholder="Enter Email" />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="number" className="w-fit font-medium">
            Phone number
          </label>
          <StyledInput id="number" placeholder="+234" />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="businessName" className="w-fit font-medium">
            Business name
          </label>
          <StyledInput id="businessName" placeholder="Enter Business Name" />
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="businessType" className="w-fit font-medium">
            Business type
          </label>
          <StyledSelectInput
            id="businessType"
            placeholder="Choose Business Type"
          >
            <option disabled value={""} className="text-neutral-400 md:w-[28rem]">
              Choose Business Type
            </option>
          </StyledSelectInput>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="password" className="w-fit font-medium">
            Password
          </label>
          <StyledPasswordInput
            id="password"
            placeholder="Enter Password"
          />
          <p className="text-neutral-500">
            Password must contain at least 8 characters
          </p>
        </div>
        <p className="text-neutral-700 text-xs 2xl:text-sm text-center">
          By signing up, I agree to the{" "}
          <Link href={""} className="underline hover:text-primary-main">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href={""} className="underline hover:text-primary-main">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <CustomButton type="submit" className="w-full" primary>
        Create My Account
      </CustomButton>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-neutral-500 text-sm 2xl:text-base">
          Already have an account?
        </p>
        <Link
          href={"/auth/login"}
          className="w-full text-primary-500 font-semibold text-sm 2xl:text-base flex justify-center hover:text-primary-800"
        >
          Log in to NgPay
        </Link>
      </div>
    </div>
  );
}
